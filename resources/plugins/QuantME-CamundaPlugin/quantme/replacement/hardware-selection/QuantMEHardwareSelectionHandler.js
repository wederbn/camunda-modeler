/**
 * Copyright (c) 2021 Institute of Architecture of Application Systems -
 * University of Stuttgart
 *
 * This program and the accompanying materials are made available under the
 * terms the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getPropertiesToCopy, getCamundaInputOutput } from '../../Utilities';
import {
  INVOKE_NISQ_ANALYZER_SCRIPT,
  INVOKE_TRANSFORMATION_SCRIPT,
  SELECT_ON_QUEUE_SIZE_SCRIPT
} from './HardwareSelectionScripts';
import * as consts from '../../Constants';
import extensionElementsHelper from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';

/**
 * Replace the given QuantumHardwareSelectionSubprocess by a native subprocess orchestrating the hardware selection
 */
export async function replaceHardwareSelectionSubprocess(subprocess, parent, bpmnFactory, bpmnReplace, elementRegistry, modeling, nisqAnalyzerEndpoint, transformationFrameworkEndpoint, camundaEndpoint) {

  // replace QuantumHardwareSelectionSubprocess with traditional subprocess
  let element = bpmnReplace.replaceElement(elementRegistry.get(subprocess.id), { type: 'bpmn:SubProcess' });

  // update the properties of the new element
  modeling.updateProperties(element, getPropertiesToCopy(subprocess));
  modeling.updateProperties(element, { selectionStrategy : undefined, providers: undefined, simulatorsAllowed: undefined });

  // retrieve corresponding business object and update properties
  let bo = elementRegistry.get(element.id).businessObject;
  bo.di.isExpanded = true;
  bo.flowElements = [];

  // add start event for the new subprocess
  let startEvent = modeling.createShape({ type: 'bpmn:StartEvent' }, { x: 50, y: 50 }, element, {});
  let startEventBo = elementRegistry.get(startEvent.id).businessObject;
  startEventBo.name = 'Start Hardware Selection Subprocess';

  // add gateway to avoid multiple hardware selections for the same circuit
  let splittingGateway = modeling.createShape({ type: 'bpmn:ExclusiveGateway' }, { x: 50, y: 50 }, element, {});
  let splittingGatewayBo = elementRegistry.get(splittingGateway.id).businessObject;
  splittingGatewayBo.name = 'Hardware already selected?';

  // connect start event and gateway
  modeling.connect(startEvent, splittingGateway, { type: 'bpmn:SequenceFlow' });

  // add task to invoke the NISQ Analyzer and connect it
  let invokeHardwareSelection = modeling.createShape({ type: 'bpmn:ScriptTask' }, { x: 50, y: 50 }, element, {});
  let invokeHardwareSelectionBo = elementRegistry.get(invokeHardwareSelection.id).businessObject;
  invokeHardwareSelectionBo.name = 'Invoke NISQ Analyzer';
  invokeHardwareSelectionBo.scriptFormat = 'groovy';
  invokeHardwareSelectionBo.script = INVOKE_NISQ_ANALYZER_SCRIPT;
  invokeHardwareSelectionBo.asyncBefore = true;

  // add NISQ Analyzer endpoint, providers attribute, and simulatorAllowed attribute as input parameters
  let invokeHardwareSelectionInOut = getCamundaInputOutput(invokeHardwareSelectionBo, bpmnFactory);
  nisqAnalyzerEndpoint += nisqAnalyzerEndpoint.endsWith('/') ? '' : '/';
  invokeHardwareSelectionInOut.inputParameters.push(
    bpmnFactory.create('camunda:InputParameter', {
      name: 'camunda_endpoint',
      value: camundaEndpoint
    })
  );
  invokeHardwareSelectionInOut.inputParameters.push(
    bpmnFactory.create('camunda:InputParameter', {
      name: 'nisq_analyzer_endpoint',
      value: nisqAnalyzerEndpoint + consts.NISQ_ANALYZER_QPU_SELECTION_PATH
    })
  );
  invokeHardwareSelectionInOut.inputParameters.push(
    bpmnFactory.create('camunda:InputParameter', {
      name: 'providers',
      value: subprocess.providers
    })
  );
  invokeHardwareSelectionInOut.inputParameters.push(
    bpmnFactory.create('camunda:InputParameter', {
      name: 'simulators_allowed',
      value: subprocess.simulatorsAllowed
    })
  );

  // connect gateway with selection path and add condition
  let selectionFlow = modeling.connect(splittingGateway, invokeHardwareSelection, { type: 'bpmn:SequenceFlow' });
  let selectionFlowBo = elementRegistry.get(selectionFlow.id).businessObject;
  selectionFlowBo.name = 'no';
  let selectionFlowCondition = bpmnFactory.create('bpmn:FormalExpression');
  selectionFlowCondition.body = '${execution.hasVariable("alreadySelected") == false || execution.alreadySelected == \'false\'}';
  selectionFlowBo.conditionExpression = selectionFlowCondition;

  // add task implementing the defined selection strategy and connect it
  let selectionTask = addSelectionStrategyTask(subprocess.selectionStrategy, element, elementRegistry, modeling);
  if (selectionTask === undefined) {
    return false;
  }
  let selectionTaskBo = elementRegistry.get(selectionTask.id).businessObject;
  selectionTaskBo.asyncBefore = true;
  modeling.connect(invokeHardwareSelection, selectionTask, { type: 'bpmn:SequenceFlow' });

  // add task implementing the transformation of the QuantME modeling constructs within the QuantumHardwareSelectionSubprocess
  let invokeTransformation = modeling.createShape({ type: 'bpmn:ScriptTask' }, { x: 50, y: 50 }, element, {});
  let invokeTransformationBo = elementRegistry.get(invokeTransformation.id).businessObject;
  invokeTransformationBo.name = 'Invoke Transformation Framework';
  invokeTransformationBo.scriptFormat = 'groovy';
  invokeTransformationBo.script = INVOKE_TRANSFORMATION_SCRIPT;
  invokeTransformationBo.asyncBefore = true;
  modeling.connect(selectionTask, invokeTransformation, { type: 'bpmn:SequenceFlow' });

  // add Transformation Framework endpoint as input parameter
  let invokeTransformationInOut = getCamundaInputOutput(invokeTransformationBo, bpmnFactory);
  invokeTransformationInOut.inputParameters.push(
    bpmnFactory.create('camunda:InputParameter', {
      name: 'transformation_framework_endpoint',
      value: transformationFrameworkEndpoint
    })
  );

  // TODO: add workflow fragment as input

  // join control flow
  let joiningGateway = modeling.createShape({ type: 'bpmn:ExclusiveGateway' }, { x: 50, y: 50 }, element, {});
  modeling.connect(invokeTransformation, joiningGateway, { type: 'bpmn:SequenceFlow' });

  // add connection from splitting to joining gateway and add condition
  let alreadySelectedFlow = modeling.connect(splittingGateway, joiningGateway, { type: 'bpmn:SequenceFlow' });
  let alreadySelectedFlowBo = elementRegistry.get(alreadySelectedFlow.id).businessObject;
  alreadySelectedFlowBo.name = 'yes';
  let alreadySelectedFlowCondition = bpmnFactory.create('bpmn:FormalExpression');
  alreadySelectedFlowCondition.body = '${execution.hasVariable("alreadySelected") == true && execution.alreadySelected == \'true\'}';
  alreadySelectedFlowBo.conditionExpression = alreadySelectedFlowCondition;

  // add call activity invoking the dynamically transformed and deployed workflow fragment
  let invokeTransformedFragment = modeling.createShape({ type: 'bpmn:CallActivity' }, { x: 50, y: 50 }, element, {});
  let invokeTransformedFragmentBo = elementRegistry.get(invokeTransformedFragment.id).businessObject;
  invokeTransformedFragmentBo.name = 'Invoke Transformed Fragment';
  invokeTransformedFragmentBo.calledElement = '${ execution.fragmentEndpoint }';
  invokeTransformedFragmentBo.calledElementBinding = 'latest';
  modeling.connect(joiningGateway, invokeTransformedFragment, { type: 'bpmn:SequenceFlow' });

  // pass all variables between the caller and callee workflow
  let extensionElements = extensionElementsHelper.addEntry(invokeTransformedFragmentBo, invokeTransformedFragmentBo, bpmnFactory.create('camunda:In'), bpmnFactory)['extensionElements'];
  let invokeTransformedFragmentIn = extensionElements.values[0];
  let invokeTransformedFragmentOut = bpmnFactory.create('camunda:Out');
  extensionElements.values.push(invokeTransformedFragmentOut);
  invokeTransformedFragmentIn.variables = 'all';
  invokeTransformedFragmentOut.variables = 'all';
  invokeTransformedFragmentBo.extensionElements = extensionElements;

  // add end event for the new subprocess
  let endEvent = modeling.createShape({ type: 'bpmn:EndEvent' }, { x: 50, y: 50 }, element, {});
  let endEventBo = elementRegistry.get(endEvent.id).businessObject;
  endEventBo.name = 'Terminate Hardware Selection Subprocess';
  modeling.connect(invokeTransformedFragment, endEvent, { type: 'bpmn:SequenceFlow' });
  return true;
}

/**
 * Add and return a task implementing the given selection strategy
 */
function addSelectionStrategyTask(selectionStrategy, parent, elementRegistry, modeling) {
  console.log('Adding task for selection strategy: %s', selectionStrategy);

  if (selectionStrategy === undefined || !consts.SELECTION_STRATEGY_LIST.includes(selectionStrategy)) {
    console.log('Selection strategy not supported. Aborting!');
    return undefined;
  }

  switch (selectionStrategy) {
  case consts.SELECTION_STRATEGY_SHORTEST_QUEUE_SIZE:
    return addShortestQueueSelectionStrategy(parent, elementRegistry, modeling);
  default:
    console.log('Selection strategy not supported. Aborting!');
    return undefined;
  }
}

/**
 * Add a task implementing the Shortest-Queue selection strategy
 */
function addShortestQueueSelectionStrategy(parent, elementRegistry, modeling) {
  let task = modeling.createShape({ type: 'bpmn:ScriptTask' }, { x: 50, y: 50 }, parent, {});
  let taskBo = elementRegistry.get(task.id).businessObject;
  taskBo.name = 'Selecting based on Queue Size';
  taskBo.scriptFormat = 'groovy';
  taskBo.script = SELECT_ON_QUEUE_SIZE_SCRIPT;
  return task;
}

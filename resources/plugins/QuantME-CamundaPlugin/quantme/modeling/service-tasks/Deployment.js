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

const entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
      cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

export function deployment(element, bpmnFactory, options, translate) {

  const getImplementationType = options.getImplementationType,
        getBusinessObject = options.getBusinessObject;

  const deploymentEntry = entryFactory.textField({
    id: 'deployment',
    label: translate('Deployment Model URL'),
    dataValueLabel: 'deploymentModelUrlLabel',
    modelProperty: 'deploymentModelUrl',

    get: function(element, node) {
      let bo = getBusinessObject(element);
      let deploymentModelUrl = bo && bo.get('quantme:deploymentModelUrl');
      return {
        deploymentModelUrl: deploymentModelUrl,
        deploymentModelUrlLabel: translate('Deployment Model URL')
      };
    },

    set: function(element, values, node) {
      let bo = getBusinessObject(element);
      let prop = { deploymentModelUrl: values.deploymentModelUrl || '' };
      return cmdHelper.updateBusinessObject(element, bo, prop);
    },

    validate: function(element, values, node) {
      return getImplementationType(element) === 'deploymentModel' && !values.deploymentModelUrl ? { deploymentModelUrl: translate('Must provide a value') } : {};
    },

    hidden: function(element, node) {
      return !(getImplementationType(element) === 'deploymentModel');
    }
  });

  return [deploymentEntry];
}

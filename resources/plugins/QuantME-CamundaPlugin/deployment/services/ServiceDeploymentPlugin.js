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

/* eslint-disable no-unused-vars*/
import React, { Fragment, PureComponent } from 'camunda-modeler-plugin-helpers/react';
import { Fill } from 'camunda-modeler-plugin-helpers/components';

import ServiceDeploymentOverviewModal from './ServiceDeploymentOverviewModal';
import ServiceDeploymentInputModal from './ServiceDeploymentInputModal';
import ServiceDeploymentBindingModal from './ServiceDeploymentBindingModal';
import { getRootProcess } from '../../quantme/Utilities';

const defaultState = {
  windowOpenDeploymentOverview: false,
  windowOpenDeploymentInput: false,
  windowOpenDeploymentBinding: false
};

const QUANTME_NAMESPACE_PULL_ENCODED = encodeURIComponent(encodeURIComponent('http://quantil.org/quantme/pull'));
const QUANTME_NAMESPACE_PUSH_ENCODED = encodeURIComponent(encodeURIComponent('http://quantil.org/quantme/push'));

export default class ConfigPlugin extends PureComponent {

  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleDeploymentOverviewClosed = this.handleDeploymentOverviewClosed.bind(this);
    this.handleDeploymentInputClosed = this.handleDeploymentInputClosed.bind(this);
    this.handleDeploymentBindingClosed = this.handleDeploymentBindingClosed.bind(this);
  }

  componentDidMount() {

    // get modeler to access current workflow
    this.props.subscribe('bpmn.modeler.created', (event) => {

      const {
        modeler
      } = event;

      this.modeler = modeler;
    });
  }

  /**
   * Handle the result of a close operation on the deployment overview modal
   *
   * @param result the result from the close operation
   */
  handleDeploymentOverviewClosed(result) {

    // handle click on 'Next' button
    if (result && result.hasOwnProperty('next') && result.next === true) {
      this.setState({
        windowOpenDeploymentOverview: false,
        windowOpenDeploymentInput: true,
        windowOpenDeploymentBinding: false
      });
      return;
    }

    // handle cancellation
    this.setState({
      windowOpenDeploymentOverview: false,
      windowOpenDeploymentInput: false,
      windowOpenDeploymentBinding: false
    });
  }

  /**
   * Handle the result of a close operation on the deployment input modal
   *
   * @param result the result from the close operation
   */
  handleDeploymentInputClosed(result) {

    // handle click on 'Next' button
    if (result && result.hasOwnProperty('next') && result.next === true) {
      this.setState({
        windowOpenDeploymentOverview: false,
        windowOpenDeploymentInput: false,
        windowOpenDeploymentBinding: true
      });
      return;
    }

    // handle cancellation
    this.setState({
      windowOpenDeploymentOverview: false,
      windowOpenDeploymentInput: false,
      windowOpenDeploymentBinding: false
    });
  }

  /**
   * Handle the result of a close operation on the deployment binding modal
   *
   * @param result the result from the close operation
   */
  handleDeploymentBindingClosed(result) {

    this.setState({
      windowOpenDeploymentOverview: false,
      windowOpenDeploymentInput: false,
      windowOpenDeploymentBinding: false
    });
  }

  /**
   * Check whether the given element in a workflow is a deployable ServiceTask
   *
   * @param element the element to check
   * @return {*|boolean} true if the element is a ServiceTask and has an assigned deployment model, false otherwise
   */
  isDeployableServiceTask(element) {
    return element.$type && element.$type === 'bpmn:ServiceTask' && element.deploymentModelUrl && this.getBindingType(element) !== undefined;
  }

  /**
   * Check whether the given ServiceTask has an attached deployment model that should be bound using pull or push mode
   *
   * @param serviceTask the service task to check
   * @return {string|undefined} 'push' if the corresponding service should be bound by pushing requests,
   * 'pull' if the corresponding service should be bound by pulling requests from a topic,
   * or undefined if unable to determine pull or push
   */
  getBindingType(serviceTask) {
    let urlSplit = serviceTask.deploymentModelUrl.split('servicetemplates/');
    if (urlSplit.length !== 2) {
      console.warn('Deployment model url is invalid: %s', serviceTask.deploymentModelUrl);
      return undefined;
    }
    let namespace = urlSplit[1];

    if (namespace.startsWith(QUANTME_NAMESPACE_PUSH_ENCODED)) {
      return 'push';
    }

    if (namespace.startsWith(QUANTME_NAMESPACE_PULL_ENCODED)) {
      return 'pull';
    }

    return undefined;
  }

  /**
   * Get the ServiceTasks of the current workflow that have an attached deployment model to deploy the corresponding service
   */
  getServiceTasksToDeploy() {

    let serviceTasksToDeploy = [];
    if (!this.modeler) {
      console.warn('Modeler not available, unable to retrieve ServiceTasks!');
      return serviceTasksToDeploy;
    }

    // get root element of the workflow
    const rootElement = getRootProcess(this.modeler.getDefinitions());

    if (rootElement === undefined) {
      console.warn('Unable to retrieve root element within the workflow!');
      return serviceTasksToDeploy;
    }

    // search for service tasks with assigned deployment model
    let flowElements = rootElement.flowElements;
    for (let i = 0; i < flowElements.length; i++) {
      let flowElement = flowElements[i];

      if (this.isDeployableServiceTask(flowElement)) {
        serviceTasksToDeploy.push({ id: flowElement.id, url: flowElement.deploymentModelUrl , type: this.getBindingType(flowElement) });
      }
    }

    return serviceTasksToDeploy;
  }

  render() {

    // render deployment button and pop-up menu
    return (<Fragment>
      <Fill slot="toolbar">
        <button type="button" className="src-app-primitives-Button__Button--3Ffn0" title="Open service deployment menu"
          onClick={() => this.setState({ windowOpenDeploymentOverview: true })}>
          <span className="app-icon-service-deployment"><span className="indent">Service Deployment</span></span>
        </button>
      </Fill>
      {this.state.windowOpenDeploymentOverview && (
        <ServiceDeploymentOverviewModal
          onClose={this.handleDeploymentOverviewClosed}
          initValues={this.getServiceTasksToDeploy()}
        />
      )}
      {this.state.windowOpenDeploymentInput && (
        <ServiceDeploymentInputModal
          onClose={this.handleDeploymentInputClosed}
          initValues={this.state}
        />
      )}
      {this.state.windowOpenDeploymentBinding && (
        <ServiceDeploymentBindingModal
          onClose={this.handleDeploymentBindingClosed}
          initValues={this.state}
        />
      )}
    </Fragment>);
  }
}

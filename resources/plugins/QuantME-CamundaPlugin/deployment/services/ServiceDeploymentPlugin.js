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

import { uploadCSARToContainer } from './OpenTOSCAUtils';

const defaultState = {
  windowOpenDeploymentOverview: false,
  windowOpenDeploymentInput: false,
  windowOpenDeploymentBinding: false
};

const QUANTME_NAMESPACE_PULL_ENCODED = encodeURIComponent(encodeURIComponent('http://quantil.org/quantme/pull'));
const QUANTME_NAMESPACE_PUSH_ENCODED = encodeURIComponent(encodeURIComponent('http://quantil.org/quantme/push'));

export default class ServiceDeploymentPlugin extends PureComponent {

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

      // subscribe to event bus to receive updates in the OpenTOSCA Container endpoint
      const self = this;
      this.eventBus = modeler.get('eventBus');
      this.eventBus.on('config.updated', function(config) {
        self.opentoscaEndpoint = config.opentoscaEndpoint;
      });
    });
  }

  /**
   * Increase the progress in the progress bar
   *
   * @param progressBar the progress bar to handle
   * @param progress the percentage to increase the current progress
   */
  handleProgress(progressBar, progress) {
    if (!progressBar.innerHTML) {
      progressBar.innerHTML = '0%';
    }

    let currentWidth = parseInt(progressBar.innerHTML.replace(/% ?/g, ''));
    for (let i = 0; i < progress; i++) {
      currentWidth++;
      progressBar.style.width = currentWidth + '%';
      progressBar.innerHTML = currentWidth + '%';
    }
  }

  /**
   * Handle the result of a close operation on the deployment overview modal
   *
   * @param result the result from the close operation
   */
  async handleDeploymentOverviewClosed(result) {

    // handle click on 'Next' button
    if (result && result.hasOwnProperty('next') && result.next === true) {

      // make progress bar visible and hide buttons
      result.refs.progressBarDivRef.current.hidden = false;
      result.refs.footerRef.current.hidden = true;
      let progressBar = result.refs.progressBarRef.current;
      this.handleProgress(progressBar, 10);

      // calculate progress step size for the number of CSARs to deploy
      let csarList = result.csarList;
      let progressStep = Math.round(90 / csarList.length);

      // upload all CSARs
      for (let i = 0; i < csarList.length; i++) {
        let csar = csarList[i];
        console.log('Uploading CSAR to OpenTOSCA container: ', csar);

        let uploadResult = await uploadCSARToContainer(this.opentoscaEndpoint, csar.csarName, csar.url);
        if (uploadResult.success === false) {

          // notify user about failed CSAR upload
          this.props.displayNotification({
            type: 'error',
            title: 'Unable to upload CSAR to the OpenTOSCA Container',
            content: 'CSAR defined for ServiceTasks with Id \'' + csar.serviceTaskIds + '\' could not be uploaded to the connected OpenTOSCA Container!',
            duration: 20000
          });

          // abort process
          this.setState({
            windowOpenDeploymentOverview: false,
            windowOpenDeploymentInput: false,
            windowOpenDeploymentBinding: false
          });
          return;
        }

        // set URL of the CSAR in the OpenTOSCA Container which is required to create instances
        csar.buildPlanUrl = uploadResult.url;
        csar.inputParameters = uploadResult.inputParameters;

        // increase progress in the UI
        this.handleProgress(progressBar, progressStep);
      }

      this.csarList = csarList;

      this.setState({
        windowOpenDeploymentOverview: false,
        windowOpenDeploymentInput: true,
        windowOpenDeploymentBinding: false,
        csarList: csarList
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
   * Get the CSAR name from the deployment model URL
   *
   * @param serviceTask the service task the CSAR belongs to
   * @return {*} the CSAR name
   */
  getCSARName(serviceTask) {
    let url = serviceTask.deploymentModelUrl.split('/?csar')[0];
    let urlSplit = url.split('/');
    return urlSplit[urlSplit.length - 1] + '.csar';
  }

  /**
   * Get the ServiceTasks of the current workflow that have an attached deployment model to deploy the corresponding service
   */
  getServiceTasksToDeploy() {

    let csarsToDeploy = [];
    if (!this.modeler) {
      console.warn('Modeler not available, unable to retrieve ServiceTasks!');
      return csarsToDeploy;
    }

    // get root element of the workflow
    const rootElement = getRootProcess(this.modeler.getDefinitions());

    if (rootElement === undefined) {
      console.warn('Unable to retrieve root element within the workflow!');
      return csarsToDeploy;
    }

    // search for service tasks with assigned deployment model
    let flowElements = rootElement.flowElements;
    for (let i = 0; i < flowElements.length; i++) {
      let flowElement = flowElements[i];

      if (this.isDeployableServiceTask(flowElement)) {

        // check if CSAR was already added for another service task
        let csarEntry = csarsToDeploy.find(serviceTask => flowElement.deploymentModelUrl === serviceTask.url);
        if (csarEntry !== undefined) {
          csarEntry.serviceTaskIds.push(flowElement.id);
        } else {
          csarsToDeploy.push(
            {
              serviceTaskIds: [flowElement.id],
              url: flowElement.deploymentModelUrl,
              type: this.getBindingType(flowElement),
              csarName: this.getCSARName(flowElement)
            });
        }
      }
    }

    return csarsToDeploy;
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
          initValues={this.csarList}
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

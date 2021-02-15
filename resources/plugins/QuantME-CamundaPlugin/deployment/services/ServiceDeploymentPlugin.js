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

const defaultState = {
  windowOpenDeploymentOverview: false,
  windowOpenDeploymentInput: false,
  windowOpenDeploymentBinding: false
};

export default class ConfigPlugin extends PureComponent {

  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleDeploymentOverviewClosed = this.handleDeploymentOverviewClosed.bind(this);
    this.handleDeploymentInputClosed = this.handleDeploymentInputClosed.bind(this);
    this.handleDeploymentBindingClosed = this.handleDeploymentBindingClosed.bind(this);
  }

  componentDidMount() {
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
          initValues={this.state}
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

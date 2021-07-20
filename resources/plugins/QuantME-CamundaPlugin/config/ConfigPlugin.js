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

import ConfigModal from './ConfigModal';

const defaultState = {
  configOpen: false
};

const defaultConfig = {
  camundaEndpoint: '',
  nisqAnalyzerEndpoint: '',
  opentoscaEndpoint: '',
  qrmRepoName: '',
  qrmUserName: '',
  qrmRepoPath: '',
  transformationFrameworkEndpoint: '',
  wineryEndpoint: ''
};

export default class ConfigPlugin extends PureComponent {

  constructor(props) {
    super(props);

    // modelers for all tabs to enable switching between them
    this.modelers = {};

    this.state = defaultState;
    this.config = defaultConfig;

    this.handleConfigClosed = this.handleConfigClosed.bind(this);

    // get config to update details in the backend
    this.backendConfig = props._getGlobal('config');
  }

  componentDidMount() {

    // subscribe to updates for all configuration parameters in the backend
    this.props.subscribe('bpmn.modeler.created', (event) => {

      const {
        modeler, tab
      } = event;

      // save modeler and activate as current modeler
      this.modelers[tab.id] = modeler;
      this.modeler = modeler;
      const self = this;

      const editorActions = this.modeler.get('editorActions');
      const eventBus = this.modeler.get('eventBus');

      // initialize config in the frontend
      this.backendConfig.getConfigFromBackend().then(config => {
        this.config = config;
        this.modeler.config = config;
        eventBus.fire('config.updated', config);
      });

      editorActions.register({
        camundaEndpointChanged: function(camundaEndpoint) {
          self.config.camundaEndpoint = camundaEndpoint;
          modeler.config.camundaEndpoint = camundaEndpoint;
        }
      });
      editorActions.register({
        nisqAnalyzerEndpointChanged: function(nisqAnalyzerEndpoint) {
          self.config.nisqAnalyzerEndpoint = nisqAnalyzerEndpoint;
          modeler.config.nisqAnalyzerEndpoint = nisqAnalyzerEndpoint;
        }
      });
      editorActions.register({
        opentoscaEndpointChanged: function(opentoscaEndpoint) {
          self.config.opentoscaEndpoint = opentoscaEndpoint;
          modeler.config.opentoscaEndpoint = opentoscaEndpoint;
        }
      });
      editorActions.register({
        qrmRepoNameChanged: function(qrmRepoName) {
          self.config.qrmRepoName = qrmRepoName;
          modeler.config.qrmRepoName = qrmRepoName;
        }
      });
      editorActions.register({
        qrmUserNameChanged: function(qrmUserName) {
          self.config.qrmUserName = qrmUserName;
          modeler.config.qrmUserName = qrmUserName;
        }
      });
      editorActions.register({
        qrmRepoPathChanged: function(qrmRepoPath) {
          self.config.qrmRepoPath = qrmRepoPath;
          modeler.config.qrmRepoPath = qrmRepoPath;
        }
      });
      editorActions.register({
        transformationFrameworkEndpointChanged: function(transformationFrameworkEndpoint) {
          self.config.transformationFrameworkEndpoint = transformationFrameworkEndpoint;
          modeler.config.transformationFrameworkEndpoint = transformationFrameworkEndpoint;
        }
      });
      editorActions.register({
        wineryEndpointChanged: function(wineryEndpoint) {
          self.config.wineryEndpoint = wineryEndpoint;
          modeler.config.wineryEndpoint = wineryEndpoint;
          eventBus.fire('config.updated', self.config);
        }
      });
    });

    // change to modeler corresponding to the active tab
    this.props.subscribe('app.activeTabChanged', ({ activeTab }) => {
      if (this.modeler) {
        const config = this.modeler.config;
        this.modeler = this.modelers[activeTab.id];
        this.modeler.config = config;
        this.modeler.get('eventBus').fire('config.updated', config);
      }
    });
  }

  handleConfigClosed(newConfig) {
    this.setState({ configOpen: false });

    // update configuration in frontend and backend if passed through the modal
    if (newConfig) {
      this.config = newConfig;
      this.backendConfig.setConfigFromModal(newConfig);
    }
  }

  render() {

    // render config button and pop-up menu
    return (<Fragment>
      <Fill slot="toolbar">
        <button type="button" className="src-app-primitives-Button__Button--3Ffn0" title="Open configuration menu"
          onClick={() => this.setState({ configOpen: true })}>
          <span className="config"><span className="indent">Configuration</span></span>
        </button>
      </Fill>
      {this.state.configOpen && (
        <ConfigModal
          onClose={this.handleConfigClosed}
          initValues={this.config}
        />
      )}
    </Fragment>);
  }
}

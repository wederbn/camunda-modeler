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

export default class ConfigPlugin extends PureComponent {

  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleConfigClosed = this.handleConfigClosed.bind(this);
  }

  handleConfigClosed(newConfig) {
    this.setState({ configOpen: false });

    if (newConfig) {

      // TODO
      console.log('Received new config...');
      console.log(newConfig);
    }
  }

  render() {

    // render config button and pop-up menu
    return (<Fragment>
      <Fill slot="toolbar">
        <button type="button" className="src-app-primitives-Button__Button--3Ffn0" title="Open configuration menu"
          onClick={() => this.setState({ configOpen: true })}>
          <span className="app-icon-properties"><span className="indent">Configuration</span></span>
        </button>
      </Fill>
      {this.state.configOpen && (
        <ConfigModal
          onClose={this.handleConfigClosed}
          initValues={{
            camundaEndpoint: 'TODO',
            opentoscaEndpoint: 'TODO',
            qrmRepoName: 'TODO',
            qrmUserName: 'TODO'
          }}
        />
      )}
    </Fragment>);
  }
}

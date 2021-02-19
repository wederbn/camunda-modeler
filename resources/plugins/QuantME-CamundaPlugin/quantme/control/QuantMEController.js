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

import { startReplacementProcess } from '../replacement/QuantMETransformator';

export default class QuantMEController extends PureComponent {

  constructor(props) {

    super(props);

    // modelers for all tabs to enable switching between them
    this.modelers = {};

    // get QuantME component from the backend, e.g., to retrieve current QRMs
    this.quantME = props._getGlobal('quantME');

    // get API component from the backend, e.g., to send back results of long-running tasks
    this.api = props._getGlobal('api');
  }

  componentDidMount() {

    // initialize component with created modeler
    this.props.subscribe('bpmn.modeler.created', (event) => {

      const {
        modeler, tab
      } = event;

      // save modeler and activate as current modeler
      this.modelers[tab.id] = modeler;
      this.modeler = modeler;

      // load components required to access, adapt, and transform the current QuantME workflow
      this.editorActions = modeler.get('editorActions');

      // register actions to enable invocation over the menu and the API
      const self = this;

      // transform the workflow passed through the API to a native workflow
      this.editorActions.register({
        transformWorkflow: async function(params) {
          console.log('Transforming workflow posted through API!');
          let currentQRMs = await self.quantME.getQRMs();
          let result = await startReplacementProcess(params.xml, currentQRMs);

          // return result to API
          self.api.sendResult(params.returnPath, params.id, { status: result.status, xml: result.xml });
        }
      });

      // trigger initial QRM update
      this.quantME.updateQRMs().then(response => {
        console.log('Update of QRMs completed: ', response);
      }).catch(e => {
        self.props.displayNotification({
          type: 'warning',
          title: 'Unable to load QRMs',
          content: e,
          duration: 20000
        });
      });
    });

    // change to modeler corresponding to the active tab
    this.props.subscribe('app.activeTabChanged', ({ activeTab }) => {
      this.modeler = this.modelers[activeTab.id];
    });

    // remove corresponding modeler if tab is closed
    this.props.subscribe('app.closedTab', ({ tab }) => {
      delete this.modelers[tab.id];
    });
  }

  updateQRMs() {
    this.quantME.updateQRMs().then(response => {
      console.log('Update of QRMs completed: ', response);
    }).catch(e => {
      this.props.displayNotification({
        type: 'warning',
        title: 'Unable to load QRMs',
        content: e,
        duration: 20000
      });
    });
  }

  async transformWorkflow() {
    this.props.displayNotification({
      type: 'info',
      title: 'Workflow Transformation Started!',
      content: 'Successfully started transformation process for the current workflow!',
      duration: 7000
    });
    let xml = await this.modeler.get('bpmnjs').saveXML();
    let currentQRMs = await this.quantME.getQRMs();
    let result = await startReplacementProcess(xml.xml, currentQRMs);

    if (result.status === 'transformed') {
      await this.modeler.get('bpmnjs').importXML(result.xml);
    } else {
      this.props.displayNotification({
        type: 'warning',
        title: 'Unable to transform workflow',
        content: result.cause,
        duration: 10000
      });
    }
  }

  render() {
    return <Fill slot="toolbar">
      <button type="button" className="src-app-primitives-Button__Button--3Ffn0" title="Update QRMs from repository"
        onClick={() => this.updateQRMs()}>
        <span className="qrm-reload"><span className="indent">Update QRMs</span></span>
      </button>
      <button type="button" className="src-app-primitives-Button__Button--3Ffn0" title="Transform the current workflow"
        onClick={() => this.transformWorkflow()}>
        <span className="workflow-transformation"><span className="indent">Transformation</span></span>
      </button>
    </Fill>;
  }
}

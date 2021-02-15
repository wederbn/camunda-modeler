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

/* eslint-disable no-unused-vars */
import React, { useState } from 'camunda-modeler-plugin-helpers/react';
import { Modal } from 'camunda-modeler-plugin-helpers/components';

// polyfill upcoming structural components
const Title = Modal.Title || (({ children }) => <h2>{children}</h2>);
const Body = Modal.Body || (({ children }) => <div>{children}</div>);
const Footer = Modal.Footer || (({ children }) => <div>{children}</div>);

export default function ServiceDeploymentOverviewModal({ onClose, initValues }) {

  const onNext = () => onClose({ next: true, initValues: initValues });

  const listItems = initValues.map((CSAR) =>
    <tr key={CSAR.id}>
      <td>{CSAR.csarName}</td>
      <td>{CSAR.id}</td>
      <td>{CSAR.type}</td>
    </tr>
  );

  return <Modal onClose={onClose}>

    <Title>
      Service Deployment (1/3)
    </Title>

    <Body>
      <h3 className="spaceUnder">CSARs that have to be uploaded to the OpenTOSCA Container:</h3>

      <table>
        <tbody>
          <tr>
            <th>CSAR Name</th>
            <th>Related Task ID</th>
            <th>Type (Push/Pull)</th>
          </tr>
          {listItems}
        </tbody>
      </table>
    </Body>

    <Footer>
      <div id="deploymentButtons">
        <button type="button" className="btn btn-primary" onClick={() => onNext()}>Upload CSARs</button>
        <button type="button" className="btn btn-secondary" onClick={() => onClose()}>Cancel</button>
      </div>
    </Footer>
  </Modal>;
}

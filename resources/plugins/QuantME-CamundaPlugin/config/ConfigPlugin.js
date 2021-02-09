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

export default class ConfigPlugin extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    // render config button and pop-up menu
    return (<Fragment>
      <Fill slot="toolbar" group="9_autoSave">
        <button type="button" onClick={ () => this.setState({ configOpen: true }) }>
          TODO
        </button>
      </Fill>
    </Fragment>);
  }
}

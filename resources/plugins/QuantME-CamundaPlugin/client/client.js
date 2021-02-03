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

import { registerBpmnJSPlugin, registerClientExtension } from 'camunda-modeler-plugin-helpers';
import quantmeModelingModule from '../quantme/modeling';
import QuantMETransformator from '../quantme/replacement/QuantMETransformator';

registerBpmnJSPlugin(quantmeModelingModule);

registerClientExtension(QuantMETransformator);

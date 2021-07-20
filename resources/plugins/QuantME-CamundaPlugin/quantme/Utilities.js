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

import { createModelerFromXml } from './replacement/ModelerGenerator';
import { getRootProcess } from 'client/src/app/quantme/utilities/Utilities';

/**
 * Get the root process from a xml string representing a BPMN diagram
 *
 * @param xml the xml representing the BPMN diagram
 * @return the root process from the xml definitions
 */
export async function getRootProcessFromXml(xml) {
  let bpmnModeler = await createModelerFromXml(xml);

  // extract and return root process
  return getRootProcess(bpmnModeler.getDefinitions());
}

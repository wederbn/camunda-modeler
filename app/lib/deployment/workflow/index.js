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

const log = require('../../log')('app:deployment');

// retrieve the Camunda Engine endpoint from the environment variables or use localhost as default
let endpointEnv = process.env.CAMUNDA_ENDPOINT;
if (endpointEnv !== undefined) {
  this.tomcatUrl = endpointEnv;
} else {
  this.tomcatUrl = 'http://localhost:8080/engine-rest';
}

/**
 * Get the endpoint of the configured Camunda engine to deploy to
 *
 * @return {string} the currently specified endpoint of the Camunda engine
 */
module.exports.getCamundaEndpoint = function() {
  return this.tomcatUrl;
};

/**
 * Set the endpoint of the Camunda engine to deploy to
 *
 * @param camundaEndpoint the endpoint of the Camunda engine
 */
module.exports.setCamundaEndpoint = function(camundaEndpoint) {
  if (camundaEndpoint !== null && camundaEndpoint !== undefined) {
    this.tomcatUrl = camundaEndpoint;
  }
};

module.exports.deployWorkflow = function(workflowXml) {
  log.info('Deploying workflow to Camunda Engine at endpoint: %s', this.tomcatUrl);

  // TODO
  return { status: 'failed' };
};

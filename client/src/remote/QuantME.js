/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

/**
 * QuantME API used by app.
 */
export default class QuantME {

  constructor(backend) {
    this.backend = backend;
  }

  /**
   * Get the currently available QRMs
   *
   * @return {Promise}
   */
  getQRMs() {
    return this.backend.send('quantme:get-qrms');
  }

  /**
   * Update the current QRM set by requesting an update at the Github repository
   *
   * @param githubUsername Github user name to retrieve the QRMs from
   * @param githubRepositoryName Github repository of the user to retrieve the QRMs from
   * @return {Promise}
   */
  updateQRMs(githubUsername, githubRepositoryName) {
    return this.backend.send('quantme:update-qrms', githubUsername, githubRepositoryName);
  }
}

/**
 * Copyright (c) 2020 Institute for the Architecture of Application System -
 * University of Stuttgart
 *
 * This program and the accompanying materials are made available under the
 * terms the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const log = require('../../log')('app:qrm-manager');
const qrmHandler = require('./QRMHandler');
let QRMs = [];

module.exports.getQRMs = function() {
  log.info('Retrieving QRMs from backend. Number of QRMs: %i', QRMs.length);
  return QRMs;
};

module.exports.updateQRMs = function() {
  log.info('Updating QRMs in backend.');
  qrmHandler.getCurrentQRMs(process.env.QRM_USERNAME, process.env.QRM_REPOSITORY)
    .then(result => QRMs = result);
};

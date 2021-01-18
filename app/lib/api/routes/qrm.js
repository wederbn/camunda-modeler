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

const { Router } = require('express');
const qrmHandler = require('../../quantme/qrm-manager');

const router = Router();

router.get('/', (req, res) => {
  res.json({ qrms: qrmHandler.getQRMs(),
    '_links': {
      'self': { method: 'GET', href: req.header('host') + '/quantme/qrms' },
      'update': { method: 'POST', title: 'Reload the available QRMs form the specified repository', href: req.header('host') + '/quantme/qrms/update' },
      'username': { method: 'GET', title: 'Get the username for the QRM repository', href: req.header('host') + '/quantme/qrms/username' },
      'repository': { method: 'GET', title: 'Get the name of the QRM repository', href: req.header('host') + '/quantme/qrms/repository' }
    } });
});

// retrieve current username for the QRM repository
router.get('/username', (req, res) => {
  res.json({ 'username':  qrmHandler.getQRMRepositoryUserName(),
    '_links': {
      'self': { method: 'GET', href: req.header('host') + '/quantme/qrms/username' },
      'update': { method: 'PUT', title: 'Update the username for the QRM repository', href: req.header('host') + '/quantme/qrms/username' }
    } });
});

// retrieve current repository name for the QRM repository
router.get('/repository', (req, res) => {
  res.json({ 'name':  qrmHandler.getQRMRepositoryName(),
    '_links': {
      'self': { method: 'GET', href: req.header('host') + '/quantme/qrms/repository' },
      'update': { method: 'PUT', title: 'Update the name of the QRM repository', href: req.header('host') + '/quantme/qrms/repository' }
    } });
});

// TODO: add POST, PUT, ...

module.exports = router;

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
const router = Router();
const renderer = require('../../util/renderer');

// TODO: implement required routes
router.get('/', (req, res) => {
  renderer.send('test:action', 'quit');
  return res.send('Workflow resource...');
});

module.exports = router;
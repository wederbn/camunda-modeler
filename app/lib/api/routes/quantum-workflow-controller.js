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
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const log = require('../../log')('app:api:quantum-workflow-controller');

let workflows = [];

router.get('/', (req, res) => {
  let body = {
    workflows: workflows,
    '_links': {
      'self': { method: 'GET', href: req.header('host') + '/quantme/workflows' },
      'transform': {
        method: 'POST',
        title: 'Transform a given QuantME workflow into a native workflow!',
        href: req.header('host') + '/quantme/workflows'
      },
    }
  };

  // add links to all transformed workflows
  for (let i = 0; i < workflows.length; i++) {
    let workflow = workflows[i];

    if (workflow.status === 'finished') {
      body._links[workflow.id] = { method: 'GET', href: req.header('host') + '/quantme/workflows/' + workflow.id };
    }
  }

  res.json(body);
});

// transform the given QuantME workflow model into a native workflow model
router.post('/', jsonParser, function(req, res) {

  // TODO: get xml, create new object, invoke transformation
  res.status(201).send();
});

router.get('/:id', (req, res) => {
  let id = req.params.id;

  // TODO: get workflow and return 404 otherwise
  let workflow = 'TEST';

  res.json({
    workflow: workflow,
    '_links': {
      'self': { method: 'GET', href: req.header('host') + '/quantme/workflows/' + id }
    }
  });
});

module.exports.addResultOfLongRunningTask = function(id, args) {
  log.info('Updating workflow object with id: ' + id);

  // get element with the specified id
  const workflow = workflows.find(o => o.id === id);

  if (workflow === undefined) {
    log.error('Unable to find workflow object with id: ' + id);
    return;
  }

  // filter object from list
  workflows = workflows.filter(function(obj) {
    return obj.id !== id;
  });

  // add updated workflow
  workflow.status = args.status;
  workflow.xml = args.xml;
  workflows.push(workflow);
};

module.exports = router;

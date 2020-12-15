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

let EntryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
let ModelUtil = require('bpmn-js/lib/util/ModelUtil');
let CmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');
import * as consts from '../Constants';

export function addAlgorithmEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.ALGORITHM,
    label: translate('Algorithm'),
    modelProperty: consts.ALGORITHM,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let algorithm = bo && bo.algorithm;
      return { algorithm: algorithm };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        algorithm: values.algorithm || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addProviderEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.PROVIDER,
    label: translate('Provider'),
    modelProperty: consts.PROVIDER,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let provider = bo && bo.provider;
      return { provider: provider };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        provider: values.provider || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addQuantumCircuitEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.QUANTUM_CIRCUIT,
    label: translate('Quantum Circuit'),
    modelProperty: consts.QUANTUM_CIRCUIT,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let quantumCircuit = bo && bo.quantumCircuit;
      return { quantumCircuit: quantumCircuit };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        quantumCircuit: values.quantumCircuit || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addUrlEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.URL,
    label: translate('URL'),
    modelProperty: consts.URL,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let url = bo && bo.url;
      return { url: url };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        url: values.url || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addEncodingSchemaEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.ENCODING_SCHEMA,
    label: translate('Encoding Schema'),
    modelProperty: consts.ENCODING_SCHEMA,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let encodingSchema = bo && bo.encodingSchema;
      return { encodingSchema: encodingSchema };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        encodingSchema: values.encodingSchema || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addProgrammingLanguageEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.PROGRAMMING_LANGUAGE,
    label: translate('Programming Language'),
    modelProperty: consts.PROGRAMMING_LANGUAGE,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let programmingLanguage = bo && bo.programmingLanguage;
      return { programmingLanguage: programmingLanguage };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        programmingLanguage: values.programmingLanguage || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addOracleIdEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.ORACLE_ID,
    label: translate('Oracle Id'),
    modelProperty: consts.ORACLE_ID,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let oracleId = bo && bo.oracleId;
      return { oracleId: oracleId };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        oracleId: values.oracleId || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addOracleCircuitEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.ORACLE_CIRCUIT,
    label: translate('Oracle Circuit'),
    modelProperty: consts.ORACLE_CIRCUIT,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let oracleCircuit = bo && bo.oracleCircuit;
      return { oracleCircuit: oracleCircuit };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        oracleCircuit: values.oracleCircuit || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addOracleURLEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.ORACLE_URL,
    label: translate('Oracle URL'),
    modelProperty: consts.ORACLE_URL,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let oracleURL = bo && bo.oracleURL;
      return { oracleURL: oracleURL };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        oracleURL: values.oracleURL || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addQpuEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.QPU,
    label: translate('QPU'),
    modelProperty: consts.QPU,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let qpu = bo && bo.qpu;
      return { qpu: qpu };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        qpu: values.qpu || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addShotsEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.SHOTS,
    label: translate('Shots'),
    modelProperty: consts.SHOTS,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let shots = bo && bo.shots;
      return { shots: shots };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        shots: values.shots || undefined
      });
    },

    validate: function(element, values, node) {
      return values.shots && isNaN(values.shots) ? { shots: translate('Shots attribute must contain an Integer!') } : {};
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addUnfoldingTechniqueEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.UNFOLDING_TECHNIQUE,
    label: translate('Unfolding Technique'),
    modelProperty: consts.UNFOLDING_TECHNIQUE,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let unfoldingTechnique = bo && bo.unfoldingTechnique;
      return { unfoldingTechnique: unfoldingTechnique };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        unfoldingTechnique: values.unfoldingTechnique || undefined
      });
    },

    validate: function(element, values, node) {
      return true;
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}

export function addMaxAgeEntry(group, translate) {
  group.entries.push(EntryFactory.textField({
    id: consts.MAX_AGE,
    label: translate('Max Age (in minutes)'),
    modelProperty: consts.MAX_AGE,

    get: function(element, node) {
      let bo = ModelUtil.getBusinessObject(element);
      let maxAge = bo && bo.maxAge;
      return { maxAge: maxAge };
    },

    set: function(element, values, node) {
      let bo = ModelUtil.getBusinessObject(element);
      return CmdHelper.updateBusinessObject(element, bo, {
        maxAge: values.maxAge || undefined
      });
    },

    validate: function(element, values, node) {
      return values.maxAge && isNaN(values.maxAge) ? { maxAge: translate('MaxAge attribute must contain an Integer!') } : {};
    },

    hidden: function(element, node) {
      return false;
    }
  }));
}
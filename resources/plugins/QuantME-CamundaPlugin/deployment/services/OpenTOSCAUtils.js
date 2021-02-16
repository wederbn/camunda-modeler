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

import { fetch } from 'whatwg-fetch';

/**
 * Upload the CSAR located at the given URL to the connected OpenTOSCA Container and return the corresponding URL and required input parameters
 *
 * @param opentoscaEndpoint the endpoint of the OpenTOSCA Container
 * @param csarName the name of the CSAR to upload
 * @param url the URL pointing to the CSAR
 */
export async function uploadCSARToContainer(opentoscaEndpoint, csarName, url) {

  if (opentoscaEndpoint === undefined) {
    console.error('OpenTOSCA endpoint is undefined. Unable to upload CSARs...');
    return { success: false };
  }

  // check if CSAR us already uploaded
  let getCSARResult = await getBuildPlanForCSAR(opentoscaEndpoint, csarName);

  if (!getCSARResult.success) {
    console.log('CSAR is not yet uploaded. Uploading...');

    let body = {
      enrich: 'false',
      name: csarName,
      url: url
    };

    // upload the CSAR
    await fetch(opentoscaEndpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });

    // check successful upload and retrieve corresponding url
    getCSARResult = await getBuildPlanForCSAR(opentoscaEndpoint, csarName);

    if (!getCSARResult.success) {
      console.error('Uploading CSAR failed!');
      return { success: false };
    }
  }

  // retrieve input parameters for the build plan
  let buildPlanResult = await fetch(getCSARResult.url);
  let buildPlanResultJson = await buildPlanResult.json();

  return { success: true, url: getCSARResult.url, inputParameters: buildPlanResultJson.input_parameters };
}

/**
 * Get the link to the build plan of the CSAR with the given name if it is uploaded to the OpenTOSCA Container
 *
 * @param opentoscaEndpoint the endpoint of the OpenTOSCA Container
 * @param csarName the name of the csar
 * @return the status whether the given CSAR is uploaded and the corresponding build plan link if available
 */
export async function getBuildPlanForCSAR(opentoscaEndpoint, csarName) {

  // get all currently deployed CSARs
  let response = await fetch(opentoscaEndpoint);
  let responseJson = await response.json();

  let deployedCSARs = responseJson.csars;
  if (deployedCSARs === undefined) {

    // no CSARs available
    return { success: false };
  }

  for (let i = 0; i < deployedCSARs.length; i++) {
    let deployedCSAR = deployedCSARs[i];
    if (deployedCSAR.id === csarName) {
      console.log('Found uploaded CSAR with id: %s', csarName);
      let url = deployedCSAR._links.self.href;

      // retrieve the URl to the build plan required to get the input parameters and to instantiate the CSAR
      return getBuildPlanUrl(url);
    }
  }

  // unable to find CSAR
  return { success: false };
}

/**
 * Get the URL to the build plan of the given CSAR
 *
 * @param csarUrl the URL to a CSAR
 * @return the URL to the build plan for the given CSAR
 */
export async function getBuildPlanUrl(csarUrl) {

  let response = await fetch(csarUrl + '/servicetemplates');
  let responseJson = await response.json();

  if (!responseJson.service_templates || responseJson.service_templates.length !== 1) {
    console.error('Unable to find service template in CSAR at URL: %s', csarUrl);
    return { success: false };
  }

  let buildPlansUrl = responseJson.service_templates[0]._links.self.href + '/buildplans';
  response = await fetch(buildPlansUrl);
  responseJson = await response.json();

  if (!responseJson.plans || responseJson.plans.length !== 1) {
    console.error('Unable to find build plan at URL: %s', buildPlansUrl);
    return { success: false };
  }

  return { success: true, url: responseJson.plans[0]._links.self.href };
}

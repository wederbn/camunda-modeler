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

export default function QuantMEPathMap() {

  this.quantMEPathMap = {
    'TASK_TYPE_QUANTUM_COMPUTATION': {
      d: 'M 52.40,72.72 ' +
      'C 52.40,66.00 57.74,60.56 64.32,60.56 ' +
      '70.90,60.56 76.24,66.00 76.24,72.72 ' +
      '76.24,79.44 70.90,84.88 64.32,84.88 ' +
      '57.74,84.88 52.40,79.44 52.40,72.72 Z ' +
      'M 4.32,35.82 ' +
      'C -2.69,47.49 18.45,73.07 51.56,92.96 ' +
      '84.66,112.85 117.17,119.51 124.18,107.85 ' +
      '131.19,96.18 110.05,70.60 76.94,50.71 ' +
      '43.84,30.82 11.33,24.15 4.32,35.82 Z ' +
      'M 62.48,2.00 ' +
      'C 48.87,2.00 37.84,33.30 37.84,71.92 ' +
      '37.84,110.54 48.87,141.84 62.48,141.84 ' +
      '76.09,141.84 87.12,110.54 87.12,71.92 ' +
      '87.12,33.30 76.09,2.00 62.48,2.00 ' +
        '62.48,2.00 62.48,2.00 62.48,2.00 Z ' +
      'M 124.18,39.38 ' +
      'C 117.17,27.71 84.66,34.37 51.56,54.26 ' +
      '18.45,74.15 -2.70,99.73 4.32,111.40 ' +
      '11.33,123.07 43.84,116.41 76.94,96.52 ' +
      '110.05,76.63 131.19,51.05 124.18,39.38 Z'
    },
    'TASK_TYPE_CIRCUIT_CREATION': {
      d: 'M 4.32,12.32 ' +
      'C 4.32,12.32 125.70,12.32 125.70,12.32M 4.32,48.64 ' +
      'C 4.32,48.64 125.70,48.64 125.70,48.64M 4.32,87.36 ' +
      'C 4.32,87.36 125.70,87.36 125.70,87.36M 42.08,12.32 ' +
      'C 42.08,12.32 42.08,102.27 42.08,102.27M 26.88,87.28 ' +
      'C 26.88,78.93 33.69,72.16 42.08,72.16 ' +
      '50.47,72.16 57.28,78.93 57.28,87.28 ' +
      '57.28,95.63 50.47,102.40 42.08,102.40 ' +
      '33.69,102.40 26.88,95.63 26.88,87.28 ' +
      '26.88,87.28 26.88,87.28 26.88,87.28 Z ' +
      'M 75.52,48.56 ' +
      'C 75.52,40.21 82.29,33.44 90.64,33.44 ' +
      '98.99,33.44 105.76,40.21 105.76,48.56 ' +
      '105.76,56.91 98.99,63.68 90.64,63.68 ' +
      '82.29,63.68 75.52,56.91 75.52,48.56 ' +
      '75.52,48.56 75.52,48.56 75.52,48.56 Z ' +
      'M 90.56,34.08 ' +
      'C 90.56,34.08 90.56,85.67 90.56,85.67'
    },
    'TASK_TYPE_CIRCUIT_CREATION_FILL': {
      d: 'M 32.16,13.44 ' +
        'C 32.16,7.87 36.67,3.36 42.24,3.36 ' +
        '47.81,3.36 52.32,7.87 52.32,13.44 ' +
        '52.32,19.01 47.81,23.52 42.24,23.52 ' +
        '36.67,23.52 32.16,19.01 32.16,13.44 ' +
        '32.16,13.44 32.16,13.44 32.16,13.44 Z ' +
        'M 80.48,86.48 ' +
        'C 80.48,80.87 85.03,76.32 90.64,76.32 ' +
        '96.25,76.32 100.80,80.87 100.80,86.48 ' +
        '100.80,92.09 96.25,96.64 90.64,96.64 ' +
        '85.03,96.64 80.48,92.09 80.48,86.48 ' +
        '80.48,86.48 80.48,86.48 80.48,86.48 Z'
    },
    'TASK_TYPE_DATA_PREPARATION': {
      d: 'M 1.92,21.60 ' +
      'C 1.92,21.60 134.69,21.60 134.69,21.60M 1.92,52.96 ' +
      'C 1.92,52.96 134.69,52.96 134.69,52.96M 1.92,86.56 ' +
      'C 1.92,86.56 134.69,86.56 134.69,86.56M 66.24,21.60 ' +
      'C 66.24,21.60 66.24,99.67 66.24,99.67M 53.12,86.40 ' +
      'C 53.12,79.15 58.99,73.28 66.24,73.28 ' +
      '73.49,73.28 79.36,79.15 79.36,86.40 ' +
      '79.36,93.65 73.49,99.52 66.24,99.52 ' +
      '58.99,99.52 53.12,93.65 53.12,86.40 ' +
      '53.12,86.40 53.12,86.40 53.12,86.40 Z ' +
      'M 95.20,52.96 ' +
      'C 95.20,45.71 101.07,39.84 108.32,39.84 ' +
      '115.57,39.84 121.44,45.71 121.44,52.96 ' +
      '121.44,60.21 115.57,66.08 108.32,66.08 ' +
      '101.07,66.08 95.20,60.21 95.20,52.96 ' +
      '95.20,52.96 95.20,52.96 95.20,52.96 Z ' +
      'M 108.16,40.32 ' +
      'C 108.16,40.32 108.16,84.98 108.16,84.98'
    },
    'TASK_TYPE_DATA_PREPARATION_FILL_BLACK': {
      d: 'M 57.92,22.48 ' +
        'C 57.92,17.66 61.86,13.76 66.72,13.76 ' +
        '71.58,13.76 75.52,17.66 75.52,22.48 ' +
        '75.52,27.30 71.58,31.20 66.72,31.20 ' +
        '61.86,31.20 57.92,27.30 57.92,22.48 Z ' +
        'M 99.52,85.68 ' +
        'C 99.52,80.86 103.46,76.96 108.32,76.96 ' +
        '113.18,76.96 117.12,80.86 117.12,85.68 ' +
        '117.12,90.50 113.18,94.40 108.32,94.40 ' +
        '103.46,94.40 99.52,90.50 99.52,85.68 ' +
        ' 99.52,85.68 99.52,85.68 99.52,85.68 Z'
    },
    'TASK_TYPE_DATA_PREPARATION_FILL_BACKGROUND': {
      d: 'M 17.76,31.84 ' +
      'C 17.76,31.84 38.88,31.84 38.88,31.84 ' +
      '38.88,31.84 38.88,12.16 38.88,12.16 ' +
      '38.88,12.16 17.76,12.16 17.76,12.16 ' +
      '17.76,12.16 17.76,31.84 17.76,31.84 Z ' +
      'M 17.28,95.84 ' +
      'C 17.28,95.84 38.40,95.84 38.40,95.84 ' +
      '38.40,95.84 38.40,76.16 38.40,76.16 ' +
      '38.40,76.16 17.28,76.16 17.28,76.16 ' +
      '17.28,76.16 17.28,95.84 17.28,95.84 Z'
    },
    'TASK_TYPE_DATA_PREPARATION_DASHED': {
      d: 'M 9.60,9.04 ' +
        'C 9.60,5.73 12.29,3.04 15.60,3.04 ' +
        '15.60,3.04 39.60,3.04 39.60,3.04 ' +
        '42.91,3.04 45.60,5.73 45.60,9.04 ' +
        '45.60,9.04 45.60,96.88 45.60,96.88 ' +
        '45.60,100.19 42.91,102.88 39.60,102.88 ' +
        '39.60,102.88 15.60,102.88 15.60,102.88 ' +
        '12.29,102.88 9.60,100.19 9.60,96.88 ' +
        '9.60,96.88 9.60,9.04 9.60,9.04 Z'
    },
    'TASK_TYPE_ORACLE_EXPANSION': {
      d: 'M 90.20,18.56 ' +
      'C 90.20,18.56 167.56,18.56 167.56,18.56M 90.20,41.60 ' +
      'C 90.20,41.60 167.56,41.60 167.56,41.60M 90.20,66.40 ' +
      'C 90.20,66.40 167.56,66.40 167.56,66.40M 114.35,18.56 ' +
      'C 114.35,18.56 114.35,75.31 114.35,75.31M 104.75,66.32 ' +
      'C 104.75,60.97 109.08,56.64 114.43,56.64 ' +
      '119.77,56.64 124.10,60.97 124.10,66.32 ' +
      '124.10,71.67 119.77,76.00 114.43,76.00 ' +
      '109.08,76.00 104.75,71.67 104.75,66.32 Z ' +
      'M 135.62,41.68 ' +
      'C 135.62,36.33 139.95,32.00 145.29,32.00 ' +
      '150.64,32.00 154.97,36.33 154.97,41.68 ' +
      '154.97,47.03 150.64,51.36 145.29,51.36 ' +
      '139.95,51.36 135.62,47.03 135.62,41.68 Z ' +
      'M 145.37,32.32 ' +
      'C 145.37,32.32 145.37,65.22 145.37,65.22'
    },
    'TASK_TYPE_ORACLE_EXPANSION_FILL_BLACK': {
      d: 'M 108.27,19.28 ' +
        'C 108.27,15.70 111.17,12.80 114.75,12.80 ' +
        '118.32,12.80 121.22,15.70 121.22,19.28 ' +
        '121.22,22.86 118.32,25.76 114.75,25.76 ' +
        '111.17,25.76 108.27,22.86 108.27,19.28 Z ' +
        'M 138.97,65.84 ' +
        'C 138.97,62.26 141.84,59.36 145.37,59.36 ' +
        '148.90,59.36 151.77,62.26 151.77,65.84 ' +
        '151.77,69.42 148.90,72.32 145.37,72.32 ' +
        '141.84,72.32 138.97,69.42 138.97,65.84 Z'
    },
    'TASK_TYPE_ORACLE_EXPANSION_BOX': {
      d: 'M 2.24,72.32 ' +
        'C 2.24,72.32 47.70,72.32 47.70,72.32 ' +
        '47.70,72.32 47.70,29.24 47.70,29.24 ' +
        '47.70,29.24 2.24,29.24 2.24,29.24 ' +
        '2.24,29.24 2.24,72.32 2.24,72.32 Z ' +
        'M 47.70,29.24 ' +
        'C 47.70,29.24 62.05,14.88 62.05,14.88 ' +
        '62.05,14.88 62.05,57.96 62.05,57.96 ' +
        '62.05,57.96 47.70,72.32 47.70,72.32 ' +
        '47.70,72.32 47.70,29.24 47.70,29.24 Z ' +
        'M 2.24,29.24 ' +
        'C 2.24,29.24 16.59,14.88 16.59,14.88 ' +
        '16.59,14.88 62.05,14.88 62.05,14.88 ' +
        '62.05,14.88 47.70,29.24 47.70,29.24 ' +
        '47.70,29.24 2.24,29.24 2.24,29.24 Z'
    },
    'TASK_TYPE_ORACLE_EXPANSION_ARROW': {
      d: 'M 66.93,41.92 ' +
        'C 66.93,41.92 80.58,41.92 80.58,41.92 ' +
        '80.58,41.92 80.58,44.64 80.58,44.64 ' +
        '80.58,44.64 66.93,44.64 66.93,44.64 ' +
        '66.93,44.64 66.93,41.92 66.93,41.92 Z ' +
        'M 78.06,37.94 ' +
        'C 78.06,37.94 84.73,43.27 84.73,43.27 ' +
        '84.73,43.27 77.88,49.19 77.88,49.19 ' +
        '77.88,49.19 78.06,37.94 78.06,37.94 Z ' +
        'M 86.56,50.88'
    },
    'TASK_TYPE_CIRCUIT_EXECUTION': {
      d: 'M 29.92,45.28 ' +
      'C 29.92,41.57 32.89,38.56 36.56,38.56 ' +
      '40.23,38.56 43.20,41.57 43.20,45.28 ' +
      '43.20,48.99 40.23,52.00 36.56,52.00 ' +
      '32.89,52.00 29.92,48.99 29.92,45.28 Z ' +
      'M 3.35,24.86 ' +
      'C -0.53,31.32 11.18,45.48 29.51,56.49 ' +
      '47.83,67.50 65.83,71.19 69.71,64.73 ' +
      '73.59,58.27 61.88,44.11 43.56,33.10 ' +
      '25.24,22.09 7.24,18.40 3.35,24.86 Z ' +
      'M 35.52,6.08 ' +
      'C 28.01,6.08 21.92,23.42 21.92,44.80 ' +
      '21.92,66.18 28.01,83.52 35.52,83.52 ' +
      '43.03,83.52 49.12,66.18 49.12,44.80 ' +
      '49.12,23.42 43.03,6.08 35.52,6.08 ' +
      '35.52,6.08 35.52,6.08 35.52,6.08 Z ' +
      'M 69.71,26.83 ' +
      'C 65.83,20.37 47.83,24.06 29.51,35.07 ' +
      '11.18,46.08 -0.53,60.24 3.35,66.70 ' +
      '7.24,73.16 25.24,69.47 43.56,58.46 ' +
      '61.88,47.45 73.59,33.29 69.71,26.83 Z'
    },
    'TASK_TYPE_CIRCUIT_EXECUTION_FILL': {
      d: 'M 135.52,34.33 ' +
        'C 131.92,35.85 129.39,39.39 129.39,43.52 ' +
        '129.39,49.03 133.89,53.49 139.44,53.49 ' +
        '144.99,53.49 149.48,49.03 149.48,43.52 ' +
        '149.48,38.01 144.99,33.55 139.44,33.55 ' +
        '138.05,33.55 136.73,33.83 135.52,34.33 Z ' +
        'M 133.69,15.20 ' +
        'C 133.69,15.20 145.17,15.20 145.17,15.20 ' +
        '145.17,15.20 145.17,24.73 145.17,24.73 ' +
        '145.17,24.73 148.92,26.24 148.92,26.24 ' +
        '148.92,26.24 155.77,19.45 155.77,19.45 ' +
        '155.77,19.45 163.89,27.50 163.89,27.50 ' +
        '163.89,27.50 157.05,34.28 157.05,34.28 ' +
        '157.72,35.27 158.17,36.37 158.53,37.52 ' +
        '158.53,37.52 167.84,37.52 167.84,37.52 ' +
        '167.84,37.52 167.84,48.92 167.84,48.92 ' +
        '167.84,48.92 158.64,48.92 158.64,48.92 ' +
        '158.19,50.61 157.52,52.20 156.63,53.66 ' +
        '156.63,53.66 163.19,60.17 163.19,60.17 ' +
        '163.19,60.17 155.07,68.22 155.07,68.22 ' +
        '155.07,68.22 147.96,61.17 147.96,61.17 ' +
        '147.12,61.72 146.16,62.05 145.17,62.31 ' +
        '145.17,62.31 145.17,71.84 145.17,71.84 ' +
        '145.17,71.84 133.69,71.84 133.69,71.84 ' +
        '133.69,71.84 133.69,62.31 133.69,62.31 ' +
        '133.69,62.31 130.31,60.93 130.31,60.93 ' +
        '130.31,60.93 123.48,67.70 123.48,67.70 ' +
        '123.48,67.70 115.36,59.65 115.36,59.65 ' +
        '115.36,59.65 121.96,53.10 121.96,53.10 ' +
        '121.19,51.81 120.63,50.40 120.24,48.92 ' +
        '120.24,48.92 111.20,48.92 111.20,48.92 ' +
        '111.20,48.92 111.20,37.52 111.20,37.52 ' +
        '111.20,37.52 120.34,37.52 120.34,37.52 ' +
        '120.34,37.52 121.97,33.94 121.97,33.94 ' +
        '121.97,33.94 115.35,27.38 115.35,27.38 ' +
        '115.35,27.38 123.47,19.32 123.47,19.32 ' +
        '123.47,19.32 130.31,26.10 130.31,26.10 ' +
        '131.35,25.47 132.50,25.04 133.69,24.73 ' +
        '133.69,24.73 133.69,15.20 133.69,15.20 Z ' +
        'M 135.52,34.33 ' +
        'C 131.92,35.85 129.39,39.39 129.39,43.52 ' +
        '129.39,49.03 133.89,53.49 139.44,53.49 ' +
        '144.99,53.49 149.48,49.03 149.48,43.52 ' +
        '149.48,38.01 144.99,33.55 139.44,33.55 ' +
        '138.05,33.55 136.73,33.83 135.52,34.33 Z ' +
        'M 133.69,15.20 ' +
        'C 133.69,15.20 145.17,15.20 145.17,15.20 ' +
        '145.17,15.20 145.17,24.73 145.17,24.73 ' +
        '145.17,24.73 148.92,26.24 148.92,26.24 ' +
        '148.92,26.24 155.77,19.45 155.77,19.45 ' +
        '155.77,19.45 163.89,27.50 163.89,27.50 ' +
        '163.89,27.50 157.05,34.28 157.05,34.28 ' +
        '157.72,35.27 158.17,36.37 158.53,37.52 ' +
        '158.53,37.52 167.84,37.52 167.84,37.52 ' +
        '167.84,37.52 167.84,48.92 167.84,48.92 ' +
        '167.84,48.92 158.64,48.92 158.64,48.92 ' +
        '158.19,50.61 157.52,52.20 156.63,53.66 ' +
        '156.63,53.66 163.19,60.17 163.19,60.17 ' +
        '163.19,60.17 155.07,68.22 155.07,68.22 ' +
        '155.07,68.22 147.96,61.17 147.96,61.17 ' +
        '147.12,61.72 146.16,62.05 145.17,62.31 ' +
        '145.17,62.31 145.17,71.84 145.17,71.84 ' +
        '145.17,71.84 133.69,71.84 133.69,71.84 ' +
        '133.69,71.84 133.69,62.31 133.69,62.31 ' +
        '133.69,62.31 130.31,60.93 130.31,60.93 ' +
        '130.31,60.93 123.48,67.70 123.48,67.70 ' +
        '123.48,67.70 115.36,59.65 115.36,59.65 ' +
        '115.36,59.65 121.96,53.10 121.96,53.10 ' +
        '121.19,51.81 120.63,50.40 120.24,48.92 ' +
        '120.24,48.92 111.20,48.92 111.20,48.92 ' +
        '111.20,48.92 111.20,37.52 111.20,37.52 ' +
        '111.20,37.52 120.34,37.52 120.34,37.52 ' +
        '120.34,37.52 121.97,33.94 121.97,33.94 ' +
        '121.97,33.94 115.35,27.38 115.35,27.38 ' +
        '115.35,27.38 123.47,19.32 123.47,19.32 ' +
        '123.47,19.32 130.31,26.10 130.31,26.10 ' +
        '131.35,25.47 132.50,25.04 133.69,24.73 ' +
        '133.69,24.73 133.69,15.20 133.69,15.20 Z ' +
        'M 75.28,41.60 ' +
        'C 75.28,41.60 90.76,41.60 90.76,41.60 ' +
        '90.76,41.60 90.76,44.32 90.76,44.32 ' +
        '90.76,44.32 75.28,44.32 75.28,44.32 ' +
        '75.28,44.32 75.28,41.60 75.28,41.60 Z ' +
        'M 87.82,35.09 ' +
        'C 87.82,35.09 102.00,43.18 102.00,43.18 ' +
        '102.00,43.18 87.73,50.27 87.73,50.27 ' +
        '87.73,50.27 87.82,35.09 87.82,35.09 Z'
    },
    'TASK_TYPE_ERROR_MITIGATION': {
      d: 'M 24.37,8.90 ' +
      'C 24.37,8.90 17.06,8.90 17.06,8.90 ' +
      '17.06,8.90 17.06,91.76 17.06,91.76 ' +
      '17.06,91.76 99.90,91.76 99.90,91.76 ' +
      '99.90,91.76 99.90,84.45 99.90,84.45 ' +
      '99.90,84.45 24.37,84.45 24.37,84.45 ' +
      '24.37,84.45 24.37,8.90 24.37,8.90 Z ' +
      'M 31.68,77.13 ' +
      'C 31.68,77.13 45.08,77.13 45.08,77.13 ' +
      '45.08,77.13 45.08,34.49 45.08,34.49 ' +
      '45.08,34.49 31.68,34.49 31.68,34.49 ' +
      '31.68,34.49 31.68,77.13 31.68,77.13 Z ' +
      'M 49.95,77.13 ' +
      'C 49.95,77.13 63.35,77.13 63.35,77.13 ' +
      '63.35,77.13 63.35,8.90 63.35,8.90 ' +
      '63.35,8.90 49.95,8.90 49.95,8.90 ' +
      '49.95,8.90 49.95,77.13 49.95,77.13 Z ' +
      'M 68.22,77.13 ' +
      'C 68.22,77.13 81.62,77.13 81.62,77.13 ' +
      '81.62,77.13 81.62,34.49 81.62,34.49 ' +
      '81.62,34.49 68.22,34.49 68.22,34.49 ' +
      '68.22,34.49 68.22,77.13 68.22,77.13 Z ' +
      'M 86.50,77.13 ' +
      'C 86.50,77.13 99.90,77.13 99.90,77.13 ' +
      '99.90,77.13 99.90,55.20 99.90,55.20 ' +
      '99.90,55.20 86.50,55.20 86.50,55.20 ' +
      '86.50,55.20 86.50,77.13 86.50,77.13 Z'
    }
  };

  this.getPath = function getPath(pathId) {
    return this.quantMEPathMap[pathId].d;
  };
}

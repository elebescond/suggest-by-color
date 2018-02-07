#!/usr/bin/env node
import { extractColor } from '../core/extract-color';

var argv = require('yargs')
  .usage('Usage: $0 -limit [int]')
  .demandOption(['limit'])
  .argv;

extractColor(argv.limit)
  .then(products => {  
    products.forEach(product => {
      console.log(product.id, product.color)
    });
  })
  .catch(console.error)
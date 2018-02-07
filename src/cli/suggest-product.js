#!/usr/bin/env node
import { suggestProduct } from '../core/suggest-product';

var argv = require('yargs')
  .usage('Usage: $0 -reference [string]')
  .demandOption(['reference'])
  .argv;

  suggestProduct(argv.reference)
  .then(products => {
    products.forEach(product => {
      console.log(product.id, product.color, product.proximity, product.photo)
    });
  })
  .catch(console.error)
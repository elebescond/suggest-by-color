#!/usr/bin/env node
import validUrl from 'valid-url';
import { BAD_REQUEST_CATALOG } from '../core/const';
import { importCatalog } from '../core/import-catalog';

var argv = require('yargs')
  .usage('Usage: $0 -catalog [url]')
  .demandOption(['catalog'])
  .argv;

// TODO Validate url input
importCatalog(argv.catalog)
  .then(products => {  
    products.forEach(product => {
      console.log(`${product.id} imported`)
    });
  })
  .catch(console.error)
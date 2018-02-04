#!/usr/bin/env node
import validUrl from 'valid-url';
import { BAD_REQUEST_CATALOG } from '../core/const';
import { importCatalog } from '../core/import-catalog';

var argv = require('yargs')
    .usage('Usage: $0 -catalog [url]')
    .demandOption(['catalog'])
    .argv;

console.log("The area is:", argv.catalog)
importCatalog(argv.catalog)
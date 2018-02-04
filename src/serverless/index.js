import validUrl from 'valid-url';
import { BAD_REQUEST_CATALOG } from '../core/const';
import { importCatalog } from '../core/import-catalog';

/**
 * Refresh catalog from a remote CSV File.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.importCatalog = (req, res) => {
  
  // Extract inputs
  // Check POST and body 
  const catalogUrl = req.body.catalog;
  
  // Validate inputs
  if ( !validUrl.isUri(catalogUrl) ) {
      res
        .status(400)
        .send(BAD_REQUEST_CATALOG);
  }

  res.status(200);

  // Import catalog
  //importCatalog(catalogUrl).pipe(res);
  res.send(importCatalog(catalogUrl));

};

exports.event = (event, callback) => {
  callback();
};

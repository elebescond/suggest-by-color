import validUrl from 'valid-url'
import { BAD_REQUEST_CATALOG } from '../core/const'
import { importCatalog } from '../core/import-catalog'
import { suggestProduct } from '../core/suggest-product'

/**
 * Refresh catalog from a remote CSV File.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.importCatalog = (req, res) => {
  
  // Extract inputs
  // Check POST and body 
  const catalogUrl = req.body.catalog
  
  // Validate inputs
  if ( !validUrl.isUri(catalogUrl) ) {
      res
        .status(400)
        .send(BAD_REQUEST_CATALOG)
  }

  res.status(200)

  // Import catalog
  res.send(importCatalog(catalogUrl))

}


const handleGETSuggestProduct = (req, res) => {
  // Extract inputs
  // Check GET
  const reference = req.query.reference
  
  // Validate inputs
  if ( !reference ) {
      res
        .status(400)
        .send(BAD_REQUEST_REFERENCE)
  }

  suggestProduct(reference)
    .then(products => {
      res.status(200)
      res.send(products)
    })
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}

/**
 * Suggest products in the same color
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.suggestProduct = (req, res) => {
  
  switch (req.method) {
    case 'GET':
      handleGETSuggestProduct(req, res);
      break;
    default:
      res.status(403).send('Forbidden!');
      break;
  }

}

exports.event = (event, callback) => {
  callback()
}

import Datastore from '@google-cloud/datastore'

// Creates a client
const datastore = new Datastore();

// The kind for the new entity
const kind = 'Product';

exports.getProductsWithoutColor = (limit) => {
  
  const query = datastore
    .createQuery(kind)
    .filter('color', '=', null)
    .limit(limit)

  return datastore.runQuery(query)
    .then(results => {
      const products = results[0];
      return products
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  
}

/**
 * Save or update a product.
 *
 * @param {Object} product Cloud Function request context.
 */
exports.save = data => {
      
  // @TODO Validate input
  
  // The Cloud Datastore key for the new entity
  const productKey = datastore.key([kind, data.id])
  
  // Prepares the new entity
  const product = {
    key: productKey,
    data,
  };
      
  // Saves the entity
  return datastore
    .save(product)
    .then((result) => {
      return product.data
    })
    .catch(err => {
      console.error(`ERROR:, ${err}`)
      return err
    });

}

import Datastore from '@google-cloud/datastore'

// Creates a client
const datastore = new Datastore();

// The kind for the new entity
const kind = 'Product';

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
      console.log(`Saved ${product.key.name}: ${product.data.photo}`)
      return product.data
    })
    .catch(err => {
      console.error(`ERROR:, ${err}`)
      return err
    });

}

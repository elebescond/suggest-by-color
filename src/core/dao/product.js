import Datastore from '@google-cloud/datastore'

// Creates a client
const datastore = new Datastore();

// The kind for the new entity
const kind = 'Product';

exports.getProductsWithColor = (limit = 1000) => {
  
  const query = datastore
    .createQuery(kind)
    // TODO Read GQL API
    //.filter('color', '!=', null)
    .limit(limit)

  return datastore.runQuery(query)
    .then(results => {
      const products = results[0]
      // TODO Read GQL API
      return products.filter(product => product.color !== '')
    })
    .catch(err => {
      console.error(`ERROR:, ${err}`)
      return err
    });
  
}

exports.getProductsWithoutColor = (limit = 1000) => {
  
  const query = datastore
    .createQuery(kind)
    .filter('color', '=', null)
    .limit(limit)

  return datastore.runQuery(query)
    .then(results => {
      const products = results[0]
      return products
    })
    .catch(err => {
      console.error(`ERROR:, ${err}`)
      return err
    });
  
}

exports.getProductById = productId => {
  // TODO Read datastore API please :-)
  const query = datastore
    .createQuery(kind)
    .filter('__key__', '=', datastore.key([kind, productId]));

  return datastore.runQuery(query)
    .then(results => {
      const product = results[0][0]
      if(product && product.color) {
        return product
      }
      return Promise.reject(new Error(`Invalid product reference ${productId}`))
    })
    .catch(err => {
      console.error(`ERROR:, ${err}`)
      return err
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

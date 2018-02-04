import csv from 'csvtojson'
import productDao from './dao/product'
import request from 'request'
import transform from 'stream-transform'

const extractFromCsv = catalogUrl => {
  
  var promise = new Promise((resolve, reject) => {
    let products = []
    let options = {
      delimiter: ';'
    }
    let stream = request.get(catalogUrl)
    csv(options)
      .fromStream(stream)
      .on('json', product => {
        products.push(product)
      })
      .on('done', err => {
        if (err) {
           return reject(err)
        }
        resolve(products)
      })
  })
  
  return promise
}

const saveProducts = products => {
  const limit = 10;
  return Promise.all(products.reduce((promises, product, index) => {
    // What chain do we add it to?
    const chainNum = index % limit;
    let chain = promises[chainNum];
    if (!chain) {
        // New chain
        chain = promises[chainNum] = Promise.resolve();
    }
    // Add it
    promises[chainNum] = chain.then(_ => productDao.save(product));
    return promises;
  }, []));
}

/**
 * Refresh catalog from a remote CSV File.
 *
 * @param {String} catalogUrl Cloud Function request context.
 */
exports.importCatalog = catalogUrl => {
 
  return extractFromCsv(catalogUrl)
    .then(saveProducts)

}

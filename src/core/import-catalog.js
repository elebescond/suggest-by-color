import csv from 'csvtojson'
import productDao from './dao/product'
import request from 'request'
import transform from 'stream-transform'

const mapCsvToDatastore = product => {
  return {
    id: product.id,
    photo: 'https:' + product.photo,
    url: product.url,
    color: null
  }
}

const extractFromCsv = catalogUrl => {
  
  var promise = new Promise((resolve, reject) => {
    let products = []
    
    let options = {
      delimiter: ';'
    }
    
    let stream = request.get(catalogUrl)
      .on('error', err => reject(err))
    
    csv(options)
      .fromStream(stream)
      .on('json', product => {
        products.push(mapCsvToDatastore(product))
      })
      .on('done', err => {
        if (err) {
           return reject(err)
        }
        if(products.length == 0) {
          return reject(new Error('No product detected'))
        }
        resolve(products)
      })
  })
  
  return promise
}

const saveProducts = products => {
  const limit = 3
  return Promise.all(products.reduce((promises, product, index) => {
    // What chain do we add it to?
    const chainNum = index % limit
    let chain = promises[index]

    if (!chain) {
        // New chain
        chain = promises[index] = Promise.resolve(product)
    }
    // Add it
    promises[index] = chain.then(_ => productDao.save(product))
    return promises
  }, []))
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

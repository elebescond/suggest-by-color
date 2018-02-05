
import Vision from '@google-cloud/vision'
import fs from 'fs'
import os from 'os'
import path from 'path'
import request from 'request'
import url from 'url'
import productDao from './dao/product'


const detectProperties = fileName => {
  // Creates a client
  const client = new Vision.ImageAnnotatorClient()

  // Performs property detection on the local file
  client
    .imageProperties(fileName)
    .then(results => {
      const properties = results[0].imagePropertiesAnnotation
      const colors = properties.dominantColors.colors
      //colors.forEach(color => console.log(color))
      return colors[0]
    })
    .catch(err => {
      console.error('ERROR:', err)
      return err
    });

}

const detectColorByProduct = product => {
  const parsed = url.parse(product.photo);
  const fileName = `${os.tmpdir()}/${path.basename(parsed.pathname)}`
  request(product.photo)
    .pipe(fs.createWriteStream(fileName))
  return detectProperties(fileName)
    then(color => {
      product.color = color
      return productDao.save(product)
    })
}

const detectColorByProducts = products => {
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
    promises[index] = chain.then(_ => detectColorByProduct(product))
    return promises
  }, []))
  .then(data => {
    JSON.stringify(data)
    return data
  })
}


/**
 * Retrieve the dominant color from the catalog
 * 
 * via https://cloud.google.com/vision/
 *
 * @param {Number} Limit the number of product. Default 1.
 */
exports.extractColor = (limit = 1) => {
 
  return productDao
    .getProductsWithoutColor(limit)
    .then(detectColorByProducts)

}

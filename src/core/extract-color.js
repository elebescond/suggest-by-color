
import Vision from '@google-cloud/vision'
import rgbHex from 'rgb-hex';
import fs from 'fs'
import os from 'os'
import path from 'path'
import request from 'request'
import url from 'url'
import productDao from './dao/product'


const getDominantColor = fileName => {
  // Creates a client
  const client = new Vision.ImageAnnotatorClient()

  // Performs property detection on the local file
  return client
    .imageProperties(fileName)
    .then(results => {
      const properties = results[0].imagePropertiesAnnotation
      const colors = properties.dominantColors.colors
      return '#' + rgbHex(colors[0].color.red, colors[0].color.green, colors[0].color.blue)
    })
    .catch(err => {
      console.error('ERROR:', err)
      return err
    });

}

const detectColorByProduct = product => {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(product.photo);
    const fileName = `${os.tmpdir()}/${path.basename(parsed.pathname)}`
    const writable = fs.createWriteStream(fileName)
    request(product.photo)
      .on('data', chunk => {
        writable.write(chunk)
      })
      .on('end', () => {
        getDominantColor(fileName)
          .then(color => {
            product.color = color
            resolve(productDao.save(product))
          })
          .catch(reject)
      })
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

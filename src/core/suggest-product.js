import { proximity } from 'colour-proximity'
import productDao from './dao/product'

const findSimilarProductsByColor = product => productDao.getProductsWithColor()
  .then(products => products
    .filter(p => p.id !== product.id)
    .map(p => ({
        ...p,
        proximity: proximity(product.color, p.color)
      })
    )
    .sort((a, b) => a.proximity - b.proximity)
    .slice(0, 10)
  )


/**
 * Suggest products in the same color
 * 
 * via https://cloud.google.com/vision/
 *
 * @param {String} productId product id to compare
 */
exports.suggestProduct = (productId) => productDao
  .getProductById(productId)
  .then(findSimilarProductsByColor)

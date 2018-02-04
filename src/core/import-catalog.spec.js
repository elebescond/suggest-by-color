
import { importCatalog } from './import-catalog'

jest.mock('request')
jest.mock('./dao/product')

const MOCK_VALID_CATALOG_URL = 'https://storage.googleapis.com/suggest-by-color/lacoste/products.csv'

describe('suggest-by-color-core', () => {

  test('import catalog', async () => {
    expect.assertions(2)
    const products = await importCatalog(MOCK_VALID_CATALOG_URL)
    expect(products.length).toEqual(4)
    expect(products[0].id).toEqual('L1212-00-001')
  }, 5000)

})

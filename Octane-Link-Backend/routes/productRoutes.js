
const express = require('express')
const upload = require('../middleware/multer.middleware')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
} = require('../controllers/productController')

router.get('/', getProducts)

router.get('/:id', getProductById)

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  createProduct
)

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  updateProduct
)

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  deleteProduct
)

//router.put('/:id', updateProduct)

module.exports = router


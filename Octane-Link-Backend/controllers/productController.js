const Product = require('../models/products')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

async function getProducts(req, res) {
  try {
    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    console.error('Get products error:', error.message)

    res.status(500).json({
      message: 'Failed to fetch products.'
    })
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        message: 'Product not found.'
      })
    }

    res.status(200).json(product)
  } catch (error) {
    console.error('Get product error:', error.message)

    res.status(500).json({
      message: 'Failed to fetch product.'
    })
  }
}

async function createProduct(req, res) {
  try {
     console.log('BODY:', req.body)
     console.log('FILE:', req.file)

    const {
      name,
      brand,
      oilType,
      compatibility,
      price,
      stock,
      image,
      description
    } = req.body

    const compatibilityArray = JSON.parse(compatibility)

    if (
      !name ||!brand ||!oilType ||!compatibility ||!price ||!stock
    ) {
      return res.status(400).json({
        message: 'Please fill in all product fields.'
      })
    }
    if(!req.file)
    {
      return res.status(400).json({
        message:'Please upload a product image'
      })
    }

const result = await cloudinary.uploader.upload(req.file.path,{
  folder:'octanelink/products'
})

fs.unlinkSync(req.file.path)

    const product = await Product.create({
      name,
      brand,
      oilType,
      compatibility:compatibilityArray,
      price,
      stock,
      image:{
        url:result.secure_url,
        publicId:result.public_id
      },
      description
    })

    res.status(201).json({
      message: 'Product created successfully.',
      product
    })
  } catch (error) {
    console.error('Create product error:', error.message)

    res.status(500).json({
      message: 'Failed to create product.'
    })
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        message: 'Product not found.'
      })
    }

    if (product.image && product.image.publicId) {
      await cloudinary.uploader.destroy(product.image.publicId)
    }

    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: 'Product deleted successfully.'
    })

  } catch (error) {
    console.error('Delete product error:', error.message)

    res.status(500).json({
      message: 'Failed to delete product.'
    })
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        message: 'Product not found.'
      })
    }

    const {
      name,
      brand,
      oilType,
      compatibility,
      price,
      stock,
      description
    } = req.body

    const compatibilityArray = JSON.parse(compatibility)

    let imageData = product.image

    // If a new image was uploaded
    if (req.file) {

      // Delete old image from Cloudinary
      if (product.image && product.image.publicId) {
        await cloudinary.uploader.destroy(
          product.image.publicId
        )
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: 'octanelink/products'
        }
      )

      // Delete temporary file
      fs.unlinkSync(req.file.path)

      imageData = {
        url: result.secure_url,
        publicId: result.public_id
      }
    }

    product.name = name
    product.brand = brand
    product.oilType = oilType
    product.compatibility = compatibilityArray
    product.price = price
    product.stock = stock
    product.description = description
    product.image = imageData

    await product.save()

    res.status(200).json({
      message: 'Product updated successfully.',
      product
    })

  } catch (error) {
    console.error(
      'Update product error:',
      error.message
    )

    res.status(500).json({
      message: 'Failed to update product.'
    })
  }
}



module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
}
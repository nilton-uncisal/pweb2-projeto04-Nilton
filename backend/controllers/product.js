const { Product } = require('../models')
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

/**
 * Creates a new product
 * @param {*} req
 * @param {*} res
 * @returns Object
 */
const createProduct = async (req, res) => {
  try {
    const data = { ...req.body, id: uuidv4(), quantity: parseInt(req.body.quantity), price: parseInt(req.body.price), createdAt: new Date(), updatedAt: new Date() }

    const product = await Product.create(data)

    return res.status(201).json(
      product
    )
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


/**
 * Fetches all products
 * @param {*} req
 * @param {*} res
 * @returns Object
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] })

    return res.status(200).json( products )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

/**
 * Gets a single product by it's id
 * @param {*} req
 * @param {*} res
 * @returns boolean
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id: id }
    })

    if (product) {
      return res.status(200).json( product )
    }

    return res.status(404).send('Product with the specified ID does not exist')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
/**
 * Updates a single product by it's id
 * @param {*} req
 * @param {*} res
 * @returns boolean
 */
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.update(req.body, {
      where: { id: id }
    })

    if (product) {
      const updatedProduct = await Product.findOne({ where: { id: id } })
      return res.status(200).json(updatedProduct)
    }
    throw new Error('product not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


/**
 * Deletes a single product by it's id
 * @param {*} req
 * @param {*} res
 * @returns boolean
 */
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params

    const deletedProduct = await Product.destroy({
      where: { id: id }
    })

    if (deletedProduct) {
      return res.status(204).send('Product deleted successfully ')
    }

    throw new Error('Product not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById
}
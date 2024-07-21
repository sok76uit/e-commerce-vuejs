import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '../axios'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const productsInBag = ref([])

  const loadProducts = async () => {
    try {
      const response = await apiClient.get('/products')
      products.value = response.data
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const loadProduct = async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error('Error loading product:', error)
      return null
    }
  }

  const createProduct = async (product) => {
    try {
      await apiClient.post('/products', product)
      await loadProducts()
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const updateProduct = async (product) => {
    try {
      await apiClient.put(`/products/${product.id}`, product)
      await loadProducts()
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await apiClient.delete(`/products/${id}`)
      await loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const loadBag = () => {
    const storedProducts = localStorage.getItem('productsInBag')
    if (storedProducts) {
      productsInBag.value = JSON.parse(storedProducts)
    }
  }

  const addToBag = (product) => {
    productsInBag.value.push(product)
    localStorage.setItem('productsInBag', JSON.stringify(productsInBag.value))
  }

  const isInBag = (product) => {
    return productsInBag.value.find((item) => item.id === product.id)
  }

  const removeFromBag = (productId) => {
    const index = productsInBag.value.findIndex((item) => item.id === productId)
    if (index !== -1) {
      productsInBag.value.splice(index, 1)
    }
    localStorage.setItem('productsInBag', JSON.stringify(productsInBag.value))
  }

  return {
    products,
    productsInBag,
    loadProducts,
    loadProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    loadBag,
    addToBag,
    isInBag,
    removeFromBag
  }
})

<template>
  <div>
    <h1>Product Management</h1>
    <button @click="productsStore.loadProducts">Load Products</button>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
        <button @click="removeProduct(product.id)">Delete</button>
        <button @click="editProduct(product)">Edit</button>
      </li>
    </ul>
    <h2>{{ isEditing ? 'Edit' : 'Add' }} Product</h2>
    <form @submit.prevent="isEditing ? updateProductHandler() : createProductHandler()">
      <input v-model="productForm.title" placeholder="Title" required />
      <input v-model="productForm.price" type="number" placeholder="Price" required />
      <input v-model="productForm.image" placeholder="Image URL" required />
      <button type="submit">{{ isEditing ? 'Update' : 'Create' }}</button>
      <button v-if="isEditing" @click="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '@/store'

const productsStore = useProductsStore()

const products = computed(() => productsStore.products)

const productForm = ref({
  id: null,
  title: '',
  price: 0,
  image: ''
})
const isEditing = ref(false)

const resetForm = () => {
  productForm.value = { id: null, title: '', price: 0, image: '' }
  isEditing.value = false
}

const editProduct = (product) => {
  productForm.value = { ...product }
  isEditing.value = true
}

const cancelEdit = () => {
  resetForm()
}

const createProductHandler = () => {
  productsStore.createProduct(productForm.value)
  resetForm()
}

const updateProductHandler = () => {
  productsStore.updateProduct(productForm.value)
  resetForm()
}

const removeProduct = (id) => {
  productsStore.deleteProduct(id)
}
</script>

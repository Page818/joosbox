<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container>
        <!-- 上傳區 -->
        <h2 class="text-h5 mb-4">新增商品</h2>
        <v-form @submit.prevent="uploadProduct" ref="formRef">
          <v-text-field v-model="product.name" label="商品名稱" required />
          <v-textarea v-model="product.description" label="商品描述" required />
          <v-text-field v-model="product.category" label="分類" />
          <v-text-field v-model="product.tags" label="標籤 (逗號分隔)" />
          <v-text-field v-model="product.link" label="外部連結" />

          <v-file-input
            v-model="files"
            label="上傳圖片"
            multiple
            accept="image/*"
            show-size
            prepend-icon="mdi-image"
            required
          />

          <v-btn type="submit" color="primary" class="mt-4">上傳商品</v-btn>
        </v-form>

        <!-- 顯示區 -->
        <h2 class="text-h5 mt-8 mb-4">所有商品</h2>
        <v-row>
          <v-col v-for="item in products" :key="item._id" cols="12" sm="6" md="4">
            <v-card>
              <v-img :src="item.images[0]" height="200px" />
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle>{{ item.category }}</v-card-subtitle>
              <v-card-actions>
                <v-btn icon color="error" @click="deleteProduct(item._id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/layouts/AppBar.vue'
import { ref, onMounted } from 'vue'

export default {
  components: {
    AppBar,
  },
  setup() {
    const product = ref({
      name: '',
      description: '',
      category: '',
      tags: '',
      link: '',
    })

    const files = ref([])
    const formRef = ref(null)
    const products = ref([])

    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products')
        const data = await res.json()
        products.value = data
      } catch (err) {
        console.error('取得商品失敗:', err)
      }
    }

    const uploadProduct = async () => {
      if (!formRef.value?.validate()) return

      const formData = new FormData()
      files.value.forEach((file) => formData.append('images', file))
      formData.append('name', product.value.name)
      formData.append('description', product.value.description)
      formData.append('category', product.value.category)
      formData.append('tags', product.value.tags)
      formData.append('link', product.value.link)

      try {
        const response = await fetch('http://localhost:5000/api/products/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          alert('商品上傳成功！')
          product.value = {
            name: '',
            description: '',
            category: '',
            tags: '',
            link: '',
          }
          files.value = []
          await fetchProducts() // 重新載入商品
        } else {
          console.error('上傳失敗:', await response.text())
          alert('上傳失敗')
        }
      } catch (err) {
        console.error('錯誤:', err)
        alert('發生錯誤')
      }
    }

    const deleteProduct = async (id) => {
      if (!confirm('確定要刪除這個商品？')) return

      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          alert('刪除成功')
          await fetchProducts()
        } else {
          alert('刪除失敗')
        }
      } catch (err) {
        console.error(err)
        alert('發生錯誤')
      }
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      product,
      files,
      formRef,
      uploadProduct,
      deleteProduct,
      products,
    }
  },
}
</script>

<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/layouts/AppBar.vue'
import { ref } from 'vue'

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
        } else {
          console.error('上傳失敗:', await response.text())
          alert('上傳失敗')
        }
      } catch (err) {
        console.error('錯誤:', err)
        alert('發生錯誤')
      }
    }

    return {
      product,
      files,
      formRef,
      uploadProduct,
    }
  },
}
</script>

<template>
  <v-container>
    <!-- 表單區 -->
    <div class="form-block">
      <h2 class="section-title">新增商品（Section03）</h2>

      <v-form @submit.prevent="uploadProduct" ref="formRef">
        <v-text-field
          v-model="product.name"
          label="商品名稱"
          required
          variant="outlined"
          color="success"
        />
        <v-textarea
          v-model="product.description"
          label="商品描述"
          required
          variant="outlined"
          color="success"
        />
        <v-text-field v-model="product.category" label="分類" variant="outlined" color="success" />
        <v-text-field
          v-model="product.tags"
          label="標籤 (逗號分隔)"
          variant="outlined"
          color="success"
        />
        <v-text-field
          v-model="product.link"
          label="賣場連結(蝦皮)"
          variant="outlined"
          color="success"
        />

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
    </div>

    <!-- 商品展示區 -->
    <div class="product-grid">
      <h2 class="section-title">所有商品</h2>
      <v-row>
        <v-col v-for="item in products" :key="item._id" cols="12" sm="6" md="4">
          <v-card class="product-card">
            <v-img :src="item.images[0]" height="200px" cover />
            <v-card-title class="product-card-title">{{ item.name }}</v-card-title>
            <v-card-subtitle>{{ item.category }}</v-card-subtitle>
            <v-card-actions>
              <v-btn icon color="error" @click="deleteProduct(item._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

// 取得商品資料
const fetchProducts = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/products')
    products.value = await res.json()
  } catch (err) {
    console.error('取得商品失敗:', err)
  }
}

// 上傳商品
const uploadProduct = async () => {
  if (!formRef.value?.validate()) return

  const token = localStorage.getItem('adminToken') // ✅ 從 localStorage 取 token
  if (!token) {
    alert('尚未登入，請先登入管理員')
    return
  }

  const formData = new FormData()
  files.value.forEach((file) => formData.append('images', file))
  Object.entries(product.value).forEach(([key, value]) => formData.append(key, value))

  try {
    const res = await fetch('http://localhost:5000/api/products/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // ✅ 加入驗證用 token
      },
      body: formData,
    })
    if (!res.ok) throw new Error(await res.text())
    alert('上傳成功')
    product.value = { name: '', description: '', category: '', tags: '', link: '' }
    files.value = []
    fetchProducts()
  } catch (err) {
    console.error('上傳失敗:', err)
    alert('上傳失敗')
  }
}

// 刪除商品
const deleteProduct = async (id) => {
  if (!confirm('確定要刪除這個商品？')) return

  const token = localStorage.getItem('adminToken')
  if (!token) {
    alert('尚未登入，請先登入管理員')
    return
  }

  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',

      headers: {
        Authorization: `Bearer ${token}`, // ✅ 加入驗證用 token
      },
    })
    if (res.ok) {
      alert('刪除成功')
      fetchProducts()
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
</script>

<style scoped>
@import '@/assets/css/admin-common.css';

.v-label {
  font-weight: 500;
  font-size: 1.2rem;
  color: #3e4b2b !important;
}

.v-input__control {
  background-color: #f8f8f0 !important;

  border-radius: 8px;
  border: 1.5px solid #6d8a4d !important;
}

.form-block {
  /* background-color: rgba(35, 37, 34, 0.88); */
  background: linear-gradient(to bottom, #3e4b2b, #2a2f1d);
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.product-grid {
  background-color: rgba(255, 255, 255, 0.92);
  padding: 2rem;
  border-radius: 20px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
  color: #e8ffba;
}

.product-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.product-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3e4b2b;
}
</style>

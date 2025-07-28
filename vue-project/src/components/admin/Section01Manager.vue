<template>
  <v-container>
    <h2 class="text-h5 mb-4">首頁主視覺圖片管理（Section01）</h2>

    <!-- 上傳區 -->
    <v-file-input
      v-model="file"
      label="選擇圖片"
      accept="image/*"
      prepend-icon="mdi-image"
      show-size
    />

    <!-- 預覽圖 -->
    <v-row v-if="previewImage">
      <v-col cols="4" class="d-flex justify-center">
        <v-card max-width="200">
          <v-img :src="previewImage" height="150" />
          <v-card-actions>
            <v-btn icon @click="removePreview">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 上傳按鈕 -->
    <v-btn color="primary" class="mt-4" @click="upload">上傳圖片</v-btn>

    <v-divider class="my-6" />

    <!-- 已上傳圖片列表 -->
    <h3 class="text-h6 mb-2">已上傳圖片</h3>
    <v-row>
      <v-col v-for="img in images" :key="img._id" cols="4" class="d-flex justify-center">
        <v-card max-width="200">
          <v-img :src="img.imageUrl" height="150" />
          <v-card-actions>
            <v-btn icon @click="deleteImage(img._id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const file = ref(null)
const previewImage = ref('')
const images = ref([])

// 預覽邏輯
watch(file, (newFile) => {
  if (!newFile) {
    previewImage.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target.result
  }
  reader.readAsDataURL(newFile)
})

// 取得圖片
const fetchImages = async () => {
  const res = await fetch('http://localhost:5000/api/topimages')
  images.value = await res.json()
}

// 上傳圖片
const upload = async () => {
  if (!file.value) return alert('請選擇圖片')

  const formData = new FormData()
  formData.append('image', file.value)

  try {
    const res = await fetch('http://localhost:5000/api/topimages', {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) throw new Error(await res.text())
    alert('上傳成功')
    file.value = null
    previewImage.value = ''
    await fetchImages()
  } catch (err) {
    console.error(err)
    alert('上傳失敗')
  }
}

// 刪除圖片
const deleteImage = async (id) => {
  if (!confirm('確定要刪除這張圖片？')) return
  try {
    const res = await fetch(`http://localhost:5000/api/topimages/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      alert('刪除成功')
      await fetchImages()
    } else {
      alert('刪除失敗')
    }
  } catch (err) {
    console.error(err)
    alert('發生錯誤')
  }
}

// 移除預覽
const removePreview = () => {
  file.value = null
  previewImage.value = ''
}

onMounted(() => {
  fetchImages()
})
</script>

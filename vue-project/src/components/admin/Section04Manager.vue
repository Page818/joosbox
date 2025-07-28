<template>
  <v-container>
    <h2 class="text-h5 mb-4">手鍊圖片上傳（Section04）</h2>

    <!-- 上傳表單 -->
    <v-file-input
      v-model="file"
      label="選擇圖片"
      accept="image/*"
      prepend-icon="mdi-image"
      show-size
    />

    <v-btn color="primary" class="mt-4" @click="upload">上傳</v-btn>

    <v-divider class="my-6" />

    <!-- 顯示所有卡片 -->
    <v-row>
      <v-col
        v-for="card in cards"
        :key="card._id"
        cols="12"
        sm="6"
        md="4"
        class="d-flex justify-center"
      >
        <v-card max-width="250">
          <v-img :src="card.imageUrl" height="180" />
          <v-card-actions>
            <v-btn icon @click="deleteImage(card._id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const file = ref(null)
const cards = ref([])

// 取得所有卡片
const fetchImages = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/showcards')
    const data = await res.json()
    cards.value = data
  } catch (err) {
    console.error('取得圖片失敗:', err)
  }
}

// 上傳卡片圖片
const upload = async () => {
  if (!file.value) return alert('請選擇圖片')

  const formData = new FormData()
  formData.append('image', file.value)

  try {
    const res = await fetch('http://localhost:5000/api/showcards', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error(await res.text())

    alert('上傳成功')
    file.value = null
    await fetchImages()
  } catch (err) {
    console.error('上傳錯誤:', err)
    alert('上傳失敗')
  }
}

// 刪除圖片
const deleteImage = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/showcards/${id}`, {
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

onMounted(() => {
  fetchImages()
})
</script>

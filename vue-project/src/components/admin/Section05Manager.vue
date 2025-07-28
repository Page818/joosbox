<template>
  <v-container>
    <h2 class="text-h5 mb-4">網站 Footer 編輯（Section05）</h2>

    <v-form @submit.prevent="submit">
      <!-- 品牌介紹 -->
      <v-textarea v-model="form.text" label="品牌介紹文字" rows="3" auto-grow required />

      <!-- 連結編輯區 -->
      <h3 class="text-h6 mt-4">社群連結</h3>
      <v-btn class="mb-2" @click="addLink" color="secondary" size="small">新增連結</v-btn>

      <v-row v-for="(link, index) in form.links" :key="index" class="align-center mb-2">
        <v-col cols="5">
          <v-text-field v-model="link.label" label="連結名稱 (如 IG、Email)" />
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="link.url" label="連結網址" />
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="removeLink(index)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- 儲存按鈕 -->
      <v-btn type="submit" color="primary" class="mt-4">儲存</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  text: '',
  links: [],
})
let contentId = ''

// 取得 FooterContent 資料
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/footercontent')
    form.value = res.data
    contentId = res.data._id
  } catch (err) {
    console.error('載入失敗:', err)
  }
})

// 新增連結
const addLink = () => {
  form.value.links.push({ label: '', url: '' })
}

// 移除連結
const removeLink = (index) => {
  form.value.links.splice(index, 1)
}

// 提交儲存
const submit = async () => {
  try {
    await axios.put(`http://localhost:5000/api/footercontent/${contentId}`, form.value)
    alert('更新成功')
  } catch (err) {
    console.error('更新失敗:', err)
    alert('更新失敗')
  }
}
</script>



<style scoped>
@import '@/assets/css/admin-common.css';
</style>

<template>
  <v-container class="admin-container" fluid>
    <h1 class="admin-title">JOO's Box 管理後台</h1>
    <v-btn @click="logout">登出</v-btn>
    <v-row dense justify="center">
      <v-col cols="10" sm="5" md="5" v-for="item in panels" :key="item.title">
        <v-card @click="currentPanel = item.component" class="admin-card" elevation="4">
          <v-card-title>
            <v-icon class="admin-icon">{{ item.icon }}</v-icon>
            <span class="admin-card-title">{{ item.title }}</span>
          </v-card-title>
          <v-card-text class="admin-description">{{ item.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="currentPanel" class="panel-content">
      <component :is="currentPanel" />
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import Section01Manager from '@/components/admin/Section01Manager.vue'
import Section03Manager from '@/components/admin/Section03Manager.vue'
import Section04Manager from '@/components/admin/Section04Manager.vue'
import Section05Manager from '@/components/admin/Section05Manager.vue'
const currentPanel = ref(null)
const router = useRouter()

function logout() {
  localStorage.removeItem('adminToken')
  router.push('/admin/login')
}
const panels = [
  {
    title: '項鍊管理（Section03）',
    description: '上傳、編輯項鍊展示用商品卡片',
    icon: 'mdi-diamond-stone',
    component: Section03Manager,
  },
  {
    title: '手鍊管理（Section04）',
    description: '管理手鍊圖片（ShowCard 輪播區）',
    icon: 'mdi-image-multiple',
    component: Section04Manager,
  },
  {
    title: '首頁圖片管理（Section01）',
    description: '更換首頁主視覺輪播圖',
    icon: 'mdi-home-analytics',
    component: Section01Manager,
  },
  {
    title: '頁尾內容管理（Section05）',
    description: '編輯 footer 介紹與社群連結',
    icon: 'mdi-footer',
    component: Section05Manager,
  },
]
</script>

<style scoped>
.admin-container {
  background-color: #3e4b2b;
  min-height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #f1f1e6;
}

.admin-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #f5f5f5;
  margin-bottom: 2.5rem;
  font-family: 'Georgia', serif;
}

.admin-card {
  background-color: #f5f5f0;
  border-radius: 20px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.admin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15);
  background-color: #ecece5;
}

.admin-icon {
  font-size: 30px;
  margin-right: 12px;
  color: #6d8a4d;
}

.admin-card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3e4b2b;
}

.admin-description {
  font-size: 1.2rem;
  font-weight: bolder;
  color: #5a5a5a;
  padding-top: 0.5rem;
}
</style>

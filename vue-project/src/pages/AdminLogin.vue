<template>
  <div class="admin-login">
    <h1>Joo's Box管理員登入</h1>
    <v-text-field v-model="account" label="帳號" />
    <v-text-field v-model="password" label="密碼" type="password" />
    <v-btn @click="login">登入</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const account = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account: account.value, password: password.value }),
    })

    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('adminToken', data.token)
      router.push('/admin')
    } else {
      alert(data.message)
    }
  } catch (err) {
    console.error('登入錯誤:', err)
  }
}
</script>

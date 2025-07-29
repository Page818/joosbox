<template>
  <div class="admin-login">
    <h1>Joo's Box 管理員登入</h1>
    <v-text-field v-model="account" label="帳號" variant="outlined" color="success" />
    <v-text-field
      v-model="password"
      label="密碼"
      type="password"
      variant="outlined"
      color="success"
    />
    <v-btn @click="login" color="primary" class="mt-4">登入</v-btn>
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
      body: JSON.stringify({
        account: account.value,
        password: password.value,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || '登入失敗')
      return
    }

    // ✅ 儲存 Token
    localStorage.setItem('adminToken', data.token)
    alert('登入成功')
    router.push('/admin') // 或導向後台首頁
  } catch (err) {
    console.error('登入錯誤:', err)
    alert('系統錯誤，請稍後再試')
  }
}
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border-radius: 16px;
  background: linear-gradient(to bottom, #3e4b2b, #2a2f1d);
  color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
</style>

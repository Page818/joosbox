<template>
  <div class="product-card">
    <!-- 產品圖片區域 -->
    <div class="image-container">
      <img :src="imageSrc" alt="Product Image" class="product-image" />
    </div>
    <!-- 產品名稱 -->
    <h2 class="product-name">{{ name }}</h2>
    <!-- 產品描述 -->
    <p class="product-description">{{ description }}</p>
    <!-- 連結按鈕 -->
    <a :href="link" class="product-link" target="_blank">連結</a>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '產品名稱',
    },
    description: {
      type: String,
      default: '產品描述',
    },
    link: {
      type: String,
      default: '#',
    },
  },
}
</script>

<style scoped>
.product-card {
  text-align: center;
  padding: 20px;
  background: #2f2f2f;
  color: #fff;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 5px;
}

.image-container {
  position: relative;
  margin-bottom: 15px;
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
}

.product-name {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.product-description {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 15px;
}

.product-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #7c4c20;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.product-link:hover {
  background-color: #d16704;
}
</style>

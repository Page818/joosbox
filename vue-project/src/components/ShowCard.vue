<template>
  <div class="show-card">
    <button class="nav-btn left" @click="$emit('prev')">‹</button>

    <div class="image-box" @click="$emit('open-lightbox')">
      <img :src="imageSrc || defaultImg" alt="Show Image" />
    </div>

    <button class="nav-btn right" @click="$emit('next')">›</button>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      default: '',
    },
  },
  computed: {
    defaultImg() {
      return '/images/default.jpg'
    },
  },
}
</script>

<style scoped>
.show-card {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* max-width: 500px; */
  width: 80%;
  max-width: 80%;
  padding: 0 1rem;
  margin: 0 auto;
  box-sizing: border-box;
}

.image-box {
  width: 100%;
  max-width: 400px;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  background-color: white;
}
@media (max-width: 768px) {
  .image-box {
    height: 60vh;
  }
}

/* 按鈕現在是 absolute，相對 .show-card，但會疊到圖片，改用 flex 分配空間 */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  background: none;
  border: none;
  color: #333;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease;
  z-index: 10;
}
.nav-btn:hover {
  opacity: 1;
}
.nav-btn.left {
  left: -2rem; /* 調出圖片邊界 */
}
.nav-btn.right {
  right: -2rem; /* 調出圖片邊界 */
}
</style>

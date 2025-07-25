<template>
  <div class="sidebar">
    <div class="nav-dots">
      <div
        v-for="(item, index) in items"
        :key="item.title"
        class="nav-dot"
        :class="{ active: isActive(index) }"
        @click="navigate(item.path)"
        @mouseover="hoverIndex = index"
        @mouseleave="hoverIndex = null"
      >
        <span class="dot"></span>
        <div v-if="hoverIndex === index" class="tooltip">
          <span class="arrow"></span>
          <span class="tooltip-text">{{ item.title }}</span>
        </div>
      </div>
    </div>
    <!-- 購物車圖標 -->
    <v-btn icon class="cart-icon" @click="goToCart">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AppBar',
  data() {
    return {
      hoverIndex: null,
      items: [
        { title: 'Home', path: '/' },
        { title :'Collection', path: '/collection' },
        { title: 'About', path: '/about' },
      ]
    };
  },
  methods: {
    isActive(index) {
      return this.$route.path === this.items[index].path;
    },
    navigate(path) {
      this.$router.push(path);
    },
    goToCart() {
      console.log('Navigate to cart');
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 60px;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  z-index: 1000;
}

.nav-dots {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}

.nav-dot {
  position: relative;
  margin: 15px 0;
  cursor: pointer;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  display: block;
  transition:
    transform 0.2s,
    background-color 0.2s;
}

.nav-dot.active .dot {
  background-color: #ccc;
  transform: scale(1.2);
}

.tooltip {
  position: absolute;
  left: 60px; /* 從側邊欄邊緣開始 */
  top: 50%;
  transform: translateY(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  z-index: 1001;
  pointer-events: none;
}

.arrow {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #000;
  margin-right: 5px;
}

.tooltip-text {
  margin-left: 5px;
}

.cart-icon {
  color: #fff;
  margin-bottom: 20px;
}
</style>

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

    <v-btn icon class="cart-icon" @click="goToCart">
      <!-- <v-icon>mdi-cart</v-icon> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="width: 24px; height: 24px"
      >
        <path d="M6 6h12l-1 14H7L6 6z" />
        <path d="M9 6a3 3 0 0 1 6 0" />
      </svg>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AppBar',
  data() {
    return {
      hoverIndex: null,
      currentIndex: 0,
      items: [
        { title: 'TOP', path: '#section01' },
        { title: '品牌理念', path: '#section02' },
        { title: 'collections', path: '#section03' },
        { title: 'treasure', path: '#section04' },
        { title: 'About', path: '#section05' },
      ],
    }
  },
  methods: {
    handleScroll() {
      for (let i = 0; i < this.items.length; i++) {
        const id = this.items[i].path.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            this.currentIndex = i
            return
          }
        }
      }
    },
    isActive(index) {
      return this.$route.path === this.items[index].path
    },
    navigate(path) {
      const id = path.replace('#', '')
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    },

    goToCart() {
      console.log('Navigate to cart')
      // window.open('https://shopee.tw/你的商店網址', '_blank')
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 60px;
  height: 100vh;
  background-color: #1c1f1a;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  z-index: 1000;

  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.nav-dots {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  gap: 24px;
}

.nav-dot {
  position: relative;
  /* margin: 15px 0; */
  cursor: pointer;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #b6bfa8;
  border-radius: 50%;
  display: block;
  /* transition:
    transform 0.2s,
    background-color 0.2s; */
  transition: all 0.25s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.nav-dot.active .dot {
  background-color: #f5f0e1;
  transform: scale(1.4);
}

.tooltip {
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  /* background-color: #000;
  color: #fff; */
  background-color: #f5f0e1;
  color: #1c1f1a;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: 1rem;
  z-index: 1001;
  pointer-events: none;
  font-family: 'Noto Serif TC', serif;
  font-weight: 500;
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
  color: #f5f0e1;
  background-color: #3e4931;
  margin-bottom: 20px;
  border-radius: 12px;
  padding: 6px;
  transition: background-color 0.3s ease;
}

.cart-icon:hover {
  background-color: #556b2f;
}
</style>

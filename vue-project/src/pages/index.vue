<template>
  <v-app>
    <app-bar />
    <v-main>
      <div class="main-content">
        <!-- 第一個區塊 -->
        <div class="section">
          <skew-mask />
          <angle-background>
            <div id="section01">
              <div class="text-container">
                <h1 class="title">JOO's BOX</h1>
                <p class="subtitle">MADE-ONE only</p>
              </div>
              <!-- Swiper -->
              <swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="50"
                :pagination="{ clickable: true }"
                :navigation="{
                  nextEl: '.nav-next',
                  prevEl: '.nav-prev',
                }"
                :loop="true"
                :autoplay="{ delay: 5000, disableOnInteraction: false }"
                class="my-swiper"
                ref="swiperRefSection01"
              >
                <swiper-slide v-for="(image, index) in images" :key="index">
                  <img :src="image" alt="Carousel Image" class="swiper-image" />
                </swiper-slide>
                <div class="nav-prev" @click="slidePrev('section01')"></div>
                <div class="nav-next" @click="slideNext('section01')"></div>
              </swiper>
            </div>
          </angle-background>
          <skew-mask />
        </div>

        <!-- 第二個區塊 -->
        <div class="section" ref="section2">
          <skew-mask />
          <angle-background
            ref="background2"
            :style="{ backgroundImage: `url(/images/flower-background01.jpg)` }"
          >
            <div id="section02">
              <div class="text-container">
                <h1 class="title" ref="title2">Joo's box</h1>
                <p class="subtitle emfont-ChenYuLuoYan" ref="subtitle2">
                  使用天然礦石與珍珠，每一件都是獨一無二
                </p>
              </div>
            </div>
          </angle-background>
        </div>

        <!-- 第三個區塊 -->
        <div class="section">
          <skew-mask />
          <angle-background>
            <div id="section03">
              <!-- 產品上傳表單 -->
              <form
                @submit.prevent="uploadProduct"
                enctype="multipart/form-data"
                class="upload-form"
              >
                <input v-model="product.name" placeholder="產品名稱" required />
                <textarea v-model="product.description" placeholder="產品描述" required></textarea>
                <input v-model="product.category" placeholder="分類 (e.g., Necklace)" />
                <input v-model="product.tags" placeholder="標籤 (e.g., tag1,tag2)" />
                <input v-model="product.link" placeholder="連結" required />
                <input type="file" @change="onFileChange" accept="image/*" multiple required />
                <button type="submit">上傳</button>
              </form>
              <!-- 產品展示 Swiper -->
              <swiper
                :modules="modules"
                :slides-per-view="1.5"
                :space-between="30"
                :pagination="{ clickable: true }"
                :navigation="{
                  nextEl: '.nav-next',
                  prevEl: '.nav-prev',
                }"
                :loop="true"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                class="my-swiper"
                ref="swiperRefSection03"
              >
                <swiper-slide v-for="product in products" :key="product._id">
                  <product-card
                    :image-src="product.images[0]"
                    :name="product.name"
                    :description="product.description"
                    :category="product.category"
                    :tags="product.tags"
                    :link="product.link"
                    :images="product.images"
                  />
                </swiper-slide>
                <div class="nav-prev" @click="slidePrev('section03')"></div>
                <div class="nav-next" @click="slideNext('section03')"></div>
              </swiper>
            </div>
          </angle-background>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/layouts/AppBar.vue'
import SkewMask from '@/components/SkewMask.vue'
import AngleBackground from '@/components/AngleBackground.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import ProductCard from '@/components/ProductCard.vue'

import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 導入 Swiper 的 CSS
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  components: {
    AppBar,
    SkewMask,
    AngleBackground,
    Swiper,
    SwiperSlide,
    ProductCard,
  },
  setup() {
    const swiperRefSection01 = ref(null)
    const swiperRefSection03 = ref(null)
    const section2 = ref(null)
    const background2 = ref(null)
    const title2 = ref(null)
    const subtitle2 = ref(null)
    const products = ref([])
    const product = ref({
      name: '',
      description: '',
      category: '',
      tags: '',
      link: '',
      image: null,
    })
    const files = ref([])

    onMounted(async () => {
      gsap.registerPlugin(ScrollTrigger)

      // 第二區塊動畫
      gsap.from(title2.value, {
        scrollTrigger: {
          trigger: section2.value,
          start: 'top 20%',
          toggleActions: 'play none none reverse',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      })

      gsap.from(subtitle2.value, {
        scrollTrigger: {
          trigger: section2.value,
          start: 'top 20%',
          toggleActions: 'play none none reverse',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
      })

      gsap.to(background2.value.$el, {
        scrollTrigger: {
          trigger: section2.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        backgroundPosition: '50% 100%',
        ease: 'none',
      })

      // 獲取產品數據
      await fetchProducts()
    })

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products')
        const data = await response.json()
        products.value = data
      } catch (error) {
        console.error('獲取產品失敗:', error)
        products.value = []
        // 後備數據
      }
    }

    const onFileChange = (event) => {
      files.value = Array.from(event.target.files)
    }

    const uploadProduct = async () => {
      const formData = new FormData()
      files.value.forEach((file) => formData.append('images', file))
      formData.append('name', product.value.name)
      formData.append('description', product.value.description)
      formData.append('category', product.value.category)
      formData.append('tags', product.value.tags)
      formData.append('link', product.value.link)

      try {
        const response = await fetch('http://localhost:5000/api/products/upload', {
          method: 'POST',
          body: formData,
        })
        if (response.ok) {
          await fetchProducts()
          product.value = {
            name: '',
            description: '',
            category: '',
            tags: '',
            link: '',
            image: null,
          }
          files.value = []
        } else {
          console.error('上傳失敗:', await response.text())
        }
      } catch (error) {
        console.error('上傳錯誤:', error)
      }
    }

    const slidePrev = (section) => {
      const swiperRef = section === 'section01' ? swiperRefSection01 : swiperRefSection03
      if (swiperRef.value) swiperRef.value.$el.swiper.slidePrev()
    }

    const slideNext = (section) => {
      const swiperRef = section === 'section01' ? swiperRefSection01 : swiperRefSection03
      if (swiperRef.value) swiperRef.value.$el.swiper.slideNext()
    }

    return {
      swiperRefSection01,
      swiperRefSection03,
      section2,
      background2,
      title2,
      subtitle2,
      products,
      product,
      files,
      onFileChange,
      uploadProduct,
      modules: [Navigation, Pagination, Autoplay],
      slidePrev,
      slideNext,
    }
  },
  data() {
    return {
      drawer: true,
      images: [
        '/images/img-01.jpg',
        '/images/img-02.jpg',
        '/images/img-03.jpg',
        '/images/img-04.jpg',
      ],
    }
  },
}
</script>

<style scoped>
.main-content {
  width: calc(100% - 60px);
  margin-left: 60px;
  background-color: #000000;
}

.section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

#section01 {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  box-sizing: border-box;
}

.text-container {
  position: relative;
  z-index: 2;
  text-align: center;
}

#section01 .title {
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family:
    'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
    sans-serif;
  transform: skewY(5deg);
}

#section01 .subtitle {
  font-size: 1.5rem;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
  transform: skewY(5deg);
}

#section01 .my-swiper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  transform: skewY(5deg);
}

#section01 .swiper-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#section01 .swiper-pagination-bullet {
  color: rgba(255, 255, 255, 0.267) !important;
}

/* 左右可點擊區塊 */
#section01 .nav-prev,
#section01 .nav-next {
  position: absolute;
  top: 0;
  height: 100%;
  width: 10%;
  z-index: 4;
  cursor: pointer;
  transition: background 0.3s ease;
}

#section01 .nav-prev {
  left: 0;
}

#section01 .nav-next {
  right: 0;
}

#section01 .nav-prev:hover,
#section01 .nav-next:hover {
  background: rgba(255, 255, 255, 0.219);
}

#section02 {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

#section02 .title {
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family:
    'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
    sans-serif;
  transform: skewY(5deg);
  color: rgb(255, 255, 255);
}

#section02 .subtitle {
  font-size: 3rem;
  font-style: italic;
  transform: skewY(5deg);
  color: rgb(255, 255, 255);
}

#section03 {
  transform: skewY(5deg);
  position: absolute;
  top: 40vh;
}

.upload-form {
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  z-index: 10;
}

.upload-form input,
.upload-form textarea,
.upload-form button {
  display: block;
  margin: 10px 0;
  padding: 5px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.upload-form button {
  background-color: #7c4c20;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

.upload-form button:hover {
  background-color: #d16704;
}
</style>

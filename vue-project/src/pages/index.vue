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
                <swiper-slide v-for="(image, index) in topImages" :key="index">
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
          <skew-mask>
            <h1 style="font-size: 4rem; font-weight: normal; margin-top: 3rem">項鍊</h1>
          </skew-mask>

          <angle-background>
            <div id="section03">
              <!-- 產品展示 Swiper -->
              <swiper
                :modules="modules"
                :slides-per-view="3"
                :free-mode="true"
                :loop="true"
                :autoplay="{ delay: 1, disableOnInteraction: false }"
                :speed="6000"
                :pagination="{ clickable: true }"
                :breakpoints="{
                  0: { slidesPerView: 1, spaceBetween: 0 },
                  600: { slidesPerView: 1.2, spaceBetween: 10 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                  1440: { slidesPerView: 3.5, spaceBetween: 30 },
                }"
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
              </swiper>
            </div>
          </angle-background>
        </div>

        <!-- 第四個區塊 -->
        <div class="section">
          <skew-mask>
            <h1 style="font-size: 4rem; font-weight: normal; margin-top: 4rem">手鍊</h1>
          </skew-mask>

          <angle-background
            :style="{
              backgroundColor: '#b6bfa8',
            }"
          >
            <div id="section04" ref="section04">
              <div class="collection">
                <ShowCard
                  :imageSrc="currentImage"
                  @prev="onPrev"
                  @next="onNext"
                  @open-lightbox="openLightbox"
                />
                <vue-easy-lightbox
                  :visible="lightboxVisible"
                  :imgs="images"
                  :index="currentIndex"
                  @hide="lightboxVisible = false"
                />
              </div>
              <div class="text-container">
                <h1>精心挑選天然水晶</h1>
                <h3>製作獨一無二個性手鍊</h3>
              </div>
            </div>
          </angle-background>
        </div>

        <!-- 第五個區塊 -->
        <div class="section">
          <skew-mask></skew-mask>
          <angle-background background-color="#2a2d26">
            <div id="section05" style="overflow: hidden; padding-top: 8rem">
              <div class="footer-container">
                <h1>關於我們</h1>
                <p>
                  Joo's Box 是一家專注於手工製作天然礦石與珍珠首飾的品牌。
                  <br />
                  我們相信每一件首飾都應該是獨一無二的，就像佩戴它的人一樣。
                </p>

                <div class="social-links">
                  <a href="https://instagram.com/your_brand" target="_blank" aria-label="Instagram">
                    <v-icon size="30">mdi-instagram</v-icon>
                  </a>
                  <a href="https://facebook.com/your_brand" target="_blank" aria-label="Facebook">
                    <v-icon size="30">mdi-facebook</v-icon>
                  </a>
                  <a href="https://your-shop-link.com" target="_blank" aria-label="Shop">
                    <v-icon size="30">mdi-shopping</v-icon>
                  </a>
                </div>

                <p class="footer-note">© 2025 Joo's Box. All rights reserved.</p>
              </div>
            </div>
          </angle-background>
          <skew-mask></skew-mask>
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
import ShowCard from '@/components/ShowCard.vue'
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import VueEasyLightbox from 'vue-easy-lightbox'

// 引入 Swiper 樣式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  components: {
    ShowCard,
    AppBar,
    SkewMask,
    AngleBackground,
    Swiper,
    SwiperSlide,
    ProductCard,
    VueEasyLightbox,
  },
  setup() {
    const images = computed(() => showcardImages.value)

    const lightboxVisible = ref(false)
    function openLightbox() {
      lightboxVisible.value = true
    }
    // Swiper 參考（控制滑動用）
    const swiperRefSection01 = ref(null)
    const swiperRefSection03 = ref(null)

    // 第二區塊元素：滾動動畫用
    const section2 = ref(null)
    const background2 = ref(null)
    const title2 = ref(null)
    const subtitle2 = ref(null)

    // Section03 產品資料
    const products = ref([])

    // Section01 首頁 top 區圖片（從後端抓 topImages）
    const topImages = ref([])

    // Section04 圖片 ShowCard 用
    const showcardImages = ref([])
    const currentIndex = ref(0)

    // 回傳目前 ShowCard 顯示圖片
    const currentImage = computed(() => {
      if (showcardImages.value.length === 0) return ''
      return showcardImages.value[currentIndex.value]
    })

    // 點「上一張」切換圖片
    const onPrev = () => {
      if (showcardImages.value.length === 0) return
      currentIndex.value =
        (currentIndex.value - 1 + showcardImages.value.length) % showcardImages.value.length
    }

    // 點「下一張」切換圖片
    const onNext = () => {
      if (showcardImages.value.length === 0) return
      currentIndex.value = (currentIndex.value + 1) % showcardImages.value.length
    }

    // 畫面載入後初始化
    onMounted(async () => {
      await fetchProducts() // 抓產品資料 (Section03)
      await fetchTopImages() // 抓首頁 top 輪播圖 (Section01)
      await fetchShowcardImages() // 抓手鍊圖片 (Section04)

      gsap.registerPlugin(ScrollTrigger)

      // 第二區塊標題滾動動畫
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

      // 第二區塊副標題滾動動畫
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

      // 第二區塊背景視差效果
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
    })

    // 抓產品資料 (section03 用)
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products')
        const data = await response.json()
        products.value = data.filter((p) => Array.isArray(p.images) && p.images.length > 0)
      } catch (error) {
        console.error('獲取產品失敗:', error)
        products.value = []
      }
    }

    // 抓首頁圖片 (section01 用)
    const fetchTopImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/topimages')
        const data = await response.json()
        topImages.value = data.map((item) => item.imageUrl)
      } catch (error) {
        console.error('取得首頁圖片失敗:', error)
        topImages.value = []
      }
    }

    // 抓手鍊圖片 (section04 用)
    const fetchShowcardImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/showcards')
        const data = await response.json()
        showcardImages.value = data.map((item) => item.imageUrl)
      } catch (error) {
        console.error('取得手鍊圖片失敗:', error)
        showcardImages.value = []
      }
    }

    // 控制 swiper 手動切換（section01 / section03 共用）
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
      topImages,
      currentImage,
      onPrev,
      onNext,
      modules: [Navigation, Pagination, Autoplay],
      slidePrev,
      slideNext,
      lightboxVisible,
      openLightbox,
      images,
    }
  },
}
</script>

<style scoped>
.main-content {
  width: calc(100% - 60px);
  margin-left: 60px;
}

.section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  background-color: #1c1f1a;

  filter: brightness(0.9) contrast(1.1);
}

#section01 {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* align-content: center; */
  box-sizing: border-box;
  padding: 2rem;
  text-align: center;
}

.text-container {
  position: relative;
  z-index: 4;
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
  color: #3e4b2b;
  letter-spacing: 2px;
  text-shadow: 1px 1px 1px rgba(85, 107, 47, 0.2);
}

#section01 .subtitle {
  font-size: 1.75rem;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
  transform: skewY(5deg);
  color: #5a5a5a;
}

#section01 .my-swiper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  /* transform: skewY(5deg); */
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
/*----section01 RWD ---- */
@media (max-width: 992px) {
  #section01 .title {
    font-size: 3rem;
  }
  #section01 .subtitle {
    font-size: 1.2rem;
  }
}
@media (max-width: 600px) {
  #section01 {
    padding: 1rem;
  }

  #section01 .title {
    font-size: 2.2rem;
  }

  #section01 .subtitle {
    font-size: 1rem;
  }

  #section01 .nav-prev,
  #section01 .nav-next {
    width: 15%;
  }
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
/* ----section02 RWD ---- */
@media (max-width: 992px) {
  #section02 .title {
    font-size: 3rem;
  }
  #section02 .subtitle {
    font-size: 1.8rem;
    padding: 0 1rem;
  }
}
@media (max-width: 600px) {
  #section02 {
    padding: 2rem 1rem;
  }

  #section02 .title {
    font-size: 2.2rem;
  }

  #section02 .subtitle {
    font-size: 1.5rem;
    padding: 0 0.5rem;
  }
}

#section03 {
  transform: skewY(5deg);
  position: absolute;
  height: 100%;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
}
#section03 .my-swiper {
  width: 100%;
  top: 15vh;
  z-index: 3;
}
#section03 .product-card {
  margin: 10px;
}
/* ----section03 RWD ---- */

@media (max-width: 768px) {
  #section03 {
    padding-top: 3rem;
    height: auto;
    position: relative;
  }

  #section03 .my-swiper {
    top: 0;
  }
}

#section04 {
  display: flex;
  transform: skewY(5deg);
  justify-content: space-between;
  align-items: center;
  /* padding-top: 5rem; */
  height: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 1rem;
}
#section04 .text-container {
  flex: 1 1 300px;
  padding-right: 2rem;
  text-align: right;
  width: 500px;
  /* background: white; */
}
#section04 .collection {
  flex: 1 1 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
  /* background: white; */
}
/* ----section04 RWD---- */
@media (max-width: 768px) {
  #section04 {
    flex-direction: column;
    transform: none;
  }

  #section04 .text-container {
    text-align: center;
    padding: 1rem 0;
  }
}

/* .footer-container {
  text-align: center;
  color: #f5f5f5;
  padding: 4rem 1rem;
  position: relative;
  background: linear-gradient(to bottom, #1c1f1a, #2a2d26);
} */
.footer-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
  /* background: linear-gradient(to bottom, #2a2d26, #1c1f1a); */
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  color: #e8f0d8;
  transform: translateY(20px); /* 避免被 mask 擋住 */
}

.footer-container h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #d3e5c0;
  transform: skewY(5deg);
}

.footer-container p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #cccccc;
  transform: skewY(5deg);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  transform: skewY(5deg);

  flex-wrap: wrap;
}

.social-links a {
  color: #d3e5c0;
  font-size: 1.8rem;
  /* transform: skewY(5deg); */
  flex-wrap: wrap;

  transition:
    transform 0.2s ease,
    color 0.3s ease;
}

.social-links a:hover {
  transform: scale(1.2);
  color: #ffffff;
}

.footer-note {
  font-size: 0.9rem;
  color: #999999;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 2.5rem 1rem;
  }

  .footer-container h1 {
    font-size: 2rem;
  }

  .footer-container p {
    font-size: 0.95rem;
  }

  .social-links {
    gap: 1rem;
  }

  .social-links a > .v-icon {
    font-size: 24px !important;
  }

  .footer-note {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .footer-container h1 {
    font-size: 1.75rem;
  }

  .footer-container p {
    font-size: 0.9rem;
  }

  .footer-note {
    font-size: 0.75rem;
  }
}
.footer-links {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #e0e0e0;
}
.footer-links a {
  color: #c8d1b9;
  margin: 0 0.5rem;
  text-decoration: none;
}
.footer-links a:hover {
  text-decoration: underline;
}
</style>

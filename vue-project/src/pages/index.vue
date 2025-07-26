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
          <skew-mask>
            <h1 style="font-size: 4rem; font-weight: normal; margin-top: 3rem">項鍊</h1>
          </skew-mask>

          <angle-background>
            <div id="section03">
              <!-- 產品展示 Swiper -->
              <swiper
                :modules="modules"
                :slides-per-view="3"
                :space-between="30"
                :free-mode="true"
                :loop="true"
                :autoplay="{ delay: 1, disableOnInteraction: false }"
                :speed="6000"
                :pagination="{ clickable: true }"
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
                <ShowCard :imageSrc="currentImage" @prev="onPrev" @next="onNext" />
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
          <angle-background>
            <div id="section05">
              <h1>關於我們</h1>
              <p>
                Joo's Box
                是一家專注於手工製作天然礦石與珍珠首飾的品牌。我們相信每一件首飾都應該是獨一無二的，就像佩戴它的人一樣。
              </p>
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
  },
  setup() {
    // swiper refs
    const swiperRefSection01 = ref(null)
    const swiperRefSection03 = ref(null)

    // section2 元素 & 動畫
    const section2 = ref(null)
    const background2 = ref(null)
    const title2 = ref(null)
    const subtitle2 = ref(null)

    // 從後端抓的產品資料（Section03 用）
    const products = ref([])

    // 從後端抓的圖片（Section01 & Section04 用）
    const images = ref([])
    const currentIndex = ref(0)

    // 顯示當前圖片給 ShowCard 用
    const currentImage = computed(() => {
      if (images.value.length === 0) return ''
      return images.value[currentIndex.value]
    })

    // 切換 ShowCard 圖片
    const onPrev = () => {
      if (images.value.length === 0) return
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
    }
    const onNext = () => {
      if (images.value.length === 0) return
      currentIndex.value = (currentIndex.value + 1) % images.value.length
    }

    // 滑動動畫 & 資料初始化
    onMounted(async () => {
      await fetchImages()
      await fetchProducts()

      gsap.registerPlugin(ScrollTrigger)

      // title2 動畫
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

      // subtitle2 動畫
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

      // background2 parallax
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

    // 從後端抓產品資料
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products')
        const data = await response.json()
        products.value = data.filter((p) => Array.isArray(p.images) && p.images.length > 0)
        console.log('products:', products.value)
      } catch (error) {
        console.error('獲取產品失敗:', error)
        products.value = []
      }
    }

    // 從後端抓圖片（第一張用來給 section01、section04）
    const fetchImages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products')
        const data = await res.json()
        images.value = data
          .filter((p) => Array.isArray(p.images) && p.images.length > 0)
          .map((p) => p.images[0]) // 只取第一張
      } catch (error) {
        console.error('抓圖片失敗:', error)
        images.value = []
      }
    }

    // 控制 section01 / section03 的 swiper 切換
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
      images,
      currentImage,
      onPrev,
      onNext,
      modules: [Navigation, Pagination, Autoplay],
      slidePrev,
      slideNext,
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
  align-content: center;
  box-sizing: border-box;
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
  /* margin-bottom: 2rem; */
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
  height: 100%;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#section03 .my-swiper {
  width: 100%;
  top: 15vh;
  z-index: 3;
}
#section03 .product-card {
  margin: 10px;
}

#section04 {
  display: flex;
  transform: skewY(5deg);
  justify-content: space-between;
  align-items: center;
  /* padding-top: 5rem; */
  height: 100%;
  box-sizing: border-box;
}
#section04 .text-container {
  flex: 1;
  padding-right: 2rem;
  text-align: right;
  width: 500px;
  /* background: white; */
}
#section04 .collection {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
  /* background: white; */
}
</style>

<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="imageSrc || defaultImg" alt="Product Image" class="product-image" />
    </div>
    <h2 class="product-name">{{ name }}</h2>
    <p class="product-description">{{ description }}</p>
    <a :href="link" class="product-link" target="_blank">查看商品</a>
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
  computed: {
    defaultImg() {
      return '/images/default-product.jpg'
    },
  },
}
</script>

<style>
.product-card {
  background-color: #fdfaf4;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(85, 107, 47, 0.2);
  padding: 1.5rem;
  text-align: center;
  width: 300px;
  height: auto;
  box-sizing: border-box;
  position: relative;
  border: 1px solid #e6e2d6;
  font-family: 'Noto Serif TC', serif;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 8px 10px 20px rgba(85, 107, 47, 0.25);
}
.image-container {
  height: 200px;
  overflow: hidden;

  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;

  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
}
.product-image {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}
.product-name {
  font-size: 1.5rem;
  color: #3e4b2b;
  font-family: 'LXGW WenKai TC', cursive;
  margin: 0.5rem 0;
}

/* .product-description {
  font-size: 1rem;
  text-align: start;
  margin-top: 1rem;
} */

.product-description {
  font-size: 0.95rem;
  color: #5e5e5e;
  text-align: left;
  line-height: 1.6;
  margin-top: 0.5rem;
  min-height: 4.5rem;
}

.product-link {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: block;
  width: 160px;
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #556b2f; /* darkolivegreen */
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
}

.product-link:hover {
  background-color: #6b8e23; /* yellowgreen */
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
}
@media (max-width: 1024px) {
  .product-card {
    max-width: 260px;
    padding: 1.25rem;
  }

  .product-name {
    font-size: 1.3rem;
  }

  .product-description {
    font-size: 0.9rem;
    min-height: 4rem;
  }

  .product-link {
    font-size: 0.95rem;
    width: 140px;
    padding: 0.6rem 1rem;
  }
}

@media (max-width: 768px) {
  .product-card {
    max-width: 220px;
    min-width: 180px;
    padding: 1rem;
  }

  .product-name {
    font-size: 1.1rem;
  }

  .product-description {
    font-size: 0.85rem;
    min-height: 3.5rem;
  }

  .product-link {
    font-size: 0.9rem;
    width: 120px;
  }
}

@media (max-width: 480px) {
  .product-card {
    max-width: 180px;
    padding: 0.8rem;
  }

  .product-name {
    font-size: 1rem;
  }

  .product-description {
    font-size: 0.8rem;
    min-height: 3rem;
  }

  .product-link {
    font-size: 0.85rem;
    width: 110px;
  }
}
</style>

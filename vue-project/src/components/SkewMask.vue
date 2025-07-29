<template>
  <div
    class="skew-mask"
    :style="{
      backgroundColor: maskColor,
      height: maskHeight + 'vh',
      backgroundImage: maskImage ? `url(${maskImage})` : 'none',
    }"
  >
    <div class="skew-content" :class="`align-${align}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maskColor: {
      type: String,
      default: '#1c1f1a',
    },
    maskHeight: {
      type: Number,
      default: 30,
    },
    maskImage: {
      type: String,
      default: '',
    },
    align: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'center', 'right'].includes(value),
    },
  },
}
</script>

<style scoped>
.skew-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 105vw;
  transform: skewY(-5deg);
  transform-origin: top left;
  z-index: 15;
  background-size: cover;
  background-position: center;
}
/* .skew-mask {
  position: relative;
  width: 100%;
  height: 30vh;
  transform: skewY(-5deg);
  transform-origin: top left;
  z-index: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
} */

.skew-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  transform: skewY(5deg);
  padding: 3rem;
  width: 100%;
  color: beige;
  font-family: 'Chiron Sung HK', serif;
  text-align: left;
}
/* .skew-content {
  transform: skewY(5deg);
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Chiron Sung HK', serif;
  color: beige;
} */

/* 對齊樣式 */
.align-left {
  align-items: flex-start;
  text-align: left;
}

.align-center {
  align-items: center;
  text-align: center;
}

.align-right {
  align-items: flex-end;
  text-align: right;
}
</style>

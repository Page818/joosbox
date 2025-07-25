<template>
  <div
    class="skew-mask"
    :style="{
      backgroundColor: maskColor,
      height: maskHeight + 'vh',
      backgroundImage: `url(${maskImage}`,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    maskColor: {
      type: String,
      default: '#000',
    },
    maskHeight: {
      type: Number,
      default: 30,
    },
    maskImage: { type: String, default: '' },
  },
}
</script>

<style scoped>
.skew-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  transform: skewY(-5deg);
  transform-origin: top left;
  z-index: 15;
}
</style>

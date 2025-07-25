<template>
  <div
    class="angle-background"
    :style="{ backgroundColor: backgroundColor, backgroundImage: `url(${angleImage}` }"
  >
    <div class="content-overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: '#d7c8b2',
    },
    angleImage: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.angle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: skewY(-5deg);
  transform-origin: top left;
  z-index: 1;
  background-size: cover;
  background-position: center;
}

.content-overlay {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  transform: skewY(-5deg);
}
</style>

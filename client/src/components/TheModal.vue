<template>
  <div :class="`modal is-clipped ${isActive ? 'is-active' : ''}`">
    <div class="modal-background"></div>
    <div class="modal-content centering">
      <!-- Any other Bulma elements you want -->
      <slot />
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="less" scoped>
.centering {
  display: grid;
  justify-content: center;
}
</style>
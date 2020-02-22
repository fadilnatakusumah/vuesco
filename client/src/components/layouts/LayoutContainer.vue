<template>
  <div class="custom__container">
    <TheNavigation />
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<script>
import TheNavigation from "../TheNavigation";

export default {
  name: "LayoutComponent",
  components: { TheNavigation },
  data() {
    return {};
  },
  method: {}
};
</script>

<style scoped>
.custom__container {
  background-color: #f5f5f5;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  background-color: white;
  width: 100%;
  min-height: 700px;
  /* height: 100vh; */
  /* height: inherit; */
  /* min-height: 100vh; */
}
</style>
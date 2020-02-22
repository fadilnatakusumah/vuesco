<template>
  <LayoutContainer>
    <router-view />
  </LayoutContainer>
</template>

<script>
import LayoutContainer from "./components/layouts/LayoutContainer";

export default {
  components: {
    LayoutContainer
  }
};
</script>


<style lang="scss">
@import "~reset-css/reset.css";

#app {
  background-color: #ccc;
  height: 100%;
  // min-height: 100vh;
}

html,
body {
  // height: 100%;
  width: 100%;
}
</style>

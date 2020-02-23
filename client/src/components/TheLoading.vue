<template>
  <LoadingOverlay :active.sync="isLoading" :is-full-page="isFullScreen" />
</template>
<script>
import LoadingOverlay from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },    
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  components: { LoadingOverlay }
};
</script>
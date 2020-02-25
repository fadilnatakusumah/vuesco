<template>
  <div class="card__container">
    <TheLoading :isLoading="loadingPosts" :isFullScreen="true" />
    <fragment v-if="posts.length > 0">
      <TheCard 
      v-for="(post, index) in posts" 
      :dataPost="post" 
      :key="index"
       />
    </fragment>
    <div class="has-text-centered" v-if="posts.length === 0 && !loadingPosts">
      <h2>No Post data</h2>
    </div>
  </div>
</template>

<script>
import TheCard from "../components/TheCard";
import TheLoading from "../components/TheLoading";

export default {
  components: { TheCard, TheLoading },
  created() {
    this.getPosts();
  },
  data() {
    return {
      posts: [],
      loadingPosts: false
    };
  },
  methods: {
    getPosts() {
      this.loadingPosts = true;
      this.$store
        .dispatch("getPosts")
        .then(res => {
          this.loadingPosts = false;
          this.posts = res;
        })
        .catch(err => {
          this.loadingPosts = false;
          this.posts = [];
          this.$vToastify.error(`Failed: ${err}`);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.card__container {
  display: grid;
  // grid-template-columns: 2fr 2fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}
</style>
<template>
  <div class="card__container">
    <TheCard v-for="(post, index) in posts" :dataPost="post" :key="index" />
  </div>
</template>

<script>
import TheCard from "../components/TheCard";

const dummy = {
  url:
    "https://funlava.com/wp-content/uploads/2013/03/animals_cats_small_cat_005241_.jpg",
  caption:
    "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
};

const data = Array.apply(dummy, Array(10)).map(_ => ({ ...dummy }));

export default {
  data() {
    return {
      posts: data
    };
  },
  components: { TheCard }
};
</script>

<style lang="less" scoped>
.card__container {
  display: grid;
  // grid-template-columns: 2fr 2fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr))
}
</style>
<template>
  <div>
    <div class="profile__image">
      <figure class="image is-128x128">
        <img :src="currentUser.avatar" />
      </figure>

      <h1 class="title">{{currentUser.username}}</h1>
      <h2 class="subtitle">{{currentUser.email}}</h2>
    </div>
    <hr />
    <div class="posts__container">
      <div class="title__container">
        <h1 class="title">My Post</h1>
        <button class="button is-primary" @click="toggleModal">
          <span class="icon">
            <i class="fa fa-plus"></i>
          </span>
          <span>Add Post</span>
        </button>
      </div>
      <div class="card__container">
        <TheLoading :isLoading="loadingMyPosts" />
        <fragment v-if="myPosts.length > 0">
          <TheCard
            v-for="(post, index) in myPosts"
            :dataPost="post"
            :key="index"
            @getMyPost="getMyPost"
          />
        </fragment>
        <div class="has-text-centered" v-if="myPosts.length === 0 && !loadingMyPosts">
          <h2>No Post data</h2>
        </div>
      </div>

      <TheModal :isActive="showModal">
        <div class="add__form">
          <h1 class="title">Add Post</h1>
          <div>
            <form action @submit="createPost">
              <img v-if="form.imageUrl" :src="form.imageUrl" width="300px" />
              <div class="field">
                <label class="label">Image URL</label>
                <div class="control">
                  <input
                    v-model="form.imageUrl"
                    class="input is-primary"
                    type="text"
                    placeholder="Paste your image Url here"
                  />
                </div>
                <div class="control">
                  <label class="label">Caption</label>
                  <textarea
                    class="textarea"
                    v-model="form.caption"
                    placeholder="Insert your caption here"
                  />
                </div>
              </div>
              <div class="buttons">
                <button class="button is-primary">Submit</button>
                <button @click="toggleModal" class="button is-danger is-outlined">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </TheModal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TheCard from "../components/TheCard";
import TheModal from "../components/TheModal";
import TheLoading from "../components/TheLoading";

export default {
  components: { TheCard, TheLoading, TheModal },
  created() {
    this.getMyPost();
  },
  methods: {
    getMyPost() {
      alert("getMyPost")
      this.loadingMyPosts = true;
      this.$store
        .dispatch("getMyPosts")
        .then(res => {
          this.myPosts = res;
          this.loadingMyPosts = false;
        })
        .catch(err => {
          this.myPosts = [];
          this.loadingMyPosts = false;
        });
    },
    createPost(e) {
      e.preventDefault();

      this.$store
        .dispatch("createPost", this.form)
        .then(res => {
          this.myPosts = [res, ...this.myPosts];
          this.$vToastify.success("Success create post");
          this.toggleModal();
        })
        .catch(err => this.$vToastify.error(`Failed: ${err}`));
    },
    toggleModal(e) {
      if(e){
        e.preventDefault();
      }
      this.showModal = !this.showModal;
    }
  },
  data() {
    return {
      loadingMyPosts: false,
      myPosts: [],
      showModal: false,
      form: {
        imageUrl: "",
        caption: ""
      }
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style lang="less" scoped>
.profile__image {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.posts__container {
  margin: 20px 0 0 0;
  padding: 20px;
}

.title__container {
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
  }

  button {
    margin-left: 15px;
  }
}
.card__container {
  margin: 10px 0;
  display: grid;
  // grid-template-columns: 2fr 2fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.add__form {
  display: flex;
  flex-direction: column;
  padding: 25px 15px;
  max-width: 900px;
  min-width: 700px;
  background: white;
}

.centering {
  margin: 0 auto;
}

@media screen and (min-width: 740px) {
  .add__form {
    width: 100%;
    height: 100%;
    background: white;
  }
}
</style>
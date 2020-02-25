
<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="dataPost.imageUrl" alt="dataPost.caption" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="dataPost.createdBy.avatar" :alt="dataPost.createdBy.username" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{dataPost.createdBy.username}}</p>
          <p class="subtitle is-6">{{dataPost.createdBy.email}}</p>
        </div>
        <div class="media-right">
          <button @click="deletePostHandler(dataPost._id)" class="delete"></button>
        </div>
      </div>
      <div class="content">
        {{dataPost.caption}}
        <br />
        <time
          :datetime="moment(dataPost.createdDate).format('YYYY-MM-DD')"
        >{{moment(dataPost.createdDate).format('hh:mm a')}} - {{moment(dataPost.createdDate).format('D MMM YYYY')}}</time>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "UiCard",
  created() {
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    moment(date) {
      const convertedDate = new Date(+date);
      return moment(convertedDate);
    },
    refreshPosts(){
      alert("refreshPosts")
      this.$emit('getMyPost')
    },
    deletePostHandler(id_post) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("deletePost", { id_post })
          .then((res) => {
            this.refreshPosts();
            this.$vToastify.success("Success delete post");
          })
          .catch(err => {
            this.$vToastify.success("Failed delete post");
          });
      }
    }
  },
  props: {
    dataPost: {
      default: {},
      type: Object
    },
    getMyPost: {
      type: Function
    },
  }
};
</script>

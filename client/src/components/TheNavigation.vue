<template>
  <div class="navbar__absolute">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="../assets/vuesco-logo.png" />
          <div class="brand__style">Vuesco</div>
        </b-navbar-item>
      </template>
      <template slot="start">
        <fragment v-if="currentUser">
          <b-navbar-item href="#" tag="router-link" :to="{ path: '/profile' }">
            <i class="fa fa-user" />
            <span class="icon__title">Profile</span>
          </b-navbar-item>
          <!-- <b-navbar-item href="#" tag="router-link" :to="{ path: '/posts' }">
            <i class="fa fa-images" />
            <span class="icon__title">My Posts</span>
          </b-navbar-item> -->
        </fragment>
        <!-- <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
        </b-navbar-dropdown>-->
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <fragment v-if="currentUser">
              <a @click="signoutUser" class="button is-primary">
                <strong>Sign out</strong>
              </a>
            </fragment>
            <fragment v-else>
              <router-link to="/signup" class="button is-primary">
                <strong>Sign up</strong>
              </router-link>
              <router-link to="/signin" class="button is-light">Sign in</router-link>
            </fragment>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    console.log("TCL: created -> this.currentUser", this.currentUser);
  },
  methods: {
    signoutUser() {
      this.$store.dispatch("signoutUser");
      this.$vToastify.info("User signed out");
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style lang="less" scoped>
.navbar__absolute {
  position: relative;
  // top: 0;
  width: 100%;
}
.brand__style {
  margin: 0 10px;
  padding-right: 20px;
  border-right: 1px solid #ccc;
  font-size: 18px;
  font-weight: 600;
  color: purple;
}

.icon__title {
  margin: 0 15px;
}
</style>
<template>
  <div class="auth__container">
    <h3 class="title is-3">
      {{ this.state === "signin" ? "Sign in Form" : "Sign up Form" }}
    </h3>
    <Signin v-if="state === 'signin'" />
    <Signup v-if="state === 'signup'" />
    <div>
      <span v-if="state === 'signin'">
        Don't have an account yet?
        <router-link to="/signup">Sign up here</router-link>
      </span>

      <span v-if="state === 'signup'">
        Already have an account?
        <router-link to="/signin">Sign in here</router-link>
      </span>
    </div>
  </div>
</template>

<script>
const Signin = () => import("../auth/Signin");
const Signup = () => import("../auth/Signup");

export default {
  components: {
    Signin,
    Signup
  },
  data() {
    return {
      state: "signin"
    };
  },
  created() {
    const { name } = this.$router.history.current;
    if (name === "Signin") {
      this.state = "signin";
    } else if (name === "Signup") {
      this.state = "signup";
    }
  },
  watch: {
    $route(to, from, next) {
      if (to.name === "Signin") {
        this.state = "signin";
      } else if (to.name === "Signup") {
        this.state = "signup";
      }
    }
  },
};
</script>

<style scoped>
.auth__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 800px;
  width: 100%;
}
</style>
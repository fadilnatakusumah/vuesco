<template>
  <div class="box">
    <div class="section">
      <form @submit="submitForm">
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-success"
              type="text"
              placeholder="Insert username here"
              v-model="form.username"
              name="username"
              @input="onChangeHandler"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <p class="help is-danger" v-if="formErrors['username']">{{ this.formErrors["username"] }}</p>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-success"
              type="password"
              placeholder="Insert password here"
              v-model="form.password"
              name="password"
              @input="onChangeHandler"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
          </div>
          <p class="help is-danger" v-if="formErrors['password']">{{ this.formErrors["password"] }}</p>
        </div>
        <div class="has-text-centered">
          <button
            :disabled="!isFormValid ||loadingForm"
            type="submit"
            :class="`button is-primary ${loadingForm ? 'is-loading' : ''}`"
          >Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},
      formErrors: {},
      loadingForm: false
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      this.loadingForm = true;
      this.$store
        .dispatch("signinUser", this.form)
        .then(res => {
          this.loadingForm = false;
          this.$vToastify.success("Success signed in user");
          setTimeout(()=>{
            console.log("store", this.currentUser);
          },3000)
        })
        .catch(err => {
          const errMsg = err.replace("GraphQL error: ", "");
          this.loadingForm = false;
          this.$vToastify.error(`Failed: ${errMsg}`);
        });
    },
    onChangeHandler(e) {
      const { name, value } = e.target;
      if (name === "username") {
        if (value && value.length > 20) {
          this.formErrors[name] =
            "Username should not be more than 20 characters";
        } else {
          delete this.formErrors[name];
        }
      } else if (name === "password") {
        if (value && value.length < 6) {
          this.formErrors[name] = "Password should be atleast 6 characters";
        } else {
          delete this.formErrors[name];
        }
      }
    }
  },
  watch: {
    currentUser(value) {
      if (value) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    isFormValid() {
      return (
        this.form.username &&
        this.form.password &&
        !this.formErrors["username"] &&
        !this.formErrors["password"]
      );
    },
    ...mapGetters(["currentUser"])
  }
};
</script>
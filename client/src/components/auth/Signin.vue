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
          <p class="help is-danger" v-if="formErrors['username']">
            {{ this.formErrors["username"] }}
          </p>
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
          <p class="help is-danger" v-if="formErrors['password']">
            {{ this.formErrors["password"] }}
          </p>
        </div>
        <div class="has-text-centered">
          <button
            :disabled="!isFormValid"
            type="submit"
            class="button is-primary"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      formErrors: {}
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
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
    },
  },
  computed: {
    isFormValid() {
      return (
        this.form.username &&
        this.form.password &&
        !this.formErrors["username"] &&
        !this.formErrors["password"]
      );
    }
  }
};
</script>
<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4 card">
      <h3>Login</h3>
      <form @submit.prevent="submitLogin">
        <div class="form-floating mb-3">
          <label for="floatingInput">Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="name@example.com"
            v-model="dataLogin.email"
          />
        </div>
        <div class="form-floating mb-3">
          <label for="floatingPassword">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="dataLogin.password"
          />
        </div>
        <p>
          <button type="submit" class="btn btn-primary">Submit</button>
          don't have an account?
          <button type="button" class="btn btn-primary" @click.prevent="change">
            Register
          </button>
        </p>
        <!-- google sign in -->
        <div>
          <p>OR</p>
          <GoogleLogin
            :base_url="base_url"
            :changePage="changePage"
            :changeLogin="changeLogin"
            @emptying="$emit('emptying')"
            @fecthData="$emit('fecthData')"
          ></GoogleLogin>
        </div>
      </form>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import GoogleLogin from "../components/ButtonLoginGoogle";
export default {
  props: ["login", "changePage", "base_url", "changeLogin"],
  components: {
    GoogleLogin,
  },
  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitLogin() {
      this.login(this.dataLogin);
    },
    change() {
      this.changePage("regis");
    },
  },
};
</script>

<style></style>

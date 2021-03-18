<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4 card">
      <h3>Register</h3>
      <form @submit.prevent="submitRegis">
        <div class="form-floating mb-3">
          <label for="floatingInput">Email</label>
          <input
            type="email"
            class="form-control"
            id="email-regis"
            placeholder="name@example.com"
            v-model="dataRegis.email"
          />
        </div>
        <div class="form-floating mb-3">
          <label for="floatingPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="pass-regis"
            placeholder="Password"
            v-model="dataRegis.password"
          />
        </div>
        <p>
          <button type="submit" class="btn btn-primary">Submit</button>
          already have an account?
          <button type="submit" class="btn btn-primary" @click.prevent="change">
            Login
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
  props: ["changePage", "base_url", "regis", "changeLogin"],
  components: {
    GoogleLogin,
  },
  data() {
    return {
      dataRegis: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    change() {
      this.changePage("login");
    },
    submitRegis() {
      this.regis(this.dataRegis);
    },
  },
};
</script>

<style></style>

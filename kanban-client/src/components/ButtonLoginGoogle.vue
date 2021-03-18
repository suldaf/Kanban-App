<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError"
  >
    Sign in with Google
  </g-signin-button>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: ["base_url", "changePage", "changeLogin"],
  data() {
    return {
      googleSignInParams: {
        client_id:
          "333265928106-9kifa9fovhc7rncqcsvrhlahfc85c1b9.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: this.base_url + "/users/googleLogin",
        data: {
          googleToken: id_token,
        },
      })
        .then(({ data }) => {
          localStorage.token = data.token;
          localStorage.user = data.email;

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1750,
          });
          this.$emit("emptying");
          this.changeLogin(true);
          this.changePage("home");
          this.$emit("fecthData");
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Sorry...",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(err);
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
  },
};
</script>

<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
.g-signin-button:hover {
  cursor: pointer;
}
</style>

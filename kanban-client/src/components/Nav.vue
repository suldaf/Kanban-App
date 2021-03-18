<template>
  <div>
    <nav class="navbar navbar-light bg-secondary">
      <div class="container-fluid">
        <div class="col-4">
          <span class="navbar-brand mb-0 h1">Kanban</span>
        </div>
        <div class="col-4">
          <span class="navbar-brand mb-0 h1" v-if="isLogin"
            >Welcome to Kanban Board</span
          >
        </div>
        <div class="col-4">
          <ul class="nav">
            <li class="nav-item">
              <a
                class="btn btn-info"
                aria-current="page"
                href="#"
                v-if="isLogin && page !== 'home'"
                @click.prevent="home"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="btn btn-info"
                aria-current="page"
                href="#"
                v-if="isLogin && page === 'home'"
                @click.prevent="add"
                >Add Task</a
              >
            </li>
            <li class="nav-item">
              <a
                class="btn btn-info"
                aria-current="page"
                href="#"
                v-if="!isLogin"
                @click.prevent="login"
                >Login</a
              >
            </li>
            <li class="nav-item">
              <a
                class="btn btn-info g-signin2"
                aria-current="page"
                href="#"
                v-if="page === 'home' || isLogin"
                @click.prevent="remove"
                >Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["page", "logout", "isLogin"],
  methods: {
    remove() {
      this.logout();
    },

    login() {
      this.$emit("show-login", "login");
    },
    add() {
      this.$emit("show-add", "add");
    },
    home() {
      this.$emit("show-home", "home");
    },
  },
};
</script>

<style scoped>
li.nav-item {
  padding-right: 5px;
}
ul.nav {
  justify-content: flex-end;
}
</style>

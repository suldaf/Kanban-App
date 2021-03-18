<template>
  <div>
    <Nav
      :page="page"
      :logout="logout"
      :isLogin="isLogin"
      @show-home="changePage"
      @show-add="changePage"
      @show-login="changePage"
    ></Nav>
    <Home
      v-if="page === 'home' && isLogin"
      :categories="categories"
      :taskCreate="taskCreate"
      :getDataById="getDataById"
      :deleteTask="deleteTask"
      :user="user"
      @change-todo="categoryEdit"
      @change-doing="categoryEdit"
      @change-done="categoryEdit"
      @change-backlog="categoryEdit"
    ></Home>
    <Login
      v-if="page === 'login' && !isLogin"
      :login="login"
      :changePage="changePage"
      :base_url="base_url"
      :getData="getData"
      :changeLogin="changeLogin"
      @emptying="removeData"
      @fecthData="getData"
    ></Login>
    <Regis
      v-if="page === 'regis' && !isLogin"
      :changePage="changePage"
      :base_url="base_url"
      :regis="regis"
      :changeLogin="changeLogin"
      :getData="getData"
      @emptying="removeData"
      @fecthData="getData"
    ></Regis>
    <AddTask :taskCreate="taskCreate" v-if="page === 'add'"></AddTask>
    <EditTask
      v-if="page === 'edit'"
      :dataEdit="dataEdit"
      :taskEdit="taskEdit"
    ></EditTask>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Regis from "./views/Regis.vue";
import Nav from "./components/Nav.vue";
import axios from "axios";
import AddTask from "./views/AddTask";
import EditTask from "./views/EditTask";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      page: "add",
      isLogin: false,
      base_url: "https://sul-kanban-server.herokuapp.com",
      categories: {
        Backlog: [],
        ToDo: [],
        Doing: [],
        Done: [],
      },
      user: "",
      dataEdit: {},
    };
  },
  components: {
    Regis,
    Home,
    Login,
    Nav,
    AddTask,
    EditTask,
  },
  methods: {
    changePage(value) {
      this.page = value;
    },
    changeLogin(value) {
      this.isLogin = value;
    },
    login(dataLogin) {
      axios({
        method: "POST",
        url: this.base_url + "/users/login",
        data: {
          email: dataLogin.email,
          password: dataLogin.password,
        },
      })
        .then(({ data }) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1750,
          });
          localStorage.token = data.token;
          localStorage.user = data.email;
          this.changePage("home");
          this.changeLogin(true);
          this.getData();
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Wrong Email or Password",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(err);
        })
        .then(() => {
          (dataLogin.email = ""), (dataLogin.password = "");
        });
    },
    regis(dataRegis) {
      axios({
        method: "POST",
        url: this.base_url + "/users/register",
        data: {
          email: dataRegis.email,
          password: dataRegis.password,
        },
      })
        .then(({ data }) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Created",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(data);
          this.changePage("login");
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oppss..",
            text:
              "Sorry your email not valid or your password is not long enough",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(err);
        })
        .then(() => {
          (dataRegis.email = ""), (dataRegis.password = "");
        });
    },
    getData() {
      axios({
        method: "GET",
        url: this.base_url + "/tasks",
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          data.forEach((el) => {
            if (el.category === "Backlog") {
              this.categories.Backlog.push(el);
            } else if (el.category === "ToDo") {
              this.categories.ToDo.push(el);
            } else if (el.category === "Doing") {
              this.categories.Doing.push(el);
            } else if (el.category === "Done") {
              this.categories.Done.push(el);
            }
          });
          this.user = localStorage.user;
          // console.log(this.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataById(id) {
      axios({
        method: "GET",
        url: this.base_url + "/tasks/" + id,
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          //
          // this.dataEdit.push(data);
          this.dataEdit = data;
          this.changePage("edit");
          // console.log(this.dataEdit);
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Not Authorized",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(err);
        });
    },
    logout() {
      localStorage.clear();
      // var auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function() {
      //   console.log("User signed out.");
      // });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout Success",
        showConfirmButton: false,
        timer: 1750,
      });
      this.removeData();
      this.changeLogin(false);
      this.changePage("login");
    },
    taskCreate(dataAddTask) {
      axios({
        method: "POST",
        url: this.base_url + "/tasks",
        data: {
          title: dataAddTask.title,
          description: dataAddTask.description,
          category: dataAddTask.category,
        },
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task was successfully created",
            showConfirmButton: false,
            timer: 1750,
          });
          this.changePage("home");
          this.removeData();
          this.getData();
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "WARNING!!",
            text: "Title and Category Must Be Filled",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(err);
        })
        .then(() => {
          dataAddTask.title = "";
          dataAddTask.description = "";
          dataAddTask.category = "";
        });
    },
    taskEdit(dataEditTask) {
      axios({
        method: "PUT",
        url: this.base_url + "/tasks/" + dataEditTask.id,
        headers: {
          token: localStorage.token,
        },
        data: {
          title: dataEditTask.title,
          description: dataEditTask.description,
          category: dataEditTask.category,
        },
      })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task was successfully edited",
            showConfirmButton: false,
            timer: 1750,
          });
          //
          this.changePage("home");
          this.removeData();
          this.getData();
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "WARNING!!",
            text: "Title and Category Must Be Filled",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(err);
        });
    },
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: this.base_url + "/tasks/" + id,
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task was successfully deleted",
            showConfirmButton: false,
            timer: 1750,
          });
          this.removeData();
          this.getData();
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Not Authorized",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(err);
        });
    },
    categoryEdit(data) {
      axios({
        method: "PATCH",
        url: this.base_url + "/tasks/" + data.id,
        headers: {
          token: localStorage.token,
        },
        data: {
          category: data.category,
        },
      })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Category updated",
            showConfirmButton: false,
            timer: 1750,
          });
          console.log(data);
          this.removeData();
          this.getData();
          //
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Not Authorized",
            showConfirmButton: false,
            timer: 1750,
          });
          //
          console.log(err);
        });
    },
    removeData(data) {
      this.categories = {
        Backlog: [],
        ToDo: [],
        Doing: [],
        Done: [],
      };
    },
  },
  created() {
    if (localStorage.token) {
      this.changePage("home");
      this.user = localStorage.user;
      this.getData();
      this.changeLogin(true);
    } else {
      this.changePage("login");
      this.changeLogin(false);
    }
  },
};
</script>

<style scoped></style>

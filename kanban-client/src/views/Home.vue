<template>
  <!--  -->
  <!--  -->
  <!-- CARD TABLE/BOARD -->
  <div class="container bg-info">
    <div class="row">
      <div class="col-6">
        <h6 class="text-end">User Login: {{ user }}</h6>
      </div>
    </div>
    <div>
      <Board
        :categories="categories"
        :getDataById="getDataById"
        :deleteTask="deleteTask"
        @change-todo="$emit('change-todo', $event)"
        @change-doing="$emit('change-doing', $event)"
        @change-done="$emit('change-done', $event)"
        @change-backlog="$emit('change-backlog', $event)"
      ></Board>
    </div>

    <!-- BACKLOG -->
    <!-- <base-section :itemList="backlogList"></base-section> -->

    <!-- TODO -->
    <!-- <base-section :itemList="todoList"></base-section> -->
  </div>
</template>

<script>
import Board from "../components/Board";
export default {
  props: {
    categories: Object,
    getDataById: Function,
    deleteTask: Function,
    user: String,
  },
  components: { Board },
};
</script>

<style></style>

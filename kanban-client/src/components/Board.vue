<template>
  <div id="category">
    <div class="sections card">
      <h5 class="text-center">
        Backlog
      </h5>
      <Card
        v-for="task in categories.Backlog"
        :key="task.id"
        :task="task"
        :getDataById="getDataById"
        :deleteTask="deleteTask"
        @change-todo="$emit('change-todo', $event)"
        @change-doing="$emit('change-doing', $event)"
        @change-done="$emit('change-done', $event)"
        @change-backlog="$emit('change-backlog', $event)"
      ></Card>
    </div>
    <div class="sections card">
      <h5 class="text-center">ToDo</h5>
      <Card
        v-for="task in categories.ToDo"
        :key="task.id"
        :task="task"
        :getDataById="getDataById"
        :deleteTask="deleteTask"
        @change-todo="$emit('change-todo', $event)"
        @change-doing="$emit('change-doing', $event)"
        @change-done="$emit('change-done', $event)"
        @change-backlog="$emit('change-backlog', $event)"
      ></Card>
    </div>
    <div class="sections card">
      <h5 class="text-center">Doing</h5>
      <Card
        v-for="task in categories.Doing"
        :key="task.id"
        :task="task"
        :getDataById="getDataById"
        :deleteTask="deleteTask"
        @change-todo="$emit('change-todo', $event)"
        @change-doing="$emit('change-doing', $event)"
        @change-done="$emit('change-done', $event)"
        @change-backlog="$emit('change-backlog', $event)"
      ></Card>
    </div>
    <div class="sections card">
      <h5 class="text-center">Done</h5>
      <Card
        v-for="task in categories.Done"
        :key="task.id"
        :task="task"
        :getDataById="getDataById"
        :deleteTask="deleteTask"
        @change-todo="$emit('change-todo', $event)"
        @change-doing="$emit('change-doing', $event)"
        @change-done="$emit('change-done', $event)"
        @change-backlog="$emit('change-backlog', $event)"
      ></Card>
    </div>

    <!-- MODAL -->
  </div>
</template>

<script>
import Card from "./Card";
export default {
  props: {
    categories: Object,
    task: Object,
    getDataById: Function,
    deleteTask: Function,
  },
  components: {
    Card,
  },
};
</script>

<style scoped>
#category {
  display: flex;
  justify-content: space-between;
}
.card {
  margin: 2px 3px;
  overflow: scroll;
  height: 75vh;
  width: 65vh;
}
</style>

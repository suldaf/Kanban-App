<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4 card">
      <h3>Add Task</h3>
      <form @submit.prevent="addTask">
        <div class="form-floating mb-3">
          <label for="floatingInput">Title</label>
          <input
            type="text"
            class="form-control"
            placeholder="Text here"
            v-model="dataAddTask.title"
          />
        </div>
        <div class="form-floating mb-3">
          <label for="floatingInput">Description</label>
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style="height: 100px"
            v-model="dataAddTask.description"
          ></textarea>
        </div>
        <div class="form-floating mb-3">
          <label for="floatingInput">Category</label>
          <select
            class="form-control form-select"
            aria-label="Default select example"
            v-model="dataAddTask.category"
          >
            <option selected>----SELECT----</option>
            <option value="Backlog">Backlog</option>
            <option value="ToDo">ToDo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
export default {
  props: {
    taskCreate: Function,
  },
  data() {
    return {
      dataAddTask: {
        title: "",
        description: "",
        category: "",
      },
    };
  },
  methods: {
    addTask() {
      this.taskCreate(this.dataAddTask);
    },
  },
};
</script>

<style></style>

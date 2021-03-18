<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4 card">
      <h3>Edit Task</h3>
      <form @submit.prevent="editTask">
        <div class="form-floating mb-3">
          <label for="floatingInput">Title</label>
          <input
            type="text"
            class="form-control"
            placeholder="Your task"
            v-model="dataEditTask.title"
          />
        </div>
        <div class="form-floating mb-3">
          <label for="floatingInput">Description</label>
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            v-model="dataEditTask.description"
            style="height: 100px"
          ></textarea>
        </div>
        <div class="form-floating mb-3">
          <label for="floatingInput">Category</label>
          <select
            class="form-control form-select"
            aria-label="Default select example"
            v-model="dataEditTask.category"
          >
            <option>----SELECT----</option>
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
  data() {
    return {
      dataEditTask: {
        id: `${this.dataEdit.id}`,
        title: `${this.dataEdit.title}`,
        description: `${this.dataEdit.description}`,
        category: `${this.dataEdit.category}`,
      },
    };
  },
  props: {
    dataEdit: Object,
    taskEdit: Function,
  },
  methods: {
    editTask() {
      this.taskEdit(this.dataEditTask);
    },
  },
};
</script>

<style></style>

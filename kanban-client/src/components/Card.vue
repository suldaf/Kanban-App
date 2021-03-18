<template>
  <div>
    <div class="row-card">
      <div
        class="card text-white text-center bg-secondary mb-3"
        style="max-width: 18rem;"
      >
        <div class="card-header bg-light text-left text-dark">
          {{ task.title }}
        </div>
        <p class="card-text">{{ task.description }}</p>
        <div
          v-if="task.category === 'Backlog'"
          class="card-footer bg-transparent border-light"
        >
          <div class="action">
            <a
              href="#"
              class="btn btn-sm btn-primary text-light"
              @click.prevent="show(task.id)"
              >Edit</a
            >
            <a
              href="#"
              class="btn btn-sm btn-danger text-light"
              @click.prevent="remove(task.id)"
              >Delete</a
            >
          </div>
          <div>
            <a
              href="#"
              class="btn btn-sm btn-info text-light"
              @click.prevent="todo(task.id)"
              >ToDo</a
            >
          </div>
        </div>
        <div
          v-if="task.category === 'ToDo'"
          class="card-footer bg-transparent border-light"
        >
          <div class="action">
            <a
              href="#"
              class="btn btn-sm btn-primary text-light"
              @click.prevent="show(task.id)"
              >Edit</a
            >
            <a
              href="#"
              class="btn btn-sm btn-danger text-light"
              @click.prevent="remove(task.id)"
              >Delete</a
            >
          </div>
          <div>
            <a
              href="#"
              class="btn btn-sm btn-info text-light"
              @click.prevent="backlog(task.id)"
              >Backlog</a
            >
            <a
              href="#"
              class="btn btn-sm btn-info text-light"
              @click.prevent="doing(task.id)"
              >Doing</a
            >
          </div>
        </div>
        <div
          v-if="task.category === 'Doing'"
          class="card-footer bg-transparent border-light"
        >
          <div class="action">
            <a
              href="#"
              class="btn btn-sm btn-primary text-light"
              @click.prevent="show(task.id)"
              >Edit</a
            >
            <a
              href="#"
              class="btn btn-sm btn-danger text-light"
              @click.prevent="remove(task.id)"
              >Delete</a
            >
          </div>
          <div>
            <a
              href="#"
              class="btn btn-sm btn-info text-light"
              @click.prevent="todo(task.id)"
              >ToDo</a
            >
            <a
              href="#"
              class="btn btn-sm btn-info text-light"
              @click.prevent="done(task.id)"
              >Done</a
            >
          </div>
        </div>
        <div
          v-if="task.category === 'Done'"
          class="card-footer bg-transparent border-light"
        >
          <div class="action">
            <a
              href="#"
              class="btn btn-sm btn-primary text-light"
              @click.prevent="show(task.id)"
              >Edit</a
            >
            <a
              href="#"
              class="btn btn-sm btn-danger text-light"
              @click.prevent="remove(task.id)"
              >Delete</a
            >
          </div>
          <div>
            <a
              href="#"
              class="btn btn-sm btn-info text-light"
              @click.prevent="doing(task.id)"
              >Doing</a
            >
          </div>
        </div>
        <p class="text text-black-50">By: {{ task.user }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
    getDataById: Function,
    deleteTask: Function,
  },
  methods: {
    show(id) {
      this.getDataById(id);
    },
    remove(id) {
      this.deleteTask(id);
    },
    todo(id) {
      this.$emit("change-todo", { category: "ToDo", id });
    },
    backlog(id) {
      this.$emit("change-backlog", { category: "Backlog", id });
      //
    },
    done(id) {
      this.$emit("change-done", { category: "Done", id });
      //
    },
    doing(id) {
      this.$emit("change-doing", { category: "Doing", id });
      //
    },
  },
};
</script>

<style scoped>
div.card {
  padding: 10px;
  margin-top: 7px;
  position: relative;
}
div.row-card {
  margin: 5px 3px;
}
div.action {
  margin-bottom: 5px;
}
p.text {
  font-size: 10px;
  text-align: right;
}
</style>

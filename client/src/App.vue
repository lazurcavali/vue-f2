<template>
  <div id="app">
    <h1>Tasks</h1>
    <hr>
    <Tasks />
  </div>
</template>

<script>
import CreateTask from './components/CreateTask.vue'
import Tasks from './components/Tasks.vue'

export default {
  name: 'app',
  components: {
    CreateTask,
    Tasks
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto 0;
  max-width: 800px;
}
</style>

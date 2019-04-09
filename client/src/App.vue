<template>
  <div id="app">
    <h1>Todo or not todo?</h1>
    <Tasks />
  </div>
</template>

<script>
import Tasks from './components/Tasks.vue'

export default {
  name: 'app',
  components: {
    Tasks
  }
}
</script>

<style>
  body {
    background-color: white;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    margin: 60px auto 0;
    max-width: 800px;
    color: #333;
}
</style>

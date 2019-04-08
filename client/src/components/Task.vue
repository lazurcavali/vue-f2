<template>
    <li>
        <p class="text">{{ post.text }}</p>
        <label for="done">Mark as checked</label>
        <label class="myCheckbox">
            <input 
                v-model="post.isChecked"
                v-on:click="updatePost(post)"
                type="checkbox"
                name="done"
                >
            <span></span>
        </label>
        <button v-on:click="deletePost(post._id)" class="delete">Delete</button>
    </li>
</template>

<script>
import PostService from '../PostService'
import { EventBus } from '../main'

export default {
  name: 'Task',
  props: {
    "post": Object
  },
  methods: {
      deletePost(id) {
          EventBus.$emit('taskWasDeleted', id);
      },
      updatePost(post) {
          this.$emit('taskWasUpdated', post);
      }
  }
}
</script>

<style scoped>
  p.error {
    border: 1px solid red;
    background-color: #ffccf6;
    padding: 10px;
    margin-bottom: 15px;
  }

  .post {
    position: relative;
    border: 1px solid green;
    background-color: white;
    padding: 0 10px 20px;
    margin-bottom: 15px;
  }

  .active {
    background-color: green;
    color: yellowgreen;
  }

  p.text {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
  }
</style>

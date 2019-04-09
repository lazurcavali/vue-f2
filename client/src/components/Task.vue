<template>
    <li v-bind:class="{ active: post.isChecked }">
        <EditTaskText 
          :post="post"
        />
        <label for="done"></label>
        <label class="myCheckbox">
            <input 
                v-model="post.isChecked"
                v-on:click="updatePost(post)"
                type="checkbox"
                name="done"
                >
            <span>Mark as checked</span>
        </label>
        <button v-on:click="deletePost(post._id)" class="delete">X</button>
    </li>
</template>

<script>
import PostService from '../PostService'
import { EventBus } from '../main'
import EditTaskText from './EditTaskText'

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
          post.isChecked = !post.isChecked;
          this.$emit('taskWasUpdated', post);
      }
  },
  components: {
    EditTaskText
  }
}
</script>

<style scoped>
  li {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px 0;
    border: 1px solid #f2f2f2;
    background-color: #f2f2f2;
    color: #333;
    transition: 0.2s;
    box-shadow: 0px 7px 16px -5px rgba(0,0,0,0.75);
  }

  .delete {
    border: none;
    background: none;
    color: red;
    font-size: 15px;
    cursor: pointer;
  }

  .myCheckbox input {
    display: none;
  }

  .myCheckbox span {
    cursor: pointer;
    font-size: 14px;
  }

  .active {
    border: 1px solid #00b359;
    background-color: #00b359;
    color: white;
    text-decoration: line-through;
    transition: 0.2s;
    box-shadow: 0px 7px 16px -10px rgba(0,0,0,0.75);
    transform: translateY(2px);
  }
</style>

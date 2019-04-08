<template>
  <div>
    <div class="create-post">
        <p>What should you do?</p>
        <input type="text" name="" id="create-post" v-model="text">
        <button v-on:click="createPost">Add</button>
    </div>
    <ul>
      <Task 
        v-for="post in posts"
        v-bind:key="post._id"
        :post="post"
        @taskWasUpdated="updatePost(post)"
      />
    </ul>
  </div>
</template>

<script>
import PostService from '../PostService';
import Task from './Task';
import { EventBus } from '../main';

export default {
  name: 'Tasks',
  components: {
    Task
  },
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      active: true
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
      EventBus.$on("taskWasDeleted", (id) => {
        this.deletePost(id);
      });
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async updatePost(post) {
      await PostService.updatePost(post._id, !post.isChecked);
    }
  }
}
</script>

<style scoped>
  div.container {
    max-width: 800px;
    margin: 0 auto;
  }
  
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

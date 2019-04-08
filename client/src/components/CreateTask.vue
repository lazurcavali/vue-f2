<template>
    <div class="create-post">
        <p>What should you do?</p>
        <input type="text" name="" id="create-post" v-model="text">
        <button v-on:click="createPost">Add</button>
    </div>
</template>

<script>
import PostService from '../PostService'
import { EventBus } from '../main'

export default {
  name: 'CreateTask',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      EventBus.$emit("postCreated");
    }
  }
}
</script>

<style scoped>
    .create-post {
        
    }

    input {
        width: 500px;
    }

    input, button {
        display: block;
        margin: 0 auto 10px;
        padding: 10px;
    }

    button {
        width: 100px;
    }
</style>

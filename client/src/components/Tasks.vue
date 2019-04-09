<template>
  <div>
    <div class="create-post">
        <p>I want a tatoo.</p>
        <p>Is this a poem?</p>
        <p>Hell no!!! So,</p>
        <p>What should I do?</p>
        <input type="text" name="" id="create-post" v-model="text">
        <button v-on:click="createPost">Add</button>
    </div>
    <hr>
    <div class="filter">
      <div class="filter">
        <label><input type="radio" v-model="statusTasks" value="All" />All</label>
        <label><input type="radio" v-model="statusTasks" value="true" />Done</label>
        <label><input type="radio" v-model="statusTasks" value="false" />Not finieshed</label>
      </div>
      
      <ul>
      <Task 
        v-for="post in filteredTasks"
        v-bind:key="post._id"
        :post="post"
        @taskWasUpdated="updatePost(post)"
      />
    </ul>
    </div>
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
      statusTasks: 'All'
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
      EventBus.$on("taskWasDeleted", (id) => {
        this.deletePost(id);
      });
      EventBus.$on("textWasUpdated", (post) => {
        this.updatePost(post);
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
      await PostService.updatePost(post._id, post.isChecked, post.text);
    }
  },
  computed: {
    filteredTasks() {
      const all = this.statusTasks;
      const tasks = this.posts;
      if( all == "All" ) {
        return tasks;
      } else if ( all == "true" ) {
        return tasks.filter( item => {
          if ( item.isChecked == true ) {
            return item;
          }
        });
      } else if ( all == "false" ) {
        return tasks.filter( item => {
          if ( item.isChecked == false ) {
            return item;
          }
        });
      }
    }
  }
}
</script>

<style scoped>
  .create-post input, .create-post button {
    display: block;
    height: 40px;
    margin: 0 auto;
  }

  .create-post input {
    width: 778px;
    padding: 0 10px;
    border-top: 1px solid #666;
    border-right: 1px solid #666;
    border-left: 1px solid #666;
    border-bottom: none;
    font-size: 15px;
  }

  .create-post button {
    width: 100%;
    background-color: #666;
    border: 1px solid #666;
    color: white;
    font-size: 15px;
  }

  .create-post button:hover {
    background-color: white;
    color: #666;
    transition: 0.2s;
    cursor: pointer;
  }

  hr {
    margin: 10px auto;
  }

  ul {
    list-style: none;
    padding: 0;
  }
</style>

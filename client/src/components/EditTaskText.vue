<template>
    <div class="text">
        <p>
            <input 
                type="text" 
                class="editText"
                v-model="post.text"
                v-if="show"
            />
            <span v-else >{{ post.text }}</span>
            <i class="fas fa-edit" @click="updateText(post)"></i>
        </p>
    </div>
</template>

<script>
import PostService from '../PostService'
import { EventBus } from '../main'

export default {
  name: 'EditTaskText',
  data() {
      return {
        show: false
      }
  },
  props: {
      post: Object
  },
  methods: {
      updateText(post) {
          this.show = !this.show;
          if ( this.show === false ) {
              EventBus.$emit('textWasUpdated', post);
          }
      }
  }
}
</script>

<style scoped>
    .text input {
        border: none;
        background: white;
        font-size: 15px;
    }

    .text p i {
        margin-left: 10px;
        cursor: pointer;
    }
</style>

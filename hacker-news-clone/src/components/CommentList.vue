<template>
  <div class="comments" v-if="comments && comments.length > 0">
    <h2>Comments</h2>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="comment-info">
        <span><strong>Author:</strong> {{ comment.author }}</span><br/>
        <span><strong>Created At:</strong> {{ formatDate(comment.created_at) }}</span>
      </div>
      <div class="comment-text" v-html="comment.text"></div>
      <!-- These are the replies to all of the comments, that i made look like the other comments
      but have an indent in order to clearly have the relation of children to the comment-->
      <div v-if="comment.children && comment.children.length > 0" class="replies">
        <div v-for="reply in comment.children" :key="reply.id" class="comment">
          <div class="comment-info">
            <span><strong>Author:</strong> {{ reply.author }}</span><br/>
            <span><strong>Created At:</strong> {{ formatDate(reply.created_at) }}</span>
          </div>
          <div class="comment-text" v-html="reply.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: Array,
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.comments {
  margin-top: 40px;
}

.comment {
  margin-bottom: 20px;
  border-left: 3px solid #ddd;
  padding-left: 15px;
}

.comment-info {
  font-size: 14px;
  color: #777;
}

.comment-text {
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.5;
  color: #444;
}

.replies {
  margin-top: 20px;
  padding-left: 20px;
}
</style>

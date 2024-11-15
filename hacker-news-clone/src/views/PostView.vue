<template>
  <div class="post-view" v-if="!loading">
    <button @click="goBack" class="go-back-button">Go Back</button>

    <div class="post-details">
      <h1>{{ post.title || 'Untitled Post' }}</h1>
      <p class="meta">
        <span><strong>Author:</strong> {{ post.author }}</span><br/>
        <span><strong>Created At:</strong> {{ formatDate(post.created_at) }}</span>
      </p>
      <div v-if="post.text" class="post-text" v-html="post.text"></div>
      <div v-if="post.url" class="post-url">
        <a :href="post.url" target="_blank">Read more about {{ post.title }}</a>
      </div>
    </div>

    <!--I have separated the comments in a different component-->
    <CommentList :comments="post.children" />
  </div>

  <div v-else class="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchPostById } from '@/axiosService';
import CommentList from '../components/CommentList.vue';

export default {
  components: {
    CommentList,
  },
  setup() {
    const post = ref(null);
    const loading = ref(true);
    const route = useRoute();
    const router = useRouter();
    const postId = route.params.id;

    onMounted(async () => {
      try {
        post.value = await fetchPostById(postId);
        console.log(post.value);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        loading.value = false;
      }
    });

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const goBack = () => {
      router.back();
    };

    return {
      post,
      loading,
      formatDate,
      goBack
    };
  }
};
</script>

<style scoped>
.post-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.post-details h1 {
  font-size: 2rem;
  color: #333;
}

.post-text {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

.post-url a {
  color: #0066cc;
  text-decoration: none;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.go-back-button {
  background-color: #797979;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.go-back-button:hover {
  background-color: #0056b3;
}
</style>

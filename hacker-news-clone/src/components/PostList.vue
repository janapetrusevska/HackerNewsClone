<template>
  <div class="post-container">
    <div v-if="loading" class="loading">Loading...</div>
    <ul v-else class="post-list">
      <li v-for="post in filteredPosts" :key="post.id" class="post-item">
        <router-link :to="{ name: 'PostView', params: { id: post.id } }" class="post-link">
          <h2 class="post-title">{{ post.title || 'Untitled Post' }}</h2>
        </router-link>
        <a :href="post.url" class="source-link"> READ MORE</a>
        <p class="post-meta">{{ post.points }}  points</p>
        <p class="post-meta"><strong>Author:</strong> {{ post.author }}</p>
        <p class="post-meta"><strong>Created At:</strong> {{ formatDate(post.created_at) }}</p>
        <div v-html="post.text" class="post-text"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { fetchMultiplePosts } from '@/axiosService';

export default {
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const posts = ref([]);
    const loading = ref(true);

    const fetchPosts = async () => {
      try {
        const postIds = Array.from({ length: 100 }, (_, index) => (index + 1).toString());
        posts.value = await fetchMultiplePosts(postIds);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchPosts);

    const filteredPosts = computed(() => {
      const term = props.searchTerm.toLowerCase();
      return posts.value.filter(post => post.title && post.title.toLowerCase().includes(term));
    });

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return {
      posts,
      loading,
      filteredPosts,
      formatDate,
    };
  },
};
</script>

<style scoped>
.post-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  font-size: 20px;
  color: #555;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px 0;
  padding: 15px;
  transition: transform 0.2s ease-in-out;
}

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-link {
  text-decoration: none;
  color: #333;
}

.post-title {
  font-size: 26px;
  color: #2a2a2a;
  margin-bottom: 10px;
}

.post-title:hover {
  color: #0073e6;
}

.source-link{
  text-decoration: none;
}

.post-meta {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.post-text {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;
}
</style>

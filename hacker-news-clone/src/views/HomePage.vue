<template>
    <div class="container">
      <h1>Hacker News Posts</h1>
      <SearchBar @search="searchPosts" />
      <PostList :searchTerm="searchContent" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import PostList from '../components/PostList.vue';
  import SearchBar from '../components/SearchBar.vue';
  
  export default {
    components: {
      PostList,
      SearchBar,
    },
    setup() {
      const searchContent = ref('');
  
      const searchPosts = (content) => {
        searchContent.value = content;
      };
  
      return {
        searchContent,
        searchPosts,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  .container h1{
    text-align: center;
  }
  </style>
  
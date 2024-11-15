<template>
  <div class="search-container">
    <input type="text" v-model.trim="searchTerm" @input="updateSearch" placeholder="Search posts by title..." />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: ['search'],
  setup(props, { emit }) {
    const searchTerm = ref('');

    const updateSearch = () => {
      emit('search', searchTerm.value);
    };

    return {
      searchTerm,
      updateSearch
    };
  }
};
</script>

<style>
.search-container{
  padding: 20px;
  align-content: center;
}

.search-container input{
  font-size: 18px;
  height: 20px;
  width: 400px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #2c3034;
}
</style>

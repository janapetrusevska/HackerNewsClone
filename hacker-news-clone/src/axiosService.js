import axios from 'axios';

export const fetchPostById = async (id) => {
  const API_URL = `https://hn.algolia.com/api/v1/items/${id}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const fetchMultiplePosts = async (ids) => {
  const requests = ids.map(async (id) => {
    try {
      return await fetchPostById(id);
    } catch (error) {
      console.error(`Skipping post with ID ${id} due to error.`);
      return null;
    }
  });

  const posts = await Promise.all(requests);
  return posts.filter(post => post !== null);
};
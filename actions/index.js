import axios from 'axios';

export const createNewArticle = async (data) => {
  try {
    const res = await axios.post('http://localhost:8080/api/articles', data);
    return {res: res};
  } catch (error) {
    console.error(error);
  }
};

export const getArticles = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/articles');
    return {res: res};
  } catch (error) {
    console.error(error);
  }
};

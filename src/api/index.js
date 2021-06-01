import axios from 'axios';

const config = {
  baseUrl: 'https://api.hnpwa.com/v0/',
};

export const getNewsList = newsId => {
  return axios.get(`${config.baseUrl}news/${newsId}.json`);
};

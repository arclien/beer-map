import { getNewsList } from '@/api';

export default {
  async FETCH_NEWS({ commit }) {
    const { data } = await getNewsList(1);
    commit('SET_NEWS', data);
  },
};

/* eslint-disable no-param-reassign */
import Axios from 'axios';

import { getApiEndPoint } from 'routers/env';
import {
  requestInterceptor,
  responseInterceptor,
  rejectInterceptor,
} from './interceptors';

const NomadApi = Axios.create({ baseURL: getApiEndPoint() });

NomadApi.interceptors.request.use(requestInterceptor);

NomadApi.interceptors.response.use(responseInterceptor, rejectInterceptor);

export { NomadApi };

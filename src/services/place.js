import { decamelizeKeys } from 'humps';
import qs from 'qs';

import { NomadApi } from './api';

export const getPlacesByLocation = (params) => {
  const queryParams = qs.stringify(decamelizeKeys(params));
  return NomadApi.get(`/places?${queryParams}`);
};

export const getPlaceInfoById = (id) => {
  return NomadApi.get(`/place?id=${id}`);
};

export const addPlace = (placeInfo) => {
  return NomadApi.post(`/place`, placeInfo);
};

export const getPlaceExist = (params) => {
  const queryParams = qs.stringify(decamelizeKeys(params));
  return NomadApi.get(`/place/exist?${queryParams}`);
};

export const deletePlaceInfoById = (id) => {
  return NomadApi.get(`/place/delete?id=${id}&key=7d51dc19-99a2`);
};

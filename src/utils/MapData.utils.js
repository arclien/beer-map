import MapData from '@/constants/mapData';

export const getMapDataById = (id) => {
  return MapData.find((el) => el.daumId === id);
};
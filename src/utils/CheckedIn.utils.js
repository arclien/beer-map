import { CHECK_IN_HISTORY } from '@/constants/checkin';
import { Storage } from '@/services/storage';
import { getObjectById } from '@/utils/utils';

export const getCheckedInData = () => {
  return Storage.getItem(CHECK_IN_HISTORY) || [];
};

export const hasCheckedInById = (id) => {
  const checkInData = getCheckedInData();
  const checkInHistory = getObjectById(id, checkInData);
  return checkInHistory;
};

export const setCheckedIn = (data) => {
  const checkInData = getCheckedInData();
  const checkInHistory = getObjectById(data.id, checkInData) || {};
  Storage.setItem(CHECK_IN_HISTORY, [
    ...checkInData.filter((el) => el.id !== data.id),
    mergeCheckedInHistory(checkInHistory, data),
  ]);
};

const mergeCheckedInHistory = (prev, cur) => {
  return !prev.id ? {
    id: cur.id,
    date: [cur.date],
  } : {
    id: prev.id,
    date: [...new Set([...prev.date, cur.date])],
  };
};
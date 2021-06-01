import { CHECK_IN_HISTORY } from '@/constants/checkin';
import { Storage } from '@/services/storage';

export const getCheckedInData = () => {
  return Storage.getItem(CHECK_IN_HISTORY) || [];
};

export const hasCheckedInById = (id) => {
  const checkInData = getCheckedInData();
  return checkInData.indexOf(id) >= 0;
};

export const setCheckedIn = (id) => {
  const checkInData = getCheckedInData();
  Storage.setItem(CHECK_IN_HISTORY, [...checkInData, id]);
};

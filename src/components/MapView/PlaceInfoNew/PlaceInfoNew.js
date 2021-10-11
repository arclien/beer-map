import React, { useEffect, useState } from 'react';
import { DesignedModal } from 'remember-ui';

import useGoogleSheet from 'hooks/useGoogleSheet';
import { USER_EMAIL } from 'constants/user';
import { MobileModal } from 'components/MobileModal/MobileModal';
import { Storage } from 'services/storage';
import { KakaoPlaceUrl } from 'constants/kakaoMap';
import { browserOpen } from 'utils/utils';
import useMobileDetect from 'hooks/useMobileDetect';
import NewPlaceForm from '../NewPlaceForm/NewPlaceForm';
import { errorToast, customToast } from 'utils/toast';
import { getTodayDate } from 'utils/day';

import {
  Container,
  Row,
  Title,
  MapLink,
  Address,
  Phone,
  AddPlaceButton,
} from './PlaceInfoNew.styles';

const DefaultValue = {
  score: 10,
  drink: 'beer',
  food: 'pizza',
  category: 'american',
  timestamp: getTodayDate('YY-MM-DD'),
  parking: '',
  service: '',
  user: '',
};

const PlaceInfoNew = ({ currentPlaceInfo, setCurrentPlaceInfo }) => {
  const [placeInfo, setPlaceInfo] = useState({ ...currentPlaceInfo });

  const [isLoading, setLoading] = useState(false);
  const [isAddNewPlaceModalOpen, setIsAddNewPlaceModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...DefaultValue });

  const { addNewMapDataToSheet } = useGoogleSheet();
  const isMobile = useMobileDetect();

  const handleFormData = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateBeforSubmit = () => {
    if (!formData.user) {
      errorToast('이메일 주소를 입력해주세요');
      return false;
    }
    return true;
  };

  const createPayload = () => {
    const payload = {
      ...formData,
      ...currentPlaceInfo,
    };
    delete payload.isNewPlace;

    return payload;
  };

  const onSubmit = async () => {
    if (!validateBeforSubmit()) return;
    const payload = createPayload();

    try {
      setLoading(true);
      Storage.setItem(USER_EMAIL, payload.user);
      const res = await addNewMapDataToSheet(payload);
      if (res) {
        customToast('생성되었습니다');
      } else {
        throw new Error('실패');
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setIsAddNewPlaceModalOpen(false);
      setFormData({ ...DefaultValue });
      setLoading(false);
    }
  };

  const { name, address, phone, kakaoId, isNewPlace = false } = placeInfo;

  useEffect(() => {
    setPlaceInfo(currentPlaceInfo);
  }, [currentPlaceInfo]);

  return (
    <Container>
      <Row>
        <Title>{name}</Title>
        {kakaoId && (
          <MapLink
            onClick={() => {
              browserOpen(`${KakaoPlaceUrl}${kakaoId}`);
            }}
          >
            카카오맵에서 보기
          </MapLink>
        )}
      </Row>

      {address && (
        <Row>
          <Address>{address}</Address>
        </Row>
      )}

      {phone && (
        <Row>
          <Phone href={`tel:${phone}`}>{phone}</Phone>
        </Row>
      )}

      <AddPlaceButton
        onClick={async () => {
          // const { id, status } = await getPlaceExist({ kakaoId });
          // if (status) {
          //   customToast(`${name}은 이미 추가 되어있습니다!`);
          //   const data = await getPlaceInfoById(id);
          //   setCurrentPlaceInfo(data);
          // } else {
          //   setIsAddNewPlaceModalOpen(true);
          // }
          setIsAddNewPlaceModalOpen(true);
        }}
      >
        장소 추가
      </AddPlaceButton>

      {isMobile && (
        <MobileModal
          isOpen={isAddNewPlaceModalOpen}
          title="새로운 장소 추가"
          submitText="등록하기"
          submit={onSubmit}
          onClose={() => setIsAddNewPlaceModalOpen(false)}
          isLoading={isLoading}
          bodyScrollLockTargetId="placeModalScrollLockTarget"
        >
          <NewPlaceForm
            id="placeModalScrollLockTarget"
            placeInfo={currentPlaceInfo}
            formData={formData}
            handleFormData={handleFormData}
          />
        </MobileModal>
      )}

      {!isMobile && (
        <DesignedModal
          isOpen={isAddNewPlaceModalOpen}
          title="새로운 장소 추가"
          submitText="장소 추가"
          subTitle={currentPlaceInfo?.name}
          submit={onSubmit}
          close={() => setIsAddNewPlaceModalOpen(false)}
          onClose={() => setIsAddNewPlaceModalOpen(false)}
          isLoading={isLoading}
        >
          <NewPlaceForm
            placeInfo={currentPlaceInfo}
            formData={formData}
            handleFormData={handleFormData}
          />
        </DesignedModal>
      )}
    </Container>
  );
};

export default PlaceInfoNew;

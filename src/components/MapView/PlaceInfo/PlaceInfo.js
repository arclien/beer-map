import React, { useEffect, useState } from 'react';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { USER_EMAIL } from 'constants/user';
import { Storage } from 'services/storage';
import { hasCheckedInById } from 'utils/CheckedIn.utils';
import PlaceKakaoView from '../PlaceKakaoView/PlaceKakaoView';
import PlaceNaverView from '../PlaceNaverView/PlaceNaverView';
import { errorToast } from 'utils/toast';
import { browserOpen } from 'utils/utils';
import useGoogleSheet from 'hooks/useGoogleSheet';

import {
  Container,
  Info,
  InfoBody,
  Row,
  Title,
  Text,
  Header,
  ExpandIcon,
  Logo,
  CheckIn,
} from './PlaceInfo.styles';

import MacDuck from 'assets/images/macduck.png';

const PlaceInfo = ({ currentPlaceInfo }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({ ...currentPlaceInfo });
  const [isKakaoMapView, setIsKakaoMapView] = useState(true);
  const { addCheckInDataToSheet } = useGoogleSheet();

  const { name, address, url, kakaoId, naverId } = placeInfo;

  useEffect(() => {
    setPlaceInfo(currentPlaceInfo);
  }, [currentPlaceInfo]);

  const hasCheckedIn = hasCheckedInById(kakaoId);
  const checkIn = () => {
    const email = Storage.getItem(USER_EMAIL);
    const checkInData = { drink: '', food: '', tag: '', user: '', note: '' };
    addCheckInDataToSheet(email, placeInfo, checkInData);
  };
  return (
    <Container isExpanded={isExpanded}>
      <Info>
        {kakaoId && (
          <ExpandIcon
            onClick={() => {
              if (kakaoId) {
                setExpanded(!isExpanded);
              } else {
                errorToast('정보가 없습니다');
              }
            }}
          >
            <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronUp} />
          </ExpandIcon>
        )}
        {hasCheckedIn && <Logo src={MacDuck} alt="Beer" />}
        {!hasCheckedIn && <CheckIn onClick={() => checkIn()}>체크인</CheckIn>}

        <InfoBody isExpanded={isExpanded}>
          <Row>
            <Header>{name}</Header>
          </Row>

          <Row>
            <Title>주소</Title>
            <Text>{address}</Text>
          </Row>

          {url && (
            <Row>
              <Title>링크</Title>
              <Text onClick={() => browserOpen(url)}>{url}</Text>
            </Row>
          )}

          {kakaoId && naverId && isExpanded && (
            <Row>
              <Title onClick={() => setIsKakaoMapView(!isKakaoMapView)}>
                {isKakaoMapView ? '네이버' : '카카오'}맵으로 전환
              </Title>
            </Row>
          )}

          {kakaoId && isExpanded && isKakaoMapView && (
            <Row>
              <PlaceKakaoView currentPlaceInfo={currentPlaceInfo} />
            </Row>
          )}
          {naverId && isExpanded && !isKakaoMapView && (
            <Row>
              <PlaceNaverView currentPlaceInfo={currentPlaceInfo} />
            </Row>
          )}
        </InfoBody>
      </Info>
    </Container>
  );
};

export default PlaceInfo;

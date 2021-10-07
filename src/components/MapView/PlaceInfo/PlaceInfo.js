import React, { useEffect, useState } from 'react';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasCheckedInById } from 'utils/CheckedIn.utils';
import PlaceKakaoView from '../PlaceKakaoView/PlaceKakaoView';
import PlaceNaverView from '../PlaceNaverView/PlaceNaverView';
import { errorToast } from 'utils/toast';
import { browserOpen } from 'utils/utils';

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
  NewPlace,
} from './PlaceInfo.styles';

import LogoSupportLocal from 'assets/images/logo-support-local.png';

const PlaceInfo = ({ currentPlaceInfo }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({ ...currentPlaceInfo });
  const [isKakaoMapView, setIsKakaoMapView] = useState(true);

  const { name, address, url, kakaoId, naverId, isNewPlace } = placeInfo;

  useEffect(() => {
    setPlaceInfo(currentPlaceInfo);
  }, [currentPlaceInfo]);

  const hasCheckedIn = hasCheckedInById(kakaoId);

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
        {hasCheckedIn && <Logo src={LogoSupportLocal} alt="Support Local" />}

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

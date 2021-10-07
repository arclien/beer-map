import React, { useEffect, useState } from 'react';
import {
  faChevronUp,
  faChevronDown,
  faBeer,
  faWineBottle,
  faWineGlass,
  faCocktail,
  faPizzaSlice,
  faHamburger,
  faFish,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasCheckedInById } from 'utils/CheckedIn.utils';
import PlaceKakaoView from '../PlaceKakaoView/PlaceKakaoView';
import PlaceNaverView from '../PlaceNaverView/PlaceNaverView';
import { errorToast } from 'utils/toast';
import { browserOpen } from 'utils/utils';
import { FOOD, DRINK } from 'utils/Text.utils';

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
  Icons,
} from './PlaceInfo.styles';

import MacDuck from 'assets/images/macduck.png';

const PlaceInfo = ({ currentPlaceInfo }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({ ...currentPlaceInfo });
  const [isKakaoMapView, setIsKakaoMapView] = useState(true);

  const { name, address, url, kakaoId, naverId, drink, food } = placeInfo;

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
        {hasCheckedIn && <Logo src={MacDuck} alt="Beer" />}

        <Icons>
          {drink === 'beer' && <FontAwesomeIcon icon={faBeer} size="2x" />}
          {drink === 'soju' && (
            <FontAwesomeIcon icon={faWineBottle} size="2x" />
          )}
          {drink === 'wine' && <FontAwesomeIcon icon={faWineGlass} size="2x" />}
          {drink === 'shot' && <FontAwesomeIcon icon={faCocktail} size="2x" />}
          {(drink === 'sake' || drink === 'makgeolli') && DRINK[drink]}

          {food === 'pizza' && (
            <FontAwesomeIcon icon={faPizzaSlice} size="2x" />
          )}
          {food === 'hamburger' && (
            <FontAwesomeIcon icon={faHamburger} size="2x" />
          )}
          {food === 'japanese' && <FontAwesomeIcon icon={faFish} size="2x" />}

          {(food === 'meat' || food === 'american' || food === 'chicken') &&
            FOOD[food]}
        </Icons>

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

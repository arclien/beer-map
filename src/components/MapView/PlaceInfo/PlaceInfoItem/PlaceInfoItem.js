import React from 'react';
import { BaseTooltip } from 'remember-ui';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Container,
  Half,
  Title,
  Value,
  TooltipWrapper,
} from './PlaceInfoItem.styles';

const PlaceInfoItem = ({
  title1,
  value1,
  tooltip1 = undefined,
  title2,
  value2,
  tooltip2 = undefined,
}) => {
  return (
    <Container>
      <Half isFull={!title2}>
        {tooltip1 && (
          <BaseTooltip
            theme="dcdark"
            size="medium"
            content={tooltip1}
            placement="top"
            customComponent={
              <TooltipWrapper>
                <Title>{title1}</Title>
                <FontAwesomeIcon icon={faInfoCircle} />
              </TooltipWrapper>
            }
          />
        )}
        {!tooltip1 && <Title>{title1}</Title>}
        <Value>{value1 || '정보 없음'}</Value>
      </Half>
      {title2 && (
        <Half>
          {tooltip2 && (
            <BaseTooltip
              theme="dcdark"
              size="medium"
              content={tooltip2}
              placement="top"
              customComponent={
                <TooltipWrapper>
                  <Title>{title2}</Title>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </TooltipWrapper>
              }
            />
          )}
          {!tooltip2 && <Title>{title2}</Title>}
          <Value>{value2 || '정보 없음'}</Value>
        </Half>
      )}
    </Container>
  );
};

export default PlaceInfoItem;

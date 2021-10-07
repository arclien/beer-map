import React from 'react';

import { DRINK, FOOD } from 'utils/Text.utils';

import {
  Container,
  Row,
  RowTop,
  Title,
  Text,
  Required,
  RadioBox,
} from './RadioButton.styles';

const RadioButton = ({
  title,
  required,
  value,
  formKey,
  onClickRadio,
  radionOptions,
}) => {
  return (
    <Container>
      <RowTop>
        <Title>{title}</Title>
        {required && <Required>*</Required>}
      </RowTop>
      <Row>
        {radionOptions &&
          radionOptions.map((option) => {
            return (
              <RadioBox
                key={option}
                isChecked={value === option}
                onClick={() => onClickRadio(formKey, option)}
              >
                <Text>
                  {formKey === 'drink' ? DRINK[option] : FOOD[option]}
                </Text>
              </RadioBox>
            );
          })}
      </Row>
    </Container>
  );
};

export default RadioButton;

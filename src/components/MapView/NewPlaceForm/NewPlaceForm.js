import React, { useEffect } from 'react';

import {
  SCORE,
  DRINK,
  FOOD,
  CATEGORY,
  SERVICE,
  PARKING,
} from 'utils/Text.utils';
import { USER_EMAIL } from 'constants/user';
import { Storage } from 'services/storage';
import RadioButton from './RadioButton/RadioButton';

import { Container, Row, Input, SelectBox } from './NewPlaceForm.styles';

const NewPlaceForm = ({ placeInfo, formData, handleFormData }) => {
  const { name, latitude, longitude, kakaoId, address, phone, isNewPlace } =
    placeInfo;

  useEffect(() => {
    if (!formData.user) {
      const email = Storage.getItem(USER_EMAIL);
      if (email) handleFormData('user', email);
    }
  }, [formData.user, handleFormData]);

  return (
    <Container>
      <Row>
        <Input label="카페이름" required readonly value={name} />
      </Row>
      <Row>
        <Input label="위치" required readonly value={address} />
      </Row>

      <Row>
        <Input
          required
          label="작성자 이메일"
          placeholder=" 작성자이메일"
          value={formData.user}
          onChange={(e) => {
            handleFormData('user', e.target.value);
          }}
        />
      </Row>

      <Row>
        <SelectBox
          required
          className="not-draggable"
          label="평점"
          value={formData.score || 10}
          onChange={(e) => {
            handleFormData('score', e);
          }}
          options={SCORE}
        />
      </Row>

      <Row>
        <RadioButton
          title="음료"
          required
          value={formData.drink}
          formKey="drink"
          onClickRadio={handleFormData}
          radioOptions={DRINK}
        />
      </Row>
      <Row>
        <RadioButton
          title="카테고리"
          required
          value={formData.category}
          formKey="category"
          onClickRadio={handleFormData}
          radioOptions={CATEGORY}
        />
      </Row>
      <Row>
        <RadioButton
          title="음식"
          required
          value={formData.food}
          formKey="food"
          onClickRadio={handleFormData}
          radioOptions={FOOD}
        />
      </Row>

      <Row>
        <RadioButton
          title="서비스"
          value={formData.service}
          formKey="service"
          onClickRadio={handleFormData}
          radioOptions={SERVICE}
        />
      </Row>

      <Row>
        <RadioButton
          title="주차"
          value={formData.parking}
          formKey="parking"
          onClickRadio={handleFormData}
          radioOptions={PARKING}
        />
      </Row>

      <Row>
        <Input label="연락처" value={phone} />
      </Row>
    </Container>
  );
};

export default NewPlaceForm;

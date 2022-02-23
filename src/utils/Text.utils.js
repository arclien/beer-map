// 평점
export const SCORE = Array(10)
  .fill()
  .map((_, i) => {
    return { id: i + 1, label: `${i + 1}점`, value: i + 1 };
  })
  .sort((a, b) => b.value - a.value);

export const CATEGORY = {
  american: '양식',
  japanese: '일식',
  chinese: '중식',
  korean: '한식',
  pub: '펍',
  bottleshop: '바틀샵',
  brewery: '브루어리',
  bakery: '베이커리',
  dessert: '디저트',
  etc: '그 외',
};

export const DRINK = {
  beer: '맥주',
  soju: '소주',
  sake: '사케',
  wine: '와인',
  makgeolli: '막걸리',
  shot: '샷',
  coffee: '커피',
  etc: '그 외',
};

export const FOOD = {
  pizza: '피자',
  hamburger: '햄버거',
  chicken: '치킨',
  beef: '소고기',
  pork: '돼지고기',
  lamb: '양고기',
  intestine: '곱창',
  rawfish: '회',
  jeon: '전류',
  appetizer: '안주',
  bread: '빵',
  soup: '국물/탕',
};

export const SERVICE = {
  corkagecharge: '콜키지 차지',
  corkagefree: '콜키지 프리',
  terrace: '테라스',
  rooftop: '루프탑',
  reservation: '예약',
  takeoutonly: '테이크아웃만',
};

export const PARKING = {
  free: '무료',
  charge: '유료',
  valet: '발렛',
  no: '불가',
};

export const PLACE = {
  seoul: '서울',
  gyeonggi: '경기도',
  incheon: '인천',
  busan: '부산',
  jeju: '제주',
  kangwon: '강원도',
}
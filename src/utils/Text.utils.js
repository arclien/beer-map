// 평점
export const SCORE = Array(10)
  .fill()
  .map((_, i) => {
    return { id: i + 1, label: `${i + 1}점`, value: i + 1 };
  })
  .sort((a, b) => b.value - a.value);

export const DRINK = {
  beer: '맥주',
  soju: '소주',
  sake: '사케',
  wine: '와인',
  makgeolli: '막걸리',
  shot: '샷',
  etc: '그 외',
};

export const FOOD = {
  pizza: '피자',
  hamburger: '햄버거',
  meat: '고기',
  american: '아메리칸',
  japanese: '일식',
  chicken: '치킨',
  etc: '그 외',
};

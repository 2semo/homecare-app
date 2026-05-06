// ─────────────────────────────────────────────────────────────────────────────
// 홈케어 서비스 가격표
// 기준: 2026년 5월
// 담당: 롯데하이마트 안산선부 031-483-7400
//
// ※ 매월 가격 변동 시 이 파일만 수정하면 앱에 자동 반영됩니다.
//   각 서비스 ID 옆의 price / priceNote 값만 변경하세요.
// ─────────────────────────────────────────────────────────────────────────────

export const PRICE_UPDATED = '2026년 5월';

export interface PriceInfo {
  price: string;
  priceNote?: string;
}

export const PRICES: Record<string, PriceInfo> = {

  // ═══════════════════════════════════════
  // 가전 클리닝
  // ═══════════════════════════════════════

  'aircon-wall': {
    price: '105,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'aircon-stand': {
    price: '162,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'washer-drum': {
    price: '196,000원~',
    priceNote: '트윈워시 242,000원 / 아기세탁기 110,000원',
  },
  'washer-top': {
    price: '99,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'refrigerator': {
    price: '169,000원~',
    priceNote: '4도어 기준 / 제품 크기에 따라 상이',
  },
  'dryer': {
    price: '100,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'range-hood': {
    price: '118,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'air-purifier': {
    price: '88,000원~',
    priceNote: '1대 기준 / 대수에 따라 상이',
  },
  'bidet': {
    price: '55,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'kimchi-fridge': {
    price: '169,000원~',
    priceNote: '제품 크기에 따라 상이',
  },
  'dishwasher': {
    price: '88,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'styler': {
    price: '88,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'massage-chair': {
    price: '163,000원~',
    priceNote: '제품 크기·사양에 따라 상이',
  },
  'range': {
    price: '88,000원~',
    priceNote: '제품 사양에 따라 상이',
  },
  'oven': {
    price: '88,000원~',
    priceNote: '제품 사양에 따라 상이',
  },

  // ═══════════════════════════════════════
  // 홈 클리닝
  // ═══════════════════════════════════════

  'move-in-clean': {
    price: '별도 견적',
    priceNote: '평수·청소 범위에 따라 상이 — 전화 상담 후 확정',
  },
  'packing-move': {
    price: '별도 견적',
    priceNote: '이사 규모·거리에 따라 상이 — 전화 상담 후 확정',
  },
  'boiler-clean': {
    price: '135,000원~',
    priceNote: '25평 이하 기준 / 평수에 따라 상이',
  },
  'water-pipe-clean': {
    price: '135,000원~',
    priceNote: '기본 기준 / 배관 규모에 따라 상이',
  },
  'custom-storage': {
    price: '별도 견적',
    priceNote: '크기·재질·설치 공간에 따라 상이 — 전화 상담 후 확정',
  },
  'mattress': {
    price: '별도 견적',
    priceNote: '매트리스 크기에 따라 상이',
  },
  'new-house': {
    price: '별도 견적',
    priceNote: '평수에 따라 상이',
  },

  // ═══════════════════════════════════════
  // 이전·설치
  // ═══════════════════════════════════════

  'aircon-move': {
    price: '45,000원~',
    priceNote: '벽걸이 기준 / 평수·거리에 따라 상이',
  },
  'washer-move': {
    price: '31,000원~',
    priceNote: '거리·층수에 따라 상이',
  },
  'fridge-move': {
    price: '30,000원~',
    priceNote: '거리·층수에 따라 상이',
  },
  'tv-move': {
    price: '67,000원~',
    priceNote: '50인치 이하 이전 기준 / 크기·설치 방식에 따라 상이',
  },
  'no-drill-mount': {
    price: '66,000원~',
    priceNote: 'TV 크기·설치 환경에 따라 상이',
  },
  'safety-screen': {
    price: '10,000원~/개',
    priceNote: '창문 크기·수량에 따라 상이',
  },
  'blacksten-screen': {
    price: '별도 견적',
    priceNote: '창문 크기·수량에 따라 상이 — 전화 상담 후 확정',
  },
  'glass-railing': {
    price: '별도 견적',
    priceNote: '시공 길이·유리 사양에 따라 상이 — 전화 상담 후 확정',
  },
  'heat-film': {
    price: '별도 견적',
    priceNote: '유리 면적·필름 등급에 따라 상이 — 온라인 견적 후 확정',
  },

  // ═══════════════════════════════════════
  // 층간소음
  // ═══════════════════════════════════════

  'noise-mat': {
    price: '별도 견적',
    priceNote: '시공 면적·매트 등급에 따라 상이 — 온라인 견적 후 확정',
  },
};

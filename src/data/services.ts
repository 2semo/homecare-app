import type { Service } from '../types/service';

// 개발사: 롯데하이마트 안산선부 | 연락처: 031-483-7400
// 가격 기준: 2026년 5월 안심케어서비스 조건표
const PHONE = '0314837400';

export const SERVICES: Service[] = [
  // ─────────────────────────────────────────
  // 가전 클리닝
  // ─────────────────────────────────────────
  {
    id: 'aircon-wall',
    name: '에어컨 클리닝 (벽걸이·창문형)',
    category: '가전클리닝',
    keywords: ['에어컨', '냉방기', '에어콘', '벽걸이', '창문형', 'PAC'],
    price: '105,000원~',
    priceNote: '제품 사양에 따라 상이',
    duration: '약 1시간',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '필터·열교환기 내부까지 고압 스팀 클리닝',
      '살균·탈취로 세균 99.9% 제거',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 시간 약속을 지켜 방문합니다' },
      { step: 3, label: '분해 클리닝', desc: '필터·열교환기를 고압 스팀으로 꼼꼼히 세척합니다' },
      { step: 4, label: '완료 확인', desc: '작동 테스트 후 청소 완료를 확인합니다' },
    ],
    reason:
      '에어컨 내부는 세균·곰팡이가 번식하기 쉬운 환경입니다. 정기 클리닝으로 쾌적한 냉방과 가족 건강을 지키세요.',
    isPopular: true,
    iconName: 'air-conditioner',
  },
  {
    id: 'aircon-stand',
    name: '에어컨 클리닝 (스탠드형)',
    category: '가전클리닝',
    keywords: ['에어컨', '스탠드', '스탠드에어컨', '냉방기', '프리미엄'],
    price: '162,000원~',
    priceNote: '제품 사양에 따라 상이',
    duration: '약 1시간 30분',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '대형 스탠드 전용 분해 클리닝',
      '살균·탈취로 세균 99.9% 제거',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 시간 약속을 지켜 방문합니다' },
      { step: 3, label: '분해 클리닝', desc: '전면 패널부터 내부 구석까지 고압 스팀으로 세척합니다' },
      { step: 4, label: '완료 확인', desc: '작동 테스트 후 청소 완료를 확인합니다' },
    ],
    reason:
      '스탠드형은 내부 면적이 넓어 먼지·세균이 더 많이 쌓입니다. 전문 분해 클리닝으로 성능과 위생을 함께 회복하세요.',
    isPopular: true,
    iconName: 'air-conditioner',
  },
  {
    id: 'washer-drum',
    name: '세탁기 클리닝 (드럼)',
    category: '가전클리닝',
    keywords: ['세탁기', '드럼세탁기', '드럼', '빌트인'],
    price: '196,000원~',
    priceNote: '트윈워시 242,000원 / 아기세탁기 110,000원',
    duration: '약 1시간 30분',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '드럼·개스킷 완전 분해 고압 세척',
      '세제 찌꺼기·세균·악취 완전 제거',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '분해 클리닝', desc: '드럼·개스킷·필터를 분해해 고압 세척합니다' },
      { step: 4, label: '완료 확인', desc: '작동 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '드럼 내부에 쌓인 세제 찌꺼기와 세균이 악취의 원인입니다. 클리닝으로 의류 위생과 세탁 효율을 되찾으세요.',
    iconName: 'washing-machine',
  },
  {
    id: 'washer-top',
    name: '세탁기 클리닝 (통돌이)',
    category: '가전클리닝',
    keywords: ['세탁기', '통돌이', '일반세탁기'],
    price: '99,000원~',
    priceNote: '제품 사양에 따라 상이',
    duration: '약 1시간',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '세탁조 분리 고압 세척',
      '세균·곰팡이·악취 원인 제거',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '세탁조 분해', desc: '세탁조를 분리해 구석까지 고압 세척합니다' },
      { step: 4, label: '완료 확인', desc: '작동 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '눈에 보이지 않는 세탁조 뒷면에 세균과 곰팡이가 번식합니다. 클리닝으로 의류를 더 깨끗하게 세탁하세요.',
    isPopular: true,
    iconName: 'washing-machine',
  },
  {
    id: 'refrigerator',
    name: '냉장고 클리닝',
    category: '가전클리닝',
    keywords: ['냉장고', '냉장', '냉동', '4도어', '양문형'],
    price: '169,000원~',
    priceNote: '4도어 기준 / 제품 크기에 따라 상이',
    duration: '약 1시간',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '냉각 시스템·서랍 분해 세척',
      '성에 제거 및 냉각 효율 향상',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '냉각 시스템 클리닝', desc: '냉각기·선반·서랍을 분리해 세척합니다' },
      { step: 4, label: '완료 확인', desc: '냉각 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '냉장고 내부의 세균과 냄새를 제거하고 냉각 효율을 회복해 전기세를 절약하세요.',
    iconName: 'fridge-outline',
  },
  {
    id: 'dryer',
    name: '건조기 클리닝',
    category: '가전클리닝',
    keywords: ['건조기', '드럼건조기', '빨래건조'],
    price: '100,000원~',
    priceNote: '제품 사양에 따라 상이',
    duration: '약 1시간',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '필터·열교환기 전문 클리닝',
      '화재 원인 린트 완전 제거',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '내부 클리닝', desc: '필터·열교환기를 전문 장비로 세척합니다' },
      { step: 4, label: '완료 확인', desc: '작동 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '건조기 내부에 쌓인 린트(보풀)는 화재의 주요 원인입니다. 정기 클리닝으로 안전하게 사용하세요.',
    iconName: 'tumble-dryer',
  },
  {
    id: 'range-hood',
    name: '레인지후드 클리닝',
    category: '가전클리닝',
    keywords: ['레인지후드', '후드', '주방후드', '환풍기', '가스레인지'],
    price: '118,000원~',
    priceNote: '제품 사양에 따라 상이',
    duration: '약 1시간',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '필터·내부 기름때 완전 분해 세척',
      '환기 성능 회복 및 악취 제거',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '분해 세척', desc: '필터·팬·내부를 분리해 기름때를 완전 제거합니다' },
      { step: 4, label: '완료 확인', desc: '환기 성능 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '레인지후드에 쌓인 기름때는 화재 위험과 악취의 원인입니다. 정기 클리닝으로 주방 환경을 쾌적하게 유지하세요.',
    iconName: 'stove',
  },
  {
    id: 'air-purifier',
    name: '공기청정기 클리닝',
    category: '가전클리닝',
    keywords: ['공기청정기', '공청기', '공기정화', '필터'],
    price: '88,000원~',
    priceNote: '1대 기준 / 대수에 따라 상이',
    duration: '약 30분',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '필터·내부 살균 클리닝',
      '공기 청정 효율 완전 회복',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '필터·내부 세척', desc: '필터와 내부를 세척·살균합니다' },
      { step: 4, label: '완료 확인', desc: '작동 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '더러워진 필터와 내부는 오히려 공기를 오염시킵니다. 전문 클리닝으로 공기청정기 본연의 성능을 되찾으세요.',
    iconName: 'air-purifier',
  },
  {
    id: 'bidet',
    name: '비데 클리닝',
    category: '가전클리닝',
    keywords: ['비데', '변기', '화장실', '욕실'],
    price: '55,000원~',
    priceNote: '제품 사양에 따라 상이',
    duration: '약 30분',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '노즐·내부 살균 클리닝',
      '수질 관련 부품 점검',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '노즐·내부 세척', desc: '노즐과 내부를 분리해 살균 클리닝합니다' },
      { step: 4, label: '완료 확인', desc: '작동 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '비데 노즐에는 세균이 번식하기 쉽습니다. 정기적인 클리닝으로 위생적인 환경을 유지하세요.',
    iconName: 'toilet',
  },
  {
    id: 'kimchi-fridge',
    name: '김치냉장고 클리닝',
    category: '가전클리닝',
    keywords: ['김치냉장고', '김치', '김치고'],
    price: '169,000원~',
    priceNote: '제품 크기에 따라 상이',
    duration: '약 1시간',
    phone: PHONE,
    warranty: '서비스 후 1년 가전 수리 보증',
    highlights: [
      '냉각 시스템·내부 완전 분해 세척',
      '김치 냄새·세균 완전 제거',
      '서비스 후 1년 가전 수리 보증 포함',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '내부 분해 클리닝', desc: '서랍·선반·냉각기를 분리해 세척합니다' },
      { step: 4, label: '완료 확인', desc: '냉각 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '김치냉장고 내부의 냄새와 세균은 김치 맛에도 영향을 줍니다. 정기 클리닝으로 최적의 보관 환경을 유지하세요.',
    iconName: 'fridge',
  },

  // ─────────────────────────────────────────
  // 홈 클리닝
  // ─────────────────────────────────────────
  {
    id: 'mattress',
    name: '매트리스 클리닝',
    category: '홈클리닝',
    keywords: ['매트리스', '침대', '침구', '진드기'],
    price: '별도 견적',
    priceNote: '매트리스 크기에 따라 상이',
    duration: '약 1시간',
    phone: PHONE,
    highlights: [
      '전용 흡입 장비로 진드기·먼지 제거',
      'UV 살균으로 세균 99% 제거',
      '당일 완료',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '방문 일시를 안내드립니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문합니다' },
      { step: 3, label: '스팀·흡입 클리닝', desc: '전용 장비로 표면부터 내부까지 살균·클리닝합니다' },
      { step: 4, label: '완료 확인', desc: '건조 확인 후 완료를 확인합니다' },
    ],
    reason:
      '매트리스에는 집먼지 진드기와 각질이 쌓입니다. 정기 클리닝으로 건강한 수면 환경을 만드세요.',
    iconName: 'bed-outline',
  },
  {
    id: 'new-house',
    name: '새집증후군 처리',
    category: '홈클리닝',
    keywords: ['새집증후군', '새집', '입주', '포름알데히드', '유해물질'],
    price: '별도 견적',
    priceNote: '평수에 따라 상이',
    duration: '별도 협의',
    phone: PHONE,
    highlights: [
      '유해물질·VOC 제거 전문 처리',
      '입주 전 안심 환경 조성',
      '처리 후 공기질 측정 제공',
    ],
    process: [
      { step: 1, label: '상담 예약', desc: '평수와 환경을 상담 후 일정을 잡습니다' },
      { step: 2, label: '전문가 방문', desc: 'CS마스터가 방문해 공기질을 측정합니다' },
      { step: 3, label: '유해물질 처리', desc: '전문 장비로 VOC·포름알데히드를 제거합니다' },
      { step: 4, label: '완료 확인', desc: '처리 후 공기질을 다시 측정해 확인합니다' },
    ],
    reason:
      '새 건물의 마감재·가구에서 발생하는 유해물질은 두통·눈 따가움의 원인입니다. 입주 전 전문 처리로 안심 환경을 만드세요.',
    iconName: 'home-outline',
  },

  // ─────────────────────────────────────────
  // 이전·설치
  // ─────────────────────────────────────────
  {
    id: 'aircon-move',
    name: '에어컨 이전설치',
    category: '이전설치',
    keywords: ['에어컨 이전', '에어컨 설치', '이사', '이전설치', '에어컨 이사'],
    price: '45,000원~',
    priceNote: '벽걸이 기준 / 평수·거리에 따라 상이',
    duration: '약 1~2시간',
    phone: PHONE,
    highlights: [
      '전문 기사 안전 이전·재설치',
      '냉매 보충 및 작동 테스트',
      '설치 후 이상 시 AS 지원',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '이전 일시와 장소를 안내드립니다' },
      { step: 2, label: '기존 제거', desc: '기존 위치에서 안전하게 분리합니다' },
      { step: 3, label: '신규 설치', desc: '새 위치에 전문 기사가 안전하게 설치합니다' },
      { step: 4, label: '완료 확인', desc: '냉방 작동 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '에어컨 이전설치는 냉매 처리와 배관 작업이 필요합니다. 직접 이전하면 냉매 누출 및 고장 위험이 있으니 전문가에게 맡기세요.',
    iconName: 'truck-outline',
  },
  {
    id: 'washer-move',
    name: '세탁기 이전설치',
    category: '이전설치',
    keywords: ['세탁기 이전', '세탁기 설치', '이사', '이전설치'],
    price: '31,000원~',
    priceNote: '거리·층수에 따라 상이',
    duration: '약 30분',
    phone: PHONE,
    highlights: [
      '전문 기사 수평 설치',
      '급수·배수 연결 및 테스트',
      '설치 후 이상 시 AS 지원',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '이전 일시와 장소를 안내드립니다' },
      { step: 2, label: '기존 분리', desc: '급수·배수 배관을 안전하게 분리합니다' },
      { step: 3, label: '신규 설치', desc: '수평 맞춤 후 급수·배수를 연결합니다' },
      { step: 4, label: '완료 확인', desc: '작동 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '세탁기 수평이 맞지 않으면 소음·진동이 심해지고 고장의 원인이 됩니다. 전문가에게 맡기세요.',
    iconName: 'truck-outline',
  },
  {
    id: 'fridge-move',
    name: '냉장고 이전설치',
    category: '이전설치',
    keywords: ['냉장고 이전', '냉장고 설치', '이사'],
    price: '30,000원~',
    priceNote: '거리·층수에 따라 상이',
    duration: '약 30분',
    phone: PHONE,
    highlights: [
      '전문 기사 안전 운반·설치',
      '수평 조절 및 작동 테스트',
      '설치 후 이상 시 AS 지원',
    ],
    process: [
      { step: 1, label: '예약 확인', desc: '이전 일시와 장소를 안내드립니다' },
      { step: 2, label: '안전 운반', desc: '전문 기사가 안전하게 운반합니다' },
      { step: 3, label: '설치·수평 조절', desc: '냉장고를 설치하고 수평을 맞춥니다' },
      { step: 4, label: '완료 확인', desc: '냉각 테스트 후 완료를 확인합니다' },
    ],
    reason:
      '대형 냉장고는 혼자 이전하기 어렵고 바닥 손상 위험이 있습니다. 전문 기사에게 맡기면 안전하게 이전할 수 있습니다.',
    iconName: 'truck-outline',
  },
];

export const POPULAR_SERVICES = SERVICES.filter((s) => s.isPopular);

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

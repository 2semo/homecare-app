# 아키텍처

## 기술 스택
- **프레임워크**: React Native (Expo SDK 52, managed workflow)
- **언어**: TypeScript strict mode
- **내비게이션**: Expo Router v3 (파일 기반 라우팅)
- **스타일링**: StyleSheet API (NativeWind 없이 순수 RN 스타일)
- **데이터**: 로컬 정적 JSON — 외부 API·DB 없음
- **전화 연결**: expo-linking (`Linking.openURL`)
- **접근성**: React Native 기본 accessibilityLabel / accessibilityRole

## 디렉토리 구조
```
src/
├── app/
│   ├── _layout.tsx            # 루트 레이아웃 (SafeAreaProvider, 폰트 로드, 스플래시)
│   ├── (tabs)/
│   │   ├── _layout.tsx        # 하단 탭 바 레이아웃 (탭 2개 설정)
│   │   ├── index.tsx          # 홈 (인기 서비스 + 카테고리 탭 + 목록)
│   │   └── search.tsx         # 검색 화면
│   └── service/
│       └── [id].tsx           # 서비스 상세 페이지
├── components/
│   ├── ServiceCard.tsx        # 서비스 목록 카드 (세로 목록용)
│   ├── ServiceCardHorizontal.tsx  # 인기 서비스 가로 카드
│   ├── CategoryTab.tsx        # 카테고리 탭 바 (ScrollView 수평)
│   ├── CallButton.tsx         # 신청하기 (전화 연결) 버튼
│   ├── ConfirmModal.tsx       # 전화 전 확인 모달
│   ├── EmptyState.tsx         # 검색 결과 없음 / 서비스 없음 공통 빈 화면
│   ├── ProcessStep.tsx        # 진행 단계 세로 스텝 리스트
│   └── KeywordChip.tsx        # 추천 검색어 칩 (검색 화면)
├── data/
│   └── services.ts            # 정적 서비스 배열 + 검색 키워드
├── types/
│   └── service.ts             # Service, Category, ProcessStep 타입
├── lib/
│   ├── phone.ts               # tel: 링크 유틸리티 (canCall, makeCall, formatPhone)
│   └── search.ts              # 서비스 검색 필터 함수
└── constants/
    └── colors.ts              # 색상 토큰 (UI_GUIDE 값 코드화)
```

---

## 타입 정의

```typescript
// types/service.ts

export type Category = '가전클리닝' | '홈클리닝' | '이전설치';
export type CategoryFilter = Category | 'all';

export interface ProcessStep {
  step: number;
  label: string;   // "전문가 방문"
  desc: string;    // "CS마스터가 시간 약속을 지켜 방문합니다"
}

export interface Service {
  id: string;                  // URL-safe slug, 예: "aircon-wall"
  name: string;                // "에어컨 클리닝 (벽걸이)"
  category: Category;
  keywords: string[];          // 검색 보조 키워드, 예: ["에어컨", "냉방기", "에어콘"]
  price: string;               // "143,000원~" 또는 "별도 견적"
  priceNote?: string;          // "제품 사양에 따라 상이" — 없으면 미표시
  duration: string;            // "약 1시간"
  phone: string;               // 하이픈 없는 숫자만, 예: "15880000"
  warranty?: string;           // "서비스 후 1년 가전 수리 보증" — 없으면 보증 섹션 숨김
  highlights: string[];        // 핵심 혜택 (정확히 3개 권장)
  process: ProcessStep[];      // 진행 단계 (3~5단계)
  reason: string;              // 왜 해야 하는지 (2~3문장)
  isPopular?: boolean;         // 홈 화면 인기 섹션 노출 여부
  iconName: string;            // MaterialCommunityIcons 아이콘 이름
}

// EmptyState 컴포넌트 props
export interface EmptyStateProps {
  message: string;
  subMessage?: string;
  actionLabel?: string;
  onAction?: () => void;
}
```

---

## 탭 바 설정 (`(tabs)/_layout.tsx`)

```typescript
// (tabs)/_layout.tsx 설정 명세
tabs: [
  {
    name: 'index',
    title: '홈',
    tabBarIcon: 'home',           // MaterialCommunityIcons
    tabBarIconFocused: 'home',
  },
  {
    name: 'search',
    title: '검색',
    tabBarIcon: 'magnify',
    tabBarIconFocused: 'magnify',
  },
]

tabBarStyle: {
  backgroundColor: '#FFFFFF',
  borderTopColor: '#E5E7EB',
  borderTopWidth: 1,
  height: 56 + SafeArea.bottom,
}

tabBarActiveTintColor: '#0064D2'
tabBarInactiveTintColor: '#AAAAAA'
tabBarLabelStyle: { fontSize: 11, fontWeight: '500' }
```

---

## 패턴
- 화면 컴포넌트는 `app/` 에만, 재사용 UI는 `components/` 에 분리
- 서비스 데이터는 `data/services.ts` 단일 파일 — 외부에서 `import` 해서 쓴다
- 비즈니스 로직은 `lib/` 에 순수 함수로 분리 — 컴포넌트에 인라인 로직 금지
- 색상은 컴포넌트에 하드코딩 금지 — `constants/colors.ts` 토큰만 참조

---

## 데이터 흐름

```
services.ts (정적 배열)
  │
  ├─→ 홈 화면 (index.tsx)
  │     ├─ isPopular 필터 → 인기 서비스 가로 FlatList
  │     └─ selectedCategory 필터 → 세로 FlatList
  │           └─ 카드 탭 → router.push('/service/[id]')
  │
  ├─→ 검색 화면 (search.tsx)
  │     ├─ query === '' → 추천 키워드 KeywordChip 표시
  │     └─ lib/search.ts filterServices(query) → 세로 FlatList
  │           └─ 카드 탭 → Keyboard.dismiss() → router.push('/service/[id]')
  │
  └─→ 상세 페이지 (service/[id].tsx)
        ├─ services.find(s => s.id === params.id)
        │     ├─ 찾음: 상세 정보 ScrollView 렌더링
        │     └─ 못 찾음: <EmptyState> → router.replace('/')
        │
        └─→ CallButton 탭 (phone 비어있으면 disabled)
              └─→ ConfirmModal (isVisible: true)
                    ├─ [취소] → isVisible: false
                    └─→ [전화하기] → makeCall(service.phone)
                          ├─ canOpenURL → false → Alert(번호 표시)
                          ├─ openURL 성공 → 전화 앱 실행, 모달 닫기
                          └─ openURL 실패 → Alert(번호 표시)
```

---

## 상태 관리
전역 상태 없음. 각 화면 내 `useState` 로만 처리.

| 상태 | 위치 | 타입 | 초기값 |
|------|------|------|-------|
| 선택된 카테고리 | `index.tsx` | `CategoryFilter` | `'all'` |
| 검색어 | `search.tsx` | `string` | `''` |
| 모달 노출 여부 | `service/[id].tsx` | `boolean` | `false` |

---

## 스크롤 컴포넌트 선택 기준

| 화면/섹션 | 컴포넌트 | 이유 |
|---------|---------|------|
| 홈 인기 서비스 | `FlatList (horizontal)` | 아이템 수 가변, 성능 최적화 |
| 홈 서비스 목록 | `FlatList (vertical)` | 아이템 수 가변, `scrollToOffset` 지원 |
| 카테고리 탭 | `ScrollView (horizontal)` | 탭 수 고정, 단순 레이아웃 |
| 검색 결과 | `FlatList (vertical)` | 아이템 수 가변 |
| 서비스 상세 | `ScrollView (vertical)` | 고정 콘텐츠, 레이아웃 복잡 |

**FlatList 필수 props**
```typescript
keyExtractor={(item) => item.id}
// 상세 페이지는 FlatList 사용 안 함 → ScrollView
// FlatList는 renderItem 내부에 key prop 쓰지 않는다 (keyExtractor로 대신)
```

---

## 키보드 처리

**검색 화면 (`search.tsx`)**
```typescript
// iOS: 'padding', Android: 'height'
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <TextInput ... />
  <FlatList ... />
</KeyboardAvoidingView>
```
- 검색 결과 카드 탭 시 `Keyboard.dismiss()` 호출 후 라우팅
- 검색 화면 탭 전환 시 키보드 자동 닫힘 (Expo Router 기본 동작)

**상세 페이지**: 키보드 없음 → `KeyboardAvoidingView` 미사용

---

## 상세 페이지 CTA 버튼 겹침 방지

```typescript
// service/[id].tsx
const insets = useSafeAreaInsets();
const CTA_HEIGHT = 56;
const BOTTOM_PADDING = CTA_HEIGHT + insets.bottom + 16;

<ScrollView
  contentContainerStyle={{ paddingBottom: BOTTOM_PADDING }}
>
  {/* 서비스 상세 콘텐츠 */}
</ScrollView>

{/* 고정 CTA 버튼 */}
<View style={{
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  paddingBottom: insets.bottom,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 1,
  borderTopColor: '#E5E7EB',
}}>
  <CallButton ... />
</View>
```

---

## SplashScreen 처리 (`app/_layout.tsx`)

```typescript
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ ... }); // 폰트 없으면 생략 가능

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return <Stack />;
}
```
- 폰트 로드 완료 전까지 스플래시 유지
- `return null` 구간에서 화면 깜빡임 없음 (스플래시가 덮고 있음)

---

## 에러 핸들링

### 1. 존재하지 않는 서비스 id 접근
```
/service/없는id 접근 또는 id가 undefined
→ services.find() → undefined
→ <EmptyState message="서비스를 찾을 수 없어요" actionLabel="홈으로 가기" />
→ onAction: router.replace('/')
```

### 2. 전화 연결 실패
```typescript
// lib/phone.ts
export async function makeCall(phone: string): Promise<void> {
  if (!phone) return; // guard: 빈 문자열은 버튼 단계에서 차단됨
  const url = `tel:${phone}`;
  const supported = await Linking.canOpenURL(url);
  if (!supported) {
    Alert.alert(
      '전화 연결이 어렵습니다',
      `직접 전화해 주세요:\n${formatPhone(phone)}`
    );
    return;
  }
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      '전화 연결에 실패했습니다',
      `직접 전화해 주세요:\n${formatPhone(phone)}`
    );
  }
}

export function formatPhone(phone: string): string {
  // "15880000" → "1588-0000"
  // "0212345678" → "02-1234-5678"
  if (phone.startsWith('02')) {
    return phone.replace(/^(02)(\d{4})(\d{4})$/, '$1-$2-$3');
  }
  return phone.replace(/^(\d{4})(\d{4})$/, '$1-$2')
              .replace(/^(\d{3,4})(\d{3,4})(\d{4})$/, '$1-$2-$3');
}
```

### 3. 검색 결과 없음
```
filterServices(query) → []
→ <EmptyState
    message=`"${query}"에 맞는 서비스가 없어요`
    subMessage="다른 키워드로 검색해 보세요"
    actionLabel="전체 서비스 보기"
    onAction={() => setQuery('')}
  />
```

### 4. services.ts 데이터 비어있음
```
services.length === 0
→ 홈/검색 화면: <EmptyState message="서비스를 준비 중입니다" />
```

### 5. Android 모달 하드웨어 백 버튼
```typescript
<Modal
  visible={isVisible}
  onRequestClose={() => setIsVisible(false)}  // 필수
  transparent
  animationType="fade"
>
```

---

## 엣지 케이스

| 케이스 | 발생 조건 | 처리 |
|-------|----------|------|
| 가격이 "별도 견적" | `price: "별도 견적"` | 파란색 강조 없이 기본 텍스트 색상 |
| warranty 없는 서비스 | `warranty: undefined` | 보증 섹션 전체 미렌더링 |
| keywords 배열 비어있음 | `keywords: []` | name·category만으로 검색 |
| 검색어 공백만 입력 | `"   "` 입력 | `query.trim() === ''` → 추천 키워드 표시 |
| 검색어 특수문자 포함 | `"에어컨!!"` | includes는 정규식 아님 — 이스케이프 불필요 |
| 서비스명 20자 초과 | name이 길 때 | 카드: `numberOfLines={2}`, 상세 헤더: `numberOfLines={3}` |
| phone 빈 문자열 | 데이터 오류 | CTA 버튼 disabled + backgroundColor `#AAAAAA` |
| iOS SafeArea 하단 | Dynamic Island, 홈 인디케이터 | `useSafeAreaInsets().bottom` 동적 적용 |
| Android 네비게이션 바 | 제스처 네비게이션 or 버튼 네비게이션 | `useSafeAreaInsets().bottom` 동적 적용 |
| 인기 서비스 없음 | `isPopular: true` 인 서비스 0건 | 인기 서비스 섹션 전체 미렌더링 |
| 카테고리 전환 시 빈 목록 | 해당 카테고리 서비스 없음 | EmptyState "서비스를 준비 중입니다" |

---

## 검색 로직 (`lib/search.ts`)

```typescript
export function filterServices(services: Service[], query: string): Service[] {
  const q = query.trim().toLowerCase();
  if (q === '') return services;
  return services.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q) ||
    s.keywords.some(k => k.toLowerCase().includes(q))
  );
}
```
- 초성 검색 미지원 — 필요 시 `es-hangul` 도입, `lib/search.ts` 만 수정
- debounce 없음 — 20개 미만 데이터셋이므로 즉시 필터링

---

## 플랫폼별 차이

| 항목 | iOS | Android |
|-----|-----|---------|
| `tel:` 링크 | 전화 앱 직접 이동 | 전화 앱 직접 이동 |
| 모달 백 버튼 | 스와이프 제스처 | 하드웨어 백 버튼 → `onRequestClose` 필수 |
| SafeArea 하단 | Dynamic Island / 홈 인디케이터 | 네비게이션 바 (제스처/버튼) |
| 폰트 렌더링 | San Francisco 기본, 한글 자연스러움 | Roboto 기본, 한글 어색할 수 있음 |
| 그림자 | `shadowColor`, `shadowOpacity` 등 | `elevation` |
| KeyboardAvoidingView | `behavior="padding"` | `behavior="height"` |
| StatusBar | 기본 light/dark | 별도 StatusBar 설정 권장 |

---

## 폰트 설정
- 기본 시스템 폰트 사용 (iOS: SF Pro, Android: Roboto / Noto Sans KR)
- Android에서 한글이 어색하면 `expo-font` 로 Noto Sans KR 로드 검토
- `app/_layout.tsx` 에서 `useFonts` 훅 + `SplashScreen.preventAutoHideAsync()`

---

## 환경 설정 (`app.json` 필수 항목)
```json
{
  "expo": {
    "name": "홈케어",
    "slug": "homecare-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "splash": {
      "backgroundColor": "#0064D2",
      "resizeMode": "contain"
    },
    "ios": {
      "bundleIdentifier": "com.homecare.customer",
      "supportsTablet": false
    },
    "android": {
      "package": "com.homecare.customer",
      "adaptiveIcon": { "backgroundColor": "#0064D2" }
    },
    "plugins": ["expo-router"]
  }
}
```
- `supportsTablet: false` → 태블릿 미지원 명시 (통화 기능 의존 앱)
- `orientation: "portrait"` → 세로 방향 고정

---

## 빌드 (EAS Build)
```bash
eas build --platform ios --profile preview     # TestFlight 배포
eas build --platform android --profile preview  # APK 내부 배포
eas build --platform all --profile production   # 스토어 배포
```
- `eas.json` 에 `preview` / `production` 프로파일 설정 필요

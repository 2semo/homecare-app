# Architecture Decision Records

## 철학
MVP 속도 최우선. 서버·DB·인증 없이 작동하는 최소 구현을 선택. 외부 의존성은 전화 연결 1가지뿐. 결정은 나중에 교체 가능하도록 격리한다.

---

### ADR-001: React Native (Expo managed workflow) 선택
**결정**: 크로스플랫폼 모바일 앱으로 Expo SDK managed workflow를 사용한다  
**이유**: iOS·Android 동시 지원, 네이티브 전화 연결 UX, 빌드 인프라 직접 관리 불필요  
**트레이드오프**: 네이티브 모듈 커스터마이징이 필요해지면 managed workflow 한계. 그 시점에 `expo prebuild` 로 bare workflow 전환  
**리스크**:
- Expo SDK 업그레이드 시 breaking change 가능 → `package.json`에 SDK 버전 고정, 업그레이드 전 changelog 확인
- Expo Go 앱으로 개발 중 일부 네이티브 기능 미지원 → 이 앱에서는 `expo-linking` 만 쓰므로 문제 없음
- App Store / Play Store 심사 정책 변경 → 정책 위반 요소 없음 (단순 카탈로그 + 전화 연결)

---

### ADR-002: 정적 로컬 데이터 (API 없음)
**결정**: 서비스 목록과 상세 정보를 `data/services.ts` 정적 파일로 관리한다  
**이유**: 백엔드 없이 즉시 실행 가능. 서비스 종류가 20개 미만이고 자주 바뀌지 않음  
**트레이드오프**: 서비스 내용 변경 시 앱 스토어 업데이트 필요  
**에러 케이스**:
- `services.ts` 배열이 빈 배열로 export되면 홈 화면이 비어보임 → EmptyState 방어 렌더링 필수
- TypeScript strict mode에서 Service 타입 불일치 → 컴파일 타임에 잡힘, 빌드 전 `tsc --noEmit` 실행 필수
**향후 전환**: 서비스가 50개를 넘거나 가격 변경이 잦아지면 Supabase 또는 Notion API 기반 CMS로 교체

---

### ADR-003: 전화 연결 방식 (expo-linking)
**결정**: 신청하기 버튼은 `Linking.openURL("tel:XXXXXXXXXX")` 로 구현한다  
**이유**: 별도 예약 시스템·폼 없이 가장 빠른 신청 완성. 고객 입장에서 직접 통화가 신뢰도 최고  
**트레이드오프**: 통화 이력이 앱 내에 남지 않음  
**에러 케이스**:
- `Linking.canOpenURL("tel:")` → false: 태블릿·에뮬레이터·통화 미지원 기기 → Alert으로 번호 직접 표시
- `Linking.openURL` reject: 시스템 오류 → try/catch로 Alert 처리, 번호 텍스트 노출
- 전화번호 필드(`phone`) 빈 문자열: 데이터 실수 → `makeCall` 진입 전 guard clause로 버튼 비활성화
- iOS에서 전화 앱으로 이동 후 다시 앱으로 돌아올 때: 상태 유지 (모달은 닫힌 상태 유지)
**향후 전환**: CRM 연동이 필요해지면 이 버튼만 교체하면 됨 — 다른 컴포넌트에 영향 없음

---

### ADR-004: 전역 상태 관리 미사용
**결정**: Context, Zustand, Redux 등 전역 상태 라이브러리를 사용하지 않는다  
**이유**: 검색어·카테고리·모달 상태는 각 화면 `useState`로 충분. 화면 간 공유 상태 없음  
**트레이드오프**: 즐겨찾기·최근 본 서비스 기능 추가 시 AsyncStorage + Context 도입 필요  
**리스크**:
- 화면 이동 후 돌아올 때 이전 카테고리 선택이 초기화됨 → 의도된 동작. 홈에 돌아오면 항상 "전체" 탭
- 검색 결과에서 상세 → 뒤로가기 시 검색어 유지 안 됨 → 의도된 동작. 재입력 필요

---

### ADR-005: Expo Router (파일 기반 라우팅)
**결정**: React Navigation 직접 사용 대신 Expo Router를 사용한다  
**이유**: 파일 구조 = 라우팅 구조. `app/service/[id].tsx` 하나로 동적 라우팅 처리  
**트레이드오프**: Expo Router는 React Navigation 위에서 동작. 복잡한 커스터마이징 시 하위 API 접근 필요  
**에러 케이스**:
- `useLocalSearchParams().id` 가 undefined: `router.push('/service/')` 처럼 id 없이 이동한 경우 → id guard 처리 필수
- 딥링크로 존재하지 않는 서비스 id 접근: 앱 충돌 대신 EmptyState 렌더링
- 탭 내부에서 `router.push` 사용 시 탭 히스토리 이상 동작 가능 → 탭 루트 이동은 `router.replace` 사용

---

### ADR-006: StyleSheet API (NativeWind 미사용)
**결정**: NativeWind(Tailwind CSS for RN) 를 사용하지 않고 순수 React Native StyleSheet를 사용한다  
**이유**: NativeWind는 Expo managed workflow에서 추가 설정이 필요하고, CSS 클래스명이 RN 컴포넌트에 어색하다. StyleSheet는 RN 네이티브 최적화(StyleSheet.create로 ID 캐싱)가 적용된다  
**트레이드오프**: Tailwind에 익숙한 개발자는 학습 비용 발생. 색상·간격 토큰을 직접 `constants/colors.ts`에 관리해야 함  
**리스크**:
- 색상 하드코딩 확산 → `constants/colors.ts` 토큰 없이 StyleSheet에 직접 색상 값 쓰지 않는다 (규칙으로 강제)

---

### ADR-007: 전화번호 관리 방식
**결정**: 전화번호는 `data/services.ts` 각 서비스 객체의 `phone` 필드에 저장한다  
**이유**: 서비스마다 다른 번호를 사용할 수 있어야 한다. 환경변수(`app.json extra`)에 전화번호를 두면 서비스별 번호 관리가 불가능하다  
**트레이드오프**: 번호가 바뀌면 `services.ts` 수정 후 앱 업데이트 필요  
**에러 케이스**:
- phone 필드 빈 문자열 또는 undefined: `makeCall` 진입 전 guard — 빈 문자열이면 버튼 비활성화 + 콘솔 경고
- 번호 포맷: 하이픈 포함/미포함 혼용 → 저장은 숫자만, 표시(Alert)는 `formatPhone` 함수로 "000-0000-0000" 변환

---

### ADR-008: 한글 검색 방식
**결정**: 단순 `String.includes()` 부분 일치 검색을 사용한다. 초성 검색(자모 분리)은 미지원  
**이유**: MVP 단계에서 20개 미만 서비스를 대상으로 초성 검색은 과도한 구현이다. `keywords` 배열로 별칭("에어콘", "냉방기")을 미리 등록해 커버 가능  
**트레이드오프**: "ㅅㅌㄱ"으로 "세탁기"를 찾을 수 없음  
**향후 전환**: 서비스가 늘거나 초성 검색 요구가 생기면 `es-hangul` 라이브러리 도입. `lib/search.ts` 한 파일만 수정하면 됨  
**에러 케이스**:
- 검색어가 공백만 있는 경우: `query.trim() === ''` → 전체 목록 반환
- 특수문자 포함 검색어: `includes` 는 정규식 아니므로 이스케이프 불필요, 그대로 처리

---

### ADR-009: EmptyState 공통 컴포넌트 사용
**결정**: 검색 결과 없음, 서비스 id 없음, 데이터 없음 등 모든 빈 상태를 `<EmptyState>` 단일 컴포넌트로 처리한다  
**이유**: 빈 상태가 여러 화면에 분산되면 메시지·버튼 스타일이 제각각이 됨. 중앙화하면 수정 1곳에서 처리  
**인터페이스**:
```typescript
interface EmptyStateProps {
  message: string;
  actionLabel?: string;   // 버튼 텍스트
  onAction?: () => void;  // 버튼 핸들러
}
```
**에러 케이스**:
- `actionLabel`만 있고 `onAction`이 없는 경우: 버튼 렌더링 안 함 (또는 TypeScript에서 둘 다 있어야 하도록 타입 제한)

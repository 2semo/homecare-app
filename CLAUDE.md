# 프로젝트: 홈케어 고객 앱

고객이 홈케어 서비스를 탐색하고 전화로 신청하는 모바일 앱.
서버 없음, 로그인 없음, 전화 연결이 유일한 외부 액션.

## 기술 스택
- React Native (Expo SDK 52, managed workflow)
- TypeScript strict mode
- Expo Router v3 (파일 기반 라우팅)
- StyleSheet API (NativeWind 없이 순수 React Native 스타일)
- expo-linking (전화 연결)

## 아키텍처 규칙
- CRITICAL: 백엔드 API 없음. 모든 데이터는 `src/data/services.ts` 에서 읽는다
- CRITICAL: 전화 연결은 반드시 `lib/phone.ts`의 `makeCall()` 사용 — `Linking.openURL` 직접 호출 금지
- CRITICAL: 모달 없이 바로 전화 연결 금지 — 반드시 ConfirmModal 로 서비스명 확인 후 연결
- CRITICAL: 색상 값을 StyleSheet에 하드코딩 금지 — `constants/colors.ts` 토큰만 참조
- 화면 컴포넌트는 `app/` 에만, 재사용 UI는 `components/` 에 분리
- 타입 정의는 `types/service.ts` 에 중앙화
- 비즈니스 로직(검색, 전화 연결)은 `lib/` 순수 함수로 분리

## 핵심 에러 처리 규칙
- 존재하지 않는 서비스 id: `<EmptyState>` 렌더링 + 홈으로 버튼
- 전화 연결 실패: `makeCall` 내부에서 Alert 처리 — 호출부에서 별도 처리 불필요
- 검색 결과 없음: `<EmptyState>` 렌더링 + 전체 보기 버튼
- Android 모달 백 버튼: `Modal`의 `onRequestClose` 핸들러 반드시 구현

## 디렉토리 구조
```
src/
├── app/
│   ├── _layout.tsx            # 루트 레이아웃
│   ├── (tabs)/_layout.tsx     # 탭 바 레이아웃
│   ├── (tabs)/index.tsx       # 홈 화면
│   ├── (tabs)/search.tsx      # 검색 화면
│   └── service/[id].tsx       # 서비스 상세
├── components/
│   ├── ServiceCard.tsx
│   ├── CategoryTab.tsx
│   ├── CallButton.tsx
│   ├── ConfirmModal.tsx
│   ├── EmptyState.tsx
│   └── ProcessStep.tsx
├── data/services.ts
├── types/service.ts
├── lib/
│   ├── phone.ts
│   └── search.ts
└── constants/colors.ts
```

## 개발 프로세스
- CRITICAL: 새 기능 구현 전 반드시 `docs/PRD.md` 핵심 기능 범위 확인
- MVP 제외 사항(`docs/PRD.md` 참고)은 구현하지 않는다
- 커밋 메시지는 conventional commits (feat:, fix:, docs:, refactor:)

## 명령어
```
npx expo start            # 개발 서버 (Metro bundler)
npx expo start --ios      # iOS 시뮬레이터
npx expo start --android  # Android 에뮬레이터
npx tsc --noEmit          # 타입 체크 (커밋 전 필수)
```

## 핵심 사용자 흐름
1. 홈 화면 → 카테고리 탭 선택 또는 검색 탭 이동
2. 서비스 카드 터치 → 상세 페이지
3. 상세 페이지에서 금액·장점·진행방식·보증 확인
4. "신청하기" 버튼 → ConfirmModal → makeCall() → 전화 연결

## 참고 문서
- 기능 요건·에러케이스·서비스 데이터: `docs/PRD.md`
- 기술 결정 이유·에러 핸들링 패턴: `docs/ADR.md`
- 디렉토리 구조·타입·엣지케이스: `docs/ARCHITECTURE.md`
- 색상·컴포넌트 스타일: `docs/UI_GUIDE.md`

# UI 디자인 가이드

## 디자인 원칙
1. **신뢰감이 먼저다** — 가정에 전문가를 들이는 서비스. 깔끔하고 정직하게 보여야 한다.
2. **정보는 빠르게** — 고객은 "이 서비스가 뭔지", "얼마인지", "전화하면 되는지"만 알면 된다. 3스크롤 안에 해결한다.
3. **행동을 유도한다** — 신청하기 버튼은 항상 보인다. 절대 스크롤해야 나오는 위치에 두지 않는다.
4. **30~60대 타깃** — 글씨는 충분히 크게. 버튼은 충분히 크게. 복잡한 제스처 없음.

## AI 슬롭 안티패턴 — 하지 마라
| 금지 사항 | 이유 |
|-----------|------|
| backdrop-filter: blur() | glass morphism은 신뢰감이 아니라 유행 |
| gradient-text | 클리닝 서비스에서 텍스트 그라데이션은 사기 광고처럼 보인다 |
| 네온·글로우 box-shadow | 가전 클리닝 앱에 어울리지 않는다 |
| 보라/인디고 브랜드 색상 | 홈케어 서비스의 색은 블루·화이트 |
| 배경 gradient orb (blur-3xl 원형) | 장식 노이즈. 정보 집중을 방해한다 |
| 모든 카드에 동일한 rounded-2xl | 균일한 둥근 모서리는 템플릿 느낌 |
| "전문가 검증" 배지 남발 | 배지가 많을수록 신뢰도 낮아 보인다. 1개로 제한 |

---

## 색상

### 배경
| 용도 | 값 | 설명 |
|------|------|------|
| 페이지 배경 | #F7F8FA | 옅은 회색, 카드와 구분 |
| 카드 | #FFFFFF | 흰색 |
| 섹션 구분선 | #F0F1F4 | 탭 바·헤더 구분 |

### 텍스트
| 용도 | 값 |
|------|------|
| 주 텍스트 | #1A1A1A |
| 본문 | #444444 |
| 보조 | #777777 |
| 비활성 / 플레이스홀더 | #AAAAAA |

### 브랜드·시맨틱 색상
| 용도 | 값 |
|------|------|
| 주요 액션 (CTA 버튼, 탭 활성, 가격 강조) | #0064D2 |
| 보증·혜택 배지 배경 | #E8F1FB |
| 보증·혜택 배지 텍스트 | #0064D2 |
| 인기 배지 | #FF6B35 |
| 구분선 / 보더 | #E5E7EB |
| CTA 비활성 (phone 없음) | #AAAAAA |
| 오버레이 (모달 배경) | rgba(0,0,0,0.5) |

### WCAG 색상 대비 (AA 기준 4.5:1 이상)
| 조합 | 대비 비율 | 통과 여부 |
|-----|---------|---------|
| #0064D2 위 #FFFFFF | 5.9:1 | ✓ AA |
| #F7F8FA 위 #1A1A1A | 15.3:1 | ✓ AAA |
| #F7F8FA 위 #444444 | 7.2:1 | ✓ AAA |
| #F7F8FA 위 #777777 | 4.6:1 | ✓ AA |
| #E8F1FB 위 #0064D2 | 3.4:1 | △ AA Large only (배지는 굵은 폰트이므로 허용) |

---

## 타이포그래피

| 용도 | 크기 | 굵기 | 색상 | 비고 |
|------|------|------|------|------|
| 앱 이름 / 화면 제목 | 22px | 700 | #1A1A1A | |
| 서비스명 (상세) | 24px | 700 | #1A1A1A | |
| 가격 | 28px | 700 | #0064D2 | |
| 서비스명 (카드) | 16px | 600 | #1A1A1A | numberOfLines={2} |
| 섹션 제목 | 16px | 600 | #1A1A1A | |
| 본문 | 14px | 400 | #444444 | lineHeight: 22 |
| 보조 텍스트 (카테고리, 시간) | 12px | 400 | #777777 | |
| 배지 텍스트 | 12px | 500 | — | |
| 카드 가격 | 14px | 700 | #0064D2 | |
| 요금 주석 | 12px | 400 | #777777 | |
| 탭 바 레이블 | 11px | 500 | — | 활성: #0064D2 |
| CTA 버튼 | 17px | 600 | #FFFFFF | |

---

## 레이아웃

- 수평 패딩 (페이지): 16px
- 카드 간격 (세로): 10px
- 섹션 간격 (상세 페이지): 24px
- 하단 탭 바 높이: 56px + SafeArea.bottom
- 상세 페이지 ScrollView 하단 패딩: CTA 버튼 높이(56px) + SafeArea.bottom + 16px

---

## 컴포넌트 스펙

---

### 서비스 카드 (목록, `ServiceCard.tsx`)
```
배경: #FFFFFF
보더: 1px solid #E5E7EB
border-radius: 12
padding: 16
shadow: elevation 1 (Android) / shadowColor #000 shadowOpacity 0.05 shadowRadius 4 (iOS)
```
**레이아웃 (좌우 분할)**
```
┌──────────────────────────────────┐
│ [아이콘 48×48]  서비스명 (bold)  │ [인기]
│  #E8F1FB 배경  카테고리 · 시간   │
│               143,000원~         │
└──────────────────────────────────┘
```
- 왼쪽 아이콘 영역: 48×48, border-radius: 10, 배경 #E8F1FB
- 아이콘: MaterialCommunityIcons, size 24, color #0064D2
- 오른쪽: 서비스명(16px 600), 카테고리·소요시간(12px #777), 가격(14px 700 #0064D2)
- 인기 배지: 우상단 절대 위치, 배경 #FF6B35, 텍스트 #FFF, 12px, border-radius: 6, padding: 3 8

---

### 인기 서비스 카드 (가로, `ServiceCardHorizontal.tsx`)
```
너비: 160px 고정
배경: #FFFFFF
보더: 1px solid #E5E7EB
border-radius: 12
padding: 14
marginRight: 12
```
**레이아웃 (상하 배치)**
```
┌────────────────┐
│  [아이콘 36×36]│
│  서비스명       │  ← 2줄까지
│  143,000원~    │
└────────────────┘
```

---

### 신청하기 버튼 (`CallButton.tsx`)
```
배경: #0064D2 (비활성: #AAAAAA)
텍스트: #FFFFFF, 17px, font-weight 600
border-radius: 12
padding: 16 수직
marginHorizontal: 16
```
- 버튼 내부: 전화 아이콘(MaterialCommunityIcons 'phone', 20px) + " 신청하기" 텍스트 (수평 중앙)
- phone 필드 비어있을 때: disabled prop + 배경 #AAAAAA
- 고정 위치: `position: 'absolute', bottom: 0` + SafeArea.bottom 패딩

---

### 카테고리 탭 (`CategoryTab.tsx`)
```
비활성: 배경 #F0F1F4, 텍스트 #777777
활성: 배경 #0064D2, 텍스트 #FFFFFF
border-radius: 20 (pill)
padding: 8 16
marginRight: 8
fontSize: 14, fontWeight: '500'
```
- 전체를 `ScrollView horizontal showsHorizontalScrollIndicator={false}` 로 감쌈
- 선택 시 해당 탭으로 `scrollTo` 자동 스크롤
- 탭 최소 너비: 컨텐츠 너비 기준 (고정 너비 없음)

---

### ConfirmModal (`ConfirmModal.tsx`)
```
오버레이: rgba(0,0,0,0.5), position: 'absolute' full screen
모달 카드: 배경 #FFF, border-radius: 16, marginHorizontal: 32, padding: 24
```
**레이아웃**
```
┌──────────────────────────┐
│         📞               │  ← 아이콘 40px, color #0064D2, 가운데
│  에어컨 클리닝 (벽걸이)  │  ← 18px bold, 가운데, marginTop: 12
│  신청 전화를 연결할까요? │  ← 14px #777, 가운데, marginTop: 8
│                          │  ← marginTop: 24
│  ┌──────┐  ┌──────────┐  │  ← 버튼 gap: 12
│  │ 취소 │  │  전화하기 │  │
│  └──────┘  └──────────┘  │
└──────────────────────────┘
```
- [취소]: flex 1, 배경 #F0F1F4, 텍스트 #444444, border-radius 10, padding 14 수직
- [전화하기]: flex 1, 배경 #0064D2, 텍스트 #FFFFFF, border-radius 10, padding 14 수직
- `animationType="fade"`, `transparent={true}`
- Android `onRequestClose`: 모달 닫기

---

### EmptyState (`EmptyState.tsx`)
```
container: flex 1, justifyContent: 'center', alignItems: 'center', padding: 32
```
**레이아웃**
```
         🔍
  서비스를 찾을 수 없어요      ← 16px bold #1A1A1A, marginTop: 16
  홈으로 돌아가서 다른         ← 14px #777, lineHeight 22, 가운데, marginTop: 8
  서비스를 확인해 보세요
  
  [  홈으로 가기  ]           ← 버튼, marginTop: 24
```
- 아이콘: MaterialCommunityIcons, size 48, color #AAAAAA
- 아이콘 종류: 검색 없음 → 'magnify-close', 서비스 없음 → 'tools', 데이터 없음 → 'clock-outline'
- 버튼: 배경 #0064D2 텍스트 #FFF, 없으면 버튼 미렌더링

---

### 진행 단계 (`ProcessStep.tsx`)
```
세로 스텝 리스트
각 스텝 컨테이너: flexDirection 'row', alignItems 'flex-start'
```
**레이아웃**
```
 ①  예약 확인                ← 원형 넘버: 24×24 #0064D2, 텍스트 #FFF 12px bold
 │   CS마스터가 연락드립니다 ← label: 14px 600 #1A1A1A, desc: 13px #777
 |                           ← 연결선: 1px solid #E5E7EB, 마지막 스텝 미표시
 ②  전문가 방문
 │
 ...
```

---

### 추천 키워드 칩 (`KeywordChip.tsx`)
```
배경: #E8F1FB
텍스트: #0064D2, 14px, font-weight 500
border-radius: 16
padding: 8 16
marginRight: 8, marginBottom: 8
```

---

### 네비게이션 헤더 (상세 페이지)
```
배경: #FFFFFF
borderBottomWidth: 1, borderBottomColor: #E5E7EB
height: 52
```
- 왼쪽: `←` 뒤로가기 버튼 (24px, color #1A1A1A), 터치 영역 44×44
- 가운데: 카테고리명 텍스트 (16px 600 #1A1A1A)
- Expo Router 기본 헤더 커스터마이징 (`headerStyle`, `headerTintColor`, `headerTitleStyle`)

---

### 하단 탭 바
```
배경: #FFFFFF
borderTopWidth: 1, borderTopColor: #E5E7EB
height: 56 + SafeArea.bottom
```
- 활성 색상: #0064D2 (아이콘 + 레이블)
- 비활성 색상: #AAAAAA
- 레이블: 11px, font-weight 500
- 탭 아이콘: MaterialCommunityIcons size 24

---

## 섹션 구분선
- 섹션 간 구분: `height: 8, backgroundColor: '#F0F1F4'` (상세 페이지에서 섹션 사이)
- 카드 간 구분: 카드 margin-bottom 10px (구분선 대신 여백으로 처리)

---

## 애니메이션
- 카드 터치 피드백: `activeOpacity={0.7}` (Pressable)
- CTA 버튼 터치: `activeOpacity={0.85}`
- 모달 등장: `animationType="fade"` (RN Modal 기본)
- 카테고리 탭 전환: 즉시 (애니메이션 없음)
- 그 외 모든 애니메이션 금지

---

## 아이콘
- 라이브러리: `@expo/vector-icons` (MaterialCommunityIcons)
- strokeWidth: 해당 없음 (filled 스타일)
- 아이콘에 둥근 배경 박스 허용: 서비스 카드 왼쪽 아이콘, EmptyState 아이콘만
- 그 외 위치: 아이콘 컨테이너 박스 금지

### 서비스별 아이콘 매핑
| 서비스 | iconName |
|-------|---------|
| 에어컨 | `air-conditioner` |
| 세탁기 | `washing-machine` |
| 냉장고 | `fridge-outline` |
| 건조기 | `tumble-dryer` |
| 레인지후드 | `stove` |
| 비데 | `toilet` |
| 공기청정기 | `air-purifier` |
| 제습기 | `water-percent` |
| 김치냉장고 | `fridge` |
| 매트리스 | `bed-outline` |
| 새집증후군 | `home-outline` |
| 곰팡이 | `bacteria-outline` |
| 해충 방제 | `bug-outline` |
| 이전·설치 | `truck-outline` |

---

## 서비스 상세 페이지 섹션 순서 및 간격

| 순서 | 섹션 | 상단 여백 |
|-----|-----|---------|
| 1 | 서비스명 + 카테고리·소요시간 | 16 |
| 2 | 가격 + 요금 주석 | 16 |
| 3 | 섹션 구분선 (8px 회색) | — |
| 4 | "이런 점이 좋아요" + 혜택 3개 | 16 |
| 5 | 섹션 구분선 | — |
| 6 | "왜 지금 해야 할까요?" + reason | 16 |
| 7 | 섹션 구분선 | — |
| 8 | "어떻게 진행되나요?" + ProcessStep | 16 |
| 9 | 섹션 구분선 (warranty 있을 때만) | — |
| 10 | "보증 안내" (warranty 있을 때만) | 16 |
| — | CTA 버튼 높이 + SafeArea 패딩 | (하단 여백) |

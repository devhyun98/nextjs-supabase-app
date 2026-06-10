# Gather 프로젝트 규칙 문서

**생성일**: 2026-06-10  
**프로젝트명**: Gather - 소규모 일회성 이벤트 관리 플랫폼  
**목표**: 초대 링크 하나로 생일 파티, 워크샵, 세미나 등 5-30명 규모 이벤트를 간편하게 관리하는 플랫폼  

---

## 1. 프로젝트 개요 및 핵심 가치

### 프로젝트 정보
- **기술 스택**: Next.js 15 (App Router), TypeScript, React 19, Tailwind CSS v4, Supabase
- **개발 모델**: 6주 Sprint 기반 MVP 개발
- **팀 구성**: 1인 개발자
- **배포**: Vercel (Next.js 15 최적화)
- **데이터베이스**: Supabase PostgreSQL + Realtime

### 핵심 가치 제안
> **"초대 링크 하나로 3초 만에 끝내는 소규모 이벤트 관리"**

- ⚡ 3초 만에 로그인 (Google OAuth)
- 🔗 초대 링크 하나로 모든 것 해결
- 👥 Supabase Realtime으로 실시간 참여자 업데이트
- 📱 모바일 퍼스트 디자인 (럭키밀 스타일 카드 UI)

---

## 2. 개발 프로세스 및 워크플로우

### 2.1 작업 단계별 프로세스

#### Phase 1: 애플리케이션 골격 구축 (우선순위)
**Task 001**: 프로젝트 구조 및 라우팅 설정
- Next.js App Router 기반 전체 라우트 구조 생성
- 모든 주요 페이지의 빈 껍데기 파일 생성 (13개 페이지)
- 공통 레이아웃 컴포넌트 골격 구현
- 모바일 하단 내비게이션 바 구조 설정
- 관리자 사이드바 레이아웃 구조 설정

**Task 002**: 타입 정의 및 인터페이스 설계
- TypeScript 인터페이스 및 타입 정의 파일 생성
- 프론트엔드 컴포넌트 Props 타입 정의
- API 응답 타입 정의
- 전역 상태 관리 타입 정의
- UI 컴포넌트용 임시 데이터 모델 타입 정의 (추후 DB 스키마로 교체)

#### Phase 2: UI/UX 완성 (더미 데이터 활용)
**Task 003**: 공통 컴포넌트 라이브러리 구현
- shadcn/ui 추가 컴포넌트 설치 (Card, Avatar, Dialog, Toast, Form, Select)
- 이벤트 카드 컴포넌트 구현
- 참여자 프로필 카드 컴포넌트 구현
- 로딩 스켈레톤 컴포넌트 구현
- 빈 상태 UI 컴포넌트 구현
- 더미 데이터 생성 및 관리 유틸리티 작성

**Task 004**: 주최자 모바일 UI/UX 완성
- 홈 페이지 (랜딩) UI 구현
- 내 이벤트 목록 페이지 UI (주최자 뷰)
- 이벤트 생성 페이지 폼 UI (React Hook Form + Zod)
- 이벤트 상세 페이지 UI (주최자 뷰)
- 이벤트 수정 페이지 UI 구현
- 주최자 프로필 페이지 UI 구현
- 반응형 디자인 및 다크 모드 적용

**Task 005**: 참여자 모바일 UI/UX 완성
- 초대 링크 참여 페이지 UI
- 내가 참여한 이벤트 목록 페이지 UI (참여자 뷰)
- 이벤트 상세 페이지 UI (참여자 뷰, 읽기 전용)
- 참여자 프로필 페이지 UI 구현
- 반응형 디자인 및 다크 모드 적용

**Task 006**: 관리자 데스크톱 페이지 UI 완성
- 관리자 로그인 페이지 UI
- 관리자 대시보드 메인 페이지 UI
- 이벤트 관리 테이블 페이지 UI
- 사용자 관리 테이블 페이지 UI
- 통계 분석 페이지 UI (Recharts 라이브러리)

#### Phase 3: 데이터베이스 설정 및 핵심 기능 구현
**Task 007**: 데이터베이스 스키마 및 Supabase 초기 설정
- UI 요구사항을 반영한 스키마 설계
- Supabase 데이터베이스 테이블 생성 (users, events, event_participants)
- Row Level Security (RLS) 정책 설정
- 인덱스 생성 (invite_code, created_by, event_id, user_id)
- Supabase Storage 버킷 생성 (event-covers)
- Realtime 구독 설정 준비

**Task 008**: 인증 시스템 및 권한 관리
- Google OAuth 로그인 플로우 완성
- 사용자 프로필 자동 생성 로직
- 관리자 권한 체크 미들웨어 구현 (role: admin)
- 보호된 라우트 접근 제어
- 로그아웃 기능 구현
- Playwright MCP를 활용한 E2E 테스트

**Task 009**: 이벤트 CRUD 및 초대 시스템
- 이벤트 생성 API 구현
- 초대 코드 자동 생성 로직
- 이벤트 수정/삭제 API 구현
- 커버 이미지 업로드 기능
- 초대 링크 공유 기능 (카카오톡, 클립보드)
- 이벤트 상태 자동 관리 로직
- Playwright MCP 테스트

**Task 010**: 참여자 관리
- 초대 링크 참여 로직 구현
- 중복 참여 방지 로직
- 실시간 참여자 수 카운트 업데이트
- 내가 참여한/만든 이벤트 목록 조회
- Playwright MCP 테스트

**Task 011**: 관리자 대시보드 백엔드 구현
- 대시보드 지표 집계 쿼리 구현
- 이벤트 관리 테이블 검색/필터/삭제 API
- 사용자 관리 테이블 검색/필터/삭제 API
- 통계 데이터 집계 및 그래프 데이터 API
- 페이지네이션 및 정렬 로직
- Playwright MCP 통합 테스트

**Task 012**: 핵심 기능 통합 테스트
- 전체 사용자 플로우 E2E 테스트
- 주최자 플로우: 이벤트 생성 → 초대 링크 공유 → 참여자 확인
- 참여자 플로우: 초대 링크 클릭 → 로그인 → 자동 참여
- 관리자 플로우: 로그인 → 지표 확인 → 데이터 관리
- 에러 핸들링 및 엣지 케이스 테스트

#### Phase 4: 고급 기능 및 최적화
**Task 013**: 사용자 경험 향상
- Toast 알림 시스템 구현
- 로딩 상태 및 스켈레톤 UI 적용
- 에러 바운더리 및 404 페이지
- 폼 유효성 검사 메시지 개선
- 터치 영역 최적화 (모바일 48px 이상)
- 무한 스크롤 또는 가상화 리스트

**Task 014**: 성능 최적화 및 SEO
- 이미지 최적화 (next/image, webp 포맷)
- 코드 스플리팅 최적화
- Supabase 쿼리 최적화
- 메타 태그 및 Open Graph 설정
- robots.txt 및 sitemap.xml 생성
- Lighthouse 점수 90+ 달성

**Task 015**: 배포 및 모니터링
- Vercel 프로젝트 설정 및 환경 변수 구성
- CI/CD 파이프라인 구축
- 에러 모니터링 시스템 설정 (Sentry)
- 분석 도구 설정 (Google Analytics)
- 프로덕션 배포 및 도메인 연결
- 배포 후 통합 테스트

### 2.2 작업 생성 규칙

작업 파일 생성 시 다음 구조를 따릅니다:

```markdown
# Task XXX: [작업명]

## 개요
- **목표**: [작업의 핵심 목표]
- **예상 소요 시간**: [X일]
- **관련 기능**: [F001, F002 등]
- **의존성**: [이전에 완료되어야 할 Task]

## 구현 사항
- [ ] 세부 구현 항목 1
- [ ] 세부 구현 항목 2
- [ ] 세부 구현 항목 3

## 수락 기준
- 기준 1: [측정 가능한 완료 조건]
- 기준 2: [측정 가능한 완료 조건]

## 테스트 체크리스트 (API/비즈니스 로직 작업 시)
- [ ] Playwright MCP 테스트 시나리오 1
- [ ] Playwright MCP 테스트 시나리오 2
- [ ] 에러 케이스 테스트

## 관련 파일
- /app/[경로]/page.tsx
- /components/[컴포넌트].tsx
- /lib/[유틸리티].ts
```

### 2.3 테스트 필수 사항

#### API/비즈니스 로직 작업 시
- **"## 테스트 체크리스트" 섹션 필수 포함**
- Playwright MCP를 사용한 E2E 테스트 시나리오 작성
- 각 단계 후 작업 파일 내 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- **각 단계 완료 후 중단하고 추가 지시를 기다림**

#### 테스트 규칙
1. **모든 API 연동은 Playwright MCP로 테스트**: 수동 테스트 의존 금지
2. **각 Phase 완료 시 통합 테스트 수행**: Phase 간 전환 시 회귀 테스트 필수
3. **에러 케이스 반드시 테스트**: Happy path만 테스트하지 말고 에러 상황도 검증

---

## 3. 구조 우선 접근법 (우선순위)

반드시 다음 순서를 준수하여 중복 작업을 최소화합니다:

### 1단계: Phase 1을 완벽히 완료 후 Phase 2 시작
- 골격이 완성되지 않으면 UI 작업 시작 금지
- 모든 13개 페이지의 라우트 파일 생성
- 모바일/데스크톱 레이아웃 분리 완성
- 프론트엔드 타입 정의 파일 구조 완성

### 2단계: 더미 데이터로 전체 UI 완성 후 데이터베이스 설계
- UI가 완성되어 요구사항이 확정된 후 최적화된 스키마 설계
- 모든 페이지 UI가 더미 데이터로 완성
- 주최자와 참여자의 서로 다른 UX 플로우 동작 확인
- 권한에 따른 UI 조건부 렌더링 확인

### 3단계: 공통 컴포넌트 우선 개발
- 페이지별 컴포넌트보다 공통 컴포넌트 먼저 완성
- 이벤트 카드, 참여자 프로필 카드 등 재사용성 높은 컴포넌트 우선

### 4단계: UI 피드백 반영 후 백엔드 구현
- UI 검토를 통해 도출된 개선사항을 데이터베이스 설계에 반영
- 데이터베이스 설계 후 API 엔드포인트 구현
- 모든 API 엔드포인트 구현 완료
- 실시간 기능 정상 동작

---

## 4. 기능 명세 및 페이지 매핑

### 4.1 MVP 핵심 기능 (15가지)

| ID | 기능명 | 설명 | 관련 페이지 |
|----|--------|------|------------|
| **F001** | 이벤트 생성 | 제목, 설명, 날짜, 장소, 커버 이미지 입력하여 이벤트 생성 | 이벤트 생성, 상세, 수정 페이지 |
| **F002** | 초대 링크 자동 생성 | 이벤트 생성 시 고유 초대 코드(invite_code) 자동 생성 | 이벤트 상세 페이지 |
| **F003** | 초대 링크 공유 | 초대 링크를 카카오톡, 문자, 클립보드 복사로 공유 | 이벤트 상세 페이지 |
| **F004** | 초대 링크 참여 | 초대 링크 클릭 시 미리보기 → 로그인 → 자동 참여 | 초대 링크 참여 페이지 |
| **F005** | 실시간 참여자 목록 | Supabase Realtime으로 참여자가 추가되면 즉시 목록 업데이트 | 이벤트 상세 페이지 |
| **F006** | 이벤트 수정/삭제 | 주최자가 이벤트 정보 수정 또는 삭제 (참여자는 불가) | 이벤트 상세, 수정 페이지 |
| **F007** | 내 이벤트 목록 조회 | 주최자: 내가 만든 이벤트 / 참여자: 내가 참여한 이벤트 리스트 | 내 이벤트 목록 페이지 |
| **F008** | 이벤트 상태 관리 | 이벤트 날짜 기준으로 예정/진행 중/종료 자동 분류 | 내 이벤트 목록, 상세 페이지 |
| **F009** | 커버 이미지 업로드 | Supabase Storage를 사용한 이벤트 커버 이미지 업로드 | 이벤트 생성, 수정, 상세 페이지 |
| **F010** | Google OAuth 로그인 | Google 계정으로 3초 만에 회원가입/로그인 | 로그인, 초대 참여, 관리자 로그인 페이지 |
| **F011** | 사용자 프로필 관리 | 이름, 프로필 사진 기본 정보만 관리 (Google OAuth에서 자동) | 프로필 페이지 |
| **F012** | 관리자 대시보드 메인 | 주요 지표 카드 (오늘/이번 주/이번 달/전체) | 관리자 대시보드 페이지 |
| **F013** | 이벤트 관리 테이블 | 전체 이벤트 검색, 필터, 삭제 기능 | 관리자 이벤트 관리 페이지 |
| **F014** | 사용자 관리 테이블 | 전체 사용자 검색, 필터, 삭제 기능 | 관리자 사용자 관리 페이지 |
| **F015** | 통계 그래프 | 이벤트 생성 추이, 사용자 증가 추이 그래프 (최근 7일) | 관리자 통계 분석 페이지 |

### 4.2 페이지 목록 (13개)

#### 모바일 페이지 (사용자)
1. **홈/랜딩 페이지** (`/`) - 서비스 소개, 로그인 유도
2. **로그인 페이지** (`/auth/login`) - Google OAuth
3. **내 이벤트 목록** (`/events`) - 주최자/참여자 뷰 구분
4. **이벤트 생성** (`/events/create`) - 폼 페이지
5. **이벤트 상세** (`/events/[id]`) - 상세 정보, 참여자 목록, 초대 공유
6. **이벤트 수정** (`/events/[id]/edit`) - 수정 폼
7. **초대 링크 참여** (`/join/[invite_code]`) - 미리보기, 자동 참여
8. **프로필 페이지** (`/profile`) - 프로필 정보, 로그아웃

#### 관리자 페이지 (데스크톱)
9. **관리자 로그인** (`/admin/login`) - role 기반 접근 제어
10. **관리자 대시보드** (`/admin/dashboard`) - 주요 지표 카드
11. **이벤트 관리** (`/admin/events`) - 테이블, 검색/필터/삭제
12. **사용자 관리** (`/admin/users`) - 테이블, 검색/필터/삭제
13. **통계 분석** (`/admin/analytics`) - 그래프, 추이 분석

---

## 5. 데이터 모델 및 Database Schema

### 5.1 테이블 구조

#### users (사용자 정보)
```typescript
- id: UUID (PK)
- email: TEXT UNIQUE
- name: TEXT
- avatar_url: TEXT
- role: TEXT ('user', 'admin')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### events (이벤트 정보)
```typescript
- id: UUID (PK)
- title: TEXT
- description: TEXT
- location: TEXT
- event_date: TIMESTAMP
- cover_image_url: TEXT
- invite_code: TEXT UNIQUE
- status: TEXT ('upcoming', 'ongoing', 'ended')
- created_by: UUID (FK → users.id)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### event_participants (이벤트 참여자 정보)
```typescript
- id: UUID (PK)
- event_id: UUID (FK → events.id)
- user_id: UUID (FK → users.id)
- role: TEXT ('host', 'participant')
- joined_at: TIMESTAMP
- UNIQUE(event_id, user_id) - 중복 참여 방지
```

### 5.2 관계 정의
- `users` 1:N `events` (created_by)
- `events` 1:N `event_participants`
- `users` 1:N `event_participants`

### 5.3 인덱스
- `events.invite_code` (UNIQUE INDEX)
- `events.created_by` (INDEX)
- `event_participants.event_id` (INDEX)
- `event_participants.user_id` (INDEX)

---

## 6. 기술 스택 및 라이브러리

### 6.1 이미 설치된 기술 스택 ✅
- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript 5.6+
- **UI 라이브러리**: React 19
- **스타일링**: Tailwind CSS v4
- **컴포넌트**: shadcn/ui (new-york 스타일)
- **아이콘**: Lucide React
- **테마**: next-themes
- **인증/DB**: Supabase (@supabase/ssr, @supabase/supabase-js)
- **코드 품질**: ESLint 9, Prettier 3.6.2, Husky 9.1.7

### 6.2 추가 필요 라이브러리
- **React Hook Form 7.x** - 폼 상태 관리
- **Zod** - 스키마 검증
- **Recharts 2.x** - 차트 라이브러리 (관리자 통계용)

---

## 7. UI/UX 디자인 가이드

### 7.1 모바일 디자인 원칙
| 항목 | 가이드라인 |
|------|----------|
| **레이아웃** | 단일 컬럼 (모바일 최적화), 카드 간격 16px, 좌우 패딩 16px |
| **컬러** | Primary: #10B981 (Emerald 500), Accent: #F59E0B (Amber 500) |
| **카드** | Border Radius 16px, Shadow: shadow-md, 커버 이미지 비율 16:9, 내부 패딩 16px |
| **버튼** | 높이 최소 48px (터치 영역), Border Radius 12px |
| **타이포그래피** | H1: 24px Bold, H2: 20px Bold, 본문: 16px Regular, 캡션: 14px |
| **하단 내비게이션** | 고정 하단 바, 높이 64px, 4개 탭 (아이콘 + 텍스트) |

### 7.2 데스크톱 디자인 원칙 (관리자)
| 항목 | 가이드라인 |
|------|----------|
| **레이아웃** | 좌측 사이드바 240px + 메인 콘텐츠 |
| **사이드바** | 배경 Gray 900, 메뉴 항목 48px 높이 |
| **테이블** | 행 높이 56px, 헤더 배경 Gray 100 |
| **차트** | Recharts, Line Chart Emerald 500 선 |

---

## 8. 코드 작성 가이드라인

### 8.1 Supabase 클라이언트 사용 규칙

#### Server Components/Route Handlers
```typescript
import { createClient } from "@/lib/supabase/server";

export default async function ServerComponent() {
  // 매번 새로 생성 (전역 변수 금지)
  const supabase = await createClient();
  const { data } = await supabase.from('table').select();
}
```

#### Client Components
```typescript
'use client';
import { createClient } from "@/lib/supabase/client";

export default function ClientComponent() {
  const supabase = createClient();
  // ...
}
```

### 8.2 코드 스타일
- **들여쓰기**: 스페이스 4칸
- **변수명**: camelCase (영어 사용)
- **함수명**: camelCase (영어 사용)
- **파일명**: kebab-case (영어 사용)
- **주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성

### 8.3 TypeScript 엄격 모드
- 모든 파일에서 `strict: true` 준수
- 타입 추론 대신 명시적 타입 지정
- `any` 타입 사용 금지

---

## 9. 커밋 및 Git 워크플로우

### 9.1 커밋 메시지 컨벤션
형식: `[타입] 제목`

**타입**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드, 의존성 등

예시: `feat: 이벤트 생성 API 구현`

### 9.2 Git Hooks
- **pre-commit**: ESLint + Prettier 자동 실행
- 커밋 전 자동 코드 검사 및 포맷팅 수행

---

## 10. 개발 명령어

```bash
# 개발
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run check-all   # 모든 검사 통합 실행 (권장)

# 코드 품질
npm run lint        # ESLint 검사
npm run lint:fix    # ESLint 자동 수정
npm run format      # Prettier 포맷팅
npm run format:check # Prettier 검사만
npm run typecheck   # TypeScript 타입 체크

# UI 컴포넌트
npx shadcn@latest add [component-name]  # 새 컴포넌트 추가
```

---

## 11. 성공 지표 (KPI)

### 1차 목표 (MVP 출시 후 1개월)
| 지표 | 목표값 | 측정 방법 |
|------|--------|----------|
| **주간 생성 이벤트 수** | 50개/주 | Supabase Analytics |
| **월간 활성 사용자 (MAU)** | 200명 | Supabase Auth |
| **초대 링크 → 회원가입 전환율** | 70% | event_participants JOIN users |
| **이벤트당 평균 참여자 수** | 8명 | AVG(event_participants) |
| **재방문율 (7일 이내)** | 40% | Supabase Analytics |

### 2차 목표 (Phase 2 출시 후 3개월)
- 주간 생성 이벤트 수: 200개/주 (4배 증가)
- 월간 활성 사용자: 1,000명 (5배 증가)
- 정산 기능 사용률: 60%
- 카풀 기능 사용률: 40%
- 프리미염 전환율: 10%

---

## 12. 주의사항 및 필수 확인 사항

### 12.1 보안
- ✅ 환경 변수: `.env`, `.env.local`에는 절대 커밋하지 않음
- ✅ API Key: 프론트엔드에서는 `NEXT_PUBLIC_*` prefix만 사용
- ✅ 권한: Row Level Security (RLS)로 데이터 접근 제어
- ✅ 관리자 권한: role 기반 접근 제어 (admin만 /admin/* 접근)
- ✅ 초대 코드: UUID v4로 고유 코드 생성 (충돌 방지)
- ✅ 파일 업로드: 파일 크기 및 확장자 제한 (악성 파일 방지)

### 12.2 성능 목표
- **모바일 First Contentful Paint**: 1.5초 이하
- **Time to Interactive**: 3초 이하
- **이미지 로딩**: Lazy loading 필수
- **번들 크기**: 각 페이지 200KB 이하
- **Lighthouse 점수**: 90+ 달성

### 12.3 테스트 필수 사항
1. **모든 API 연동은 Playwright MCP로 테스트**
2. **각 Phase 완료 시 통합 테스트 수행**
3. **에러 케이스 반드시 테스트**
4. **Happy path만 테스트하지 말고 에러 상황도 검증**

### 12.4 작업 완료 체크리스트
```bash
npm run check-all   # 모든 검사 통과 확인
npm run build       # 빌드 성공 확인
```

---

## 13. MCP 서버 및 도구

### 13.1 사용 가능한 MCP 서버
- **supabase**: Supabase 데이터베이스 연동
- **playwright**: 브라우저 자동화 및 E2E 테스트
- **context7**: 문서 검색
- **shadcn**: shadcn/ui 컴포넌트 관리
- **shrimp-task-manager**: 작업 관리

### 13.2 Playwright MCP 테스트
- E2E 테스트 시나리오 작성 필수 (API/비즈니스 로직 작업 시)
- 각 Task에서 "## 테스트 체크리스트" 섹션에 시나리오 명시
- 구현 완료 후 Playwright MCP로 전체 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행

---

## 14. 환경 변수 설정

### 필수 환경 변수 (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=[Supabase 프로젝트 URL]
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[Supabase Anon Key]
```

**참고**: 환경 변수가 설정되지 않은 경우 미들웨어는 자동으로 건너뜁니다.

---

## 15. 참고 문서

- **PRD.md**: 상세한 기능 명세 및 페이지별 상세 기능 정의
- **ROADMAP.md**: 개발 로드맵 및 작업 진행 상황
- **LEANCANVAS.md**: 비즈니스 모델 및 전략
- **CLAUDE.md**: 프로젝트 기술 스택 및 아키텍처 가이드

---

**생성 도구**: shrimp-task-manager MCP  
**마지막 업데이트**: 2026-06-10

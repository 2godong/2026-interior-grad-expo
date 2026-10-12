# 🌐 2026 Interior Graduation Expo x LikeLionDS 14th

## 🖥️ FE Developer

| <a href="https://github.com/yangyangeeee"><img width="150" alt="/" src="https://avatars.githubusercontent.com/yangyangeeee" /></a> | <a href="https://github.com/2godong"><img src="https://avatars.githubusercontent.com/2godong" width="150" alt="/"/></a> |
| --- | --- |
| 양서윤 | 이소라 |

<br>

## 🛠 기술 스택

| 역할 | 종류 | 선정 이유 |
| --- | --- | --- |
| Library | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) | 팀원 기술 수준 고려, 컴포넌트 기반 UI 개발을 통해 개발 시간 및 비용 절약 가능 |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | 쉬운 디버깅 및 유연한 코드 작성 가능 |
| Styling | ![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white) | CSS-in-JS 방식의 컴포넌트 기반 스타일링 방식으로 관리가 간편 |
| Data Fetching | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) | JSON 데이터 자동 변환 기능으로 사용 편의 |
| Routing | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | 직관적인 라우팅 관리 및 다양한 옵션 제공 |
| Formatting | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) | 코드 품질을 보장 및 협업 시 일관된 코드 스타일을 유지 |
| Package Manager | ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white) | 빠른 속도의 패키지 설치 및 안정성 보장 |
| Deployment | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) | 쉽고 빠른 배포 및 자동 CI/CD 지원 |
| Bundler | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | 빠른 번들링을 통해 빠른 개발 속도 제공 |

<br>

## ✅ Bundler & Package Manager

- port 번호: `3000`
- yarn 명령어 예시

```bash
yarn install        # 전체 설치
yarn add 라이브러리   # 라이브러리 설치
yarn dev            # 실행
```

<br>

## ⌨️ Code Styling

- **camelCase**
  - 변수명, 함수명에 적용
  - 첫 글자는 소문자로 시작, 띄어쓰기는 붙이고 뒷 단어의 시작을 대문자로
  - ex) `handleDelete`
- 언더바 사용 X (클래스명은 허용)

<br>

## 🔗 Git Convention

### 💫 Git Flow

```
main ← develop
```

| 브랜치 | 설명 |
| --- | --- |
| `main` | 배포 및 전체 개발 브랜치 (feat이 merge되는 브랜치) → 1차 배포 브랜치 |
| `develop` | 1차 배포 이후, 2차 배포를 위한 작업이 merge되는 브랜치 → 2차 배포 브랜치 |
| `feat` | 페이지/기능 별 브랜치 |
| `refactor` | 리팩토링/수정 별 브랜치 |

### 🔥 Commit Message Convention

| 커밋 유형 | 의미 |
| --- | --- |
| 🎀 Feat | 새로운 기능 추가 |
| 🐛 Fix | 버그 수정 |
| 💄 Design | UI(CSS) 수정 |
| ✏️ Typing Error | 오타 수정 |
| 🚚 Mod | 폴더 구조 이동 및 파일 이름 수정 |
| 💡 Add | 파일 추가 (ex. 이미지 추가) |
| 🔥 Del | 파일 삭제 |
| 🔨 Refactor | 코드 리팩토링 |
| 🎉 Init | 프로젝트 세팅 |

- 형식: `커밋유형: 상세설명 (#이슈번호)`
- 예시
  - `🎉 Init: 프로젝트 초기 세팅 (#1)`
  - `🎀 Feat: 메인페이지 개발 (#2)`

### 🌿 Branch Convention

| 브랜치 종류 | 의미 |
| --- | --- |
| Feat | 새로운 기능 추가 |
| Fix | 버그 수정 |
| Refactor | 코드 리팩토링 |
| Init | 프로젝트 세팅 |

- 형식: `브랜치종류/#이슈번호/상세기능`
- 예시
  - `init/#1/init`
  - `fix/#2/splash`

<br>

## 📋 Issue Convention

| 태그 | 의미 |
| --- | --- |
| 🎀 Feat | 새로운 기능 추가 |
| 🐛 Fix | 버그 수정 |
| 🔨 Refactor | 코드 리팩토링 |
| 🎉 Init | 프로젝트 세팅 |

- 형식: `태그 - 간단한 요약`
- 예시
  - `🎀Feat - Header 컴포넌트 구현`
  - `🎉Init - 프로젝트 초기 세팅`

<br>

## 🔄 Pull Request (PR) Convention

| 태그 | 의미 |
| --- | --- |
| 🎀 Feat | 새로운 기능 추가 |
| 🐛 Fix | 버그 수정 |
| 🔨 Refactor | 코드 리팩토링 |
| 🎉 Init | 프로젝트 세팅 |

- 형식: `[태그] 제목`
- 예시
  - `[🎀Feat] Header 컴포넌트 구현`
  - `[🐛Fix] Header 컴포넌트 버그 수정`

> 이슈/PR 템플릿은 `.github/ISSUE_TEMPLATE`, `.github/pull_request_template.md`에 있습니다.

<br>

## 📂 프로젝트 구조

```
📦2026-interior-grad-expo
 ┣ 📁.github
 ┣ 📂public
 ┃ ┣ 📁favicons
 ┃ ┗ 📁fonts
 ┣ 📂src
 ┃ ┣ 📁assets
 ┃ ┣ 📁components
 ┃ ┣ 📁lib
 ┃ ┣ 📁routes
 ┃ ┣ 📁styles
 ┃ ┣ 📁utils
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┗ 📜main.tsx
 ┣ 📜.gitattributes
 ┣ 📜.gitignore
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.app.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┣ 📜vite.config.ts
 ┗ 📜yarn.lock
```

| 폴더 | 설명 |
| --- | --- |
| `public/favicons` | 파비콘 |
| `public/fonts` | 폰트 |
| `src/assets` | 사용되는 모든 에셋 |
| `src/components` | 라우팅 페이지 외 모든 기능 및 컴포넌트 |
| `src/lib` | 색상 팔레트 등 공통 설정 |
| `src/routes` | 라우팅 페이지 |
| `src/styles` | 전역 스타일 (styled-components 등) |
| `src/utils` | 전역으로 사용되는 함수 |

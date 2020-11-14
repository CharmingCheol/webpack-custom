## webpack 커스텀 및 라이브러리 세팅
### 1. webpack 커스텀
- webpack을 처음부터 직접 커스텀
- webpack.config를 타입스크립트로 사용하려고 했으나, 일부 플러그인과 충돌 부분이 있어 자바스크립트로 작성
- 웹팩 최신 빌드 번호가 5.x.x인데, storybook과 충돌이 나서 4.44.2으로 내림
### 2.Typescript 세팅
- tsconfig.json에서 타입스크립트 빌드 세팅
### 3.jest 세팅
- jest.config.js로 jest 빌드 세팅
- import export 되지 않은 부분은 babel을 이용해서 문제점 해결
### 4.eslint, prettier 세팅
- react, typescript 환경에서 eslint가 동작 할 수 있도록 airbnb code style 방식으로 적용
- vscode editor에서 prettier extensions을 사용하지 않고, prettierrc에서 formatting 적용
### 5.storybook 세팅
- npx -p @storybook/cli sb init을 실행해서 storybook 설치
- 추가적으로 @storybook/addon-knobs addon도 설치함
- 아직 storybook 정적 사이트 배포는 하지 못했음
### 6.추후 세팅 부분
- docker
- travis CI
- cypress
- 웹팩 5버전으로 세팅
- webpack.config.js -> webpack.config.ts 변환
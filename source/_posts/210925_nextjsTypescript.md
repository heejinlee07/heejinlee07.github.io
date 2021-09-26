---
title: Next.js와 TypeScript 원문 번역
date: 2021-09-25
tags: javaScript
---

> 원문링크: https://nextjs.org/docs/basic-features/typescript#incremental-type-checking

## create-next-app support

TypeScript project를 `create-next-app`과 함께 `--ts`, `--typescript` 를 사용하여 아래와 같이 생성할 수 있다.

```
npx create-next-app --ts
# or
yarn create next-app --typescript
```

---

## Existing projects

이미 존재하는 project에 적용하려면 root folder에 빈 `tsconfig.json` file을 생성한다.

```
touch tsconfig.json
```

Next.js는 자동으로 이 파일 안에 default values를 설정한다. custom [complier options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)로 `tsconfig.json`을 작성하는 것 또한 지원된다.

> Next.js는 TypeScript를 핸들링하기 위해 Babel을 사용하는데 몇가지 [주의사항](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)이 있고 [일부 컴파일러 옵션은 다르게 처리된다.](https://babeljs.io/docs/en/babel-plugin-transform-typescript#typescript-compiler-options)

`next(npm run dev or yarn dev)`를 실행하면, Next.js가 setup을 완료하기 위해 설피가 필요한 패키지를 안내한다.

```
npm run dev

# You'll see instructions like these:
#
# Please install typescript, @types/react, and @types/node by running:
#
#         yarn add --dev typescript @types/react @types/node
#
# ...
```

이렇게 하면 `.js` 파일을 `.tsx`로 전환할 준비가 완료되었고, TypeScript를 사용할 수 있게 된다.

---

> `next-env.d.ts`라는 이름의 파일이 프로젝트의 root에 생성된다. 이 파일은 TypeScript complier가 Next.js의 type을 선택하도록 한다. 이는 매번 변경되므로 **임의로 삭제하거나 편집하지 않도록 한다.**

> TypeScript `strict` 모드는 기본적으로 꺼져있다. TypeScript를 편하게 사용하려면 `tsconfig.json`파일 내에 이 모드를 켜도록 한다.

> `next-env.d.ts`를 편집하는 대신 `additional.d.ts`와 같은 새 파일을 추가한 다음, `tsconfig.json` 의 [include](https://www.typescriptlang.org/tsconfig#include) 배열에서 참조하여 새로운 타입 유형을 추가할 수 있다.

기본적으로 Next.js는 `next build`의 일부로 type checking를 수행한다. 개발하는 동안에는 code editior를 이용하여 type checking을 할 것을 추천한다.

만약 error report를 무시하고 싶다면, [Ignoring TypeScript errors](https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors)와 관련된 문서를 확인하도록 한다.

---

## Static Generation and Server-side Rendering

`getStaticProps`, `getStaticPaths`, `getServerSideProps`을 위해 각각 `getStaticProps`, `getStaticPaths`, `getServerSideProps` type을 사용할 수 있다.

```javascript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
};
```

> 만약 `getInitialProps`를 사용하려면 [이 링크](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#typescript)를 참조한다.

---

## API Routes

아래 예제는 API routes의 빌트인 타입을 사용하는 방법이다.

```javascript
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
};
```

reponse data에 type을 사용할 수도 있다.

```javascript
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string,
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
```

---

## Custom App

만약 [custom App](https://nextjs.org/docs/advanced-features/custom-app)을 사용한다면 빌트인 타입인 `AppProps`를 사용할 수 있고 파일 이름을 `./pages/_app.tsx `와 같이 변경할 수 있다.

```javascript
// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
```

---

## Path aliases and baseUrl

Next.js는 자동으로 tsconfig.json `paths`와 `baseUrl` 옵션을 제공한다. Module Path aliases와 관련된 특징을 더 알아보고 싶다면 [이 링크](https://nextjs.org/docs/advanced-features/module-path-aliases)를 참조한다.

## Type checking next.config.js

`next.config.js` 파일은 반드시 JavaScript 파일이어야 하고, Babel이나 TypeScript로 parse되어서는 안된다.하지만 아래와 같이 JSDoc를 이용해서 IDE에서의 몇 가지 type checking를 추가할 수는 있다.

```
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
}

module.exports = nextConfig
```

## Incremental type checking

`v10.2.1`부터 Next.js는 [incremental type checking](https://www.typescriptlang.org/tsconfig#incremental)를 `tsconfig.json`에서 사용할 수 있도록 지원한다. 이는 대규모 application에서 type checking을 빠르게 할 수 있도록 돕는다. 최소한 `v4.3.2`이상의 TypeScript를 사용하고 있다면 최고의 성능을 경험하기 위해 이를 사용하는 것이 추천된다.

---

_References_
[Next.js - TypeScript](https://nextjs.org/docs/basic-features/typescript#incremental-type-checking)

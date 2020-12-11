---
title: Data Fetching
date: 2020-12-11
tags:
---

Next.js의 `pre-rendering`은 `static Generation`, `sever-side Rendering`의 두 가지 형태가 있다. 각각의 형태에 따라 data fetching를 어떻게 처리할 것인지를 살펴본다.

## pre-rendering에 쓰이는 세 가지 함수

- `getStaticProps (Static Generation)`: build 시점에 데이터를 가져온다.
- `getStaticPaths (Static Generation)`: 데이터에 기반하여 pre-rendering할 특정 dynamic routes를 지정한다.
- `getServerSideProps (Server-side Rendering)`: 각 요청에 대해 데이터를 가져온다.

### getStaticProps (Static Generation)

```javascript
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
```

context는 다음의 파라미터를 포함하는 `객체`이다.

- params: dynamic routes를 사용하는 페이지에 대한 route 파라미터를 포함한다. 만약 page 이름이 `[id].js` 라면 파라미터는 다음과 같이 `{ id: ... }` 표시된다. 이는 `getStaticPaths`와 함께 사용된다.
- preview: 페이지가 preview 모드에 있으면 `true`이며, 그렇지 않으면 `undefined`이다.
- previewData: `setPreviewData`에 의해 설정된 preview 데이터를 포힘한다.
- locale: 활성화된 경우 active locale을 포함한다.
- locales: 활성화된 경우 지원되는 모든 locale을 포함한다.
- defaultLocale: 활성화된 경우 구성된 모든 locale을 포함한다.

`getStaticProps`는 다음과 같은 `객체`를 반환한다.

- props: 페이지 컴포넌트 구성 요소에서 전달받을 props가 있는 필수 개체이다. 반드시 직렬화 가능한 객체(serializable object)여야 한다.
- revalidate: 페이지의 re-generation이 발생할 수 있는 시간(초)이며 선택적이다.
- notFound: 페이지가 404 상태와 페이지를 반환할 수 있게 하는 선택적인 boolean 값이다. 단, `getStaticPaths`에서 리턴한 paths만 사전렌더되기 떄문에, fallback:false에서는 notFound가 필요하지 않다.

```javascript
export async function getStaticProps(context) {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
```

- redirect: 내외부의 리소스로 리디렉션 할 수 있는 선택적인 redirect 값이다. 다음과 같이 `{ destination: string, permanent: boolean }` 사용되어야 한다. 이전 http 클라이언트가 올바르게 리다이렉트 되더록 status code를 할당할 수 있다. 이 경우에는 statusCode 속성 대신 permanent 속성을 사용해야하고, 둘 다 사용할 수 없다. 빌드 시에는 허용되지 않고, 만약 빌드 시 리디렉션이 알려진 경우는 next.config.js에 추가해야 한다.

```javascript
export async function getStaticProps(context) {
  const res = await fetch(`https://...`);
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
```

`getStaticProps`에서 사용하기 위해 최상위 스코프의 모듈을 import할 수 있다. 단 클라이언트 측에 bundled로 제공되지는 않는다. 즉, `getStaticProps`에서 server-side 코드를 즉시 작성할 수 있다. 이는 파일 시스템이나 데이터베이스에서 읽는 것이 포함된다.

어플리케이션 내에서 fetch()를 api 경오를 call하는데 사용해서는 안된다. api route를 직접 import하여 함수를 호출해야한다. 외부 api에서 가져오는 것은 괜찮다.

아래는 `getStaticProps`를 사용하여 CMS에서 블로그 포스트 리시트를 가져오는 데 사용하는 예시이다.

```javascript
// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```

### 언제 `getStaticProps`를 사용해야 할까?

- 유저의 요청 전에 페이지를 렌더링하는 데 필요한 데이터가 요구될 때
- headless CMS에서 데이터를 가져올 때
- 사용자 별이 아닌 공개적으로 data가 캐시될 때
- 페이지가 미리 렌더링되어야하고(SEO), 매우 빨라야 할때. `getStaticProps`는 성능을 위해 CDN에서 캐시할 수 있는 HTML, JSON 파일을 생성한다.

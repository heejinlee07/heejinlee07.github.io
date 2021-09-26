---
title: Next.js v10 - next/images
date: 2020-11-24
tags:
---

## Images on the Web

이미지는 웹 페이지이에서 50%의 바이트를 차지하는데, 보통 페이지가 로드될 때 표시되는 가장 큰 요소인 경우가 많기 때문에 Largest Contentful Paint에 영향을 미친다. 모든 이미지의 절반은 그 사이즈가 1MB를 초과하기 때문에 웹에 디스플레이 될 때 최적화되지 않는다. 요즘에는 사용자들이 웹을 모바일, 태블릿, 컴퓨터 등 다양한 방식으로 웹을 탐색하는데 이미지는 아직도 one size로 고정되어 있다. 예를 들어 웹 사이트가 2000 x 2000 픽셀의 이미지를 로드한다고 하면, 모바일에서는 100 x 100 픽셀로만 표시한다. 더욱이 웹 페이지 이미지의 30%는 초기에 뷰포트 외부에 존재한다. 이는 브라우저가 유저가 스크롤을 내려서 아래에 있는 내용을 보기 전에도 브라우저가 이미지를 로드한다는 것이다.

웹페이지에서 이미지를 성능을 최적화하는 방식으로 사용하려면 size, weight, lazy loading, and modern image formats 등 고려해야 할 요소가 많다. 개발자는 이미지를 최적화하기 위해서 복잡한 빌드 도구를 설정해야 하는데 이러한 도구들이 일반적으로 외부 데이터 소스로부터 가져온 사용자가 제출한 이미지를 다루지는 않기 때문에 모든 이미지를 최적화할 수는 없다. 이는 필연적으로 사용자 경험을 저해시킨다.

## Next.js Image Component

가장 기본적인 Next.js 이미지 컴포넌트는 모던 웹을 위해 진화한 HTML의 \<img\> 요소의 대체물이다.

```html
<img
  src="/profile-picture.jpg"
  width="400"
  height="400"
  alt="Profile Picture"
/>
```

```javascript
import Image from 'next/image'

<Image src="/profile-picture.jpg" width="400" height="400" alt="Profile Picture">
```

`next/image` 컴포넌트를 사용하면 이미지가 자동으로 lazy-load되고, 이는 유저가 이미지를 실제로 보는 상황에 가까워졌을 때 비로소 렌더링됨을 의미한다. 이렇게 하면 초기 뷰포트 외부에 있는 이미지의 30%가 로딩되는 것을 방지할 수 있다. 이미지 사이즈는 강제적으로 적용되어, 브라우저가 로드될 당시에 이미지에 필요한 공간을 건너뛰어 레이아웃이 이동되는 현상을 막고 즉시 렌더링할 수 있다.

`width`와 `height`는 HTML의 \<img\> 요소에서는 *반응형 레이아웃*에서 문제가 발생할 수 있다. 하지만 `next/image`를 쓰면 제공된 `width`와 `height`의 비율에 따라서 자동으로 반응형 사이즈에 맞출 수 있다. 개발자는 초기 뷰포트에 이미지를 표시하여, Next.js가 자동으로 이 이미지를 사전에 로드하도록 할 수 있다.

## Automatic Image Optimization

`next/image` 컴포넌트는 built-in Image Optimization을 통해 자동으로 가장 작은 사이즈의 이미지를 생성한다. 이는 모든 이미지 소스에서 작동하므로, 외부 데이터 소스로 부터 가져온 CMS와 같은 이미지에도 최적화된다.

### 사용방법

```javascript
import Image from 'next/image';

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src='/me.png'
        alt='Picture of the author'
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}

export default Home;
```

위와 같이 `next/image`를 사용하는 것 외에 `next.config.js`을 통해 Image Optimization에 대한 보다 advanced use case를 적용할 수도 있다.

### Domains

외부 웹사이트에서 호스팅되는 이미지에 대해 죄적화를 사용하려면 이미지에 절대경로 url을 src로 사용하고, 어떤 도메인의 최적화를 허용할 것인지 설정한다. 이는 외부 url이 남용되지 않도록 하기 위해 필요한 것이다.

```javascript
module.exports = {
  images: {
    domains: ['example.com'],
  },
};
```

### Loader

Next js의 빌트인 이미지 최적화 기능 대신 클라우드 provider를 이용하여 이미지를 최적화하려면 로더와 path를 구성할 수 있다. 이는 이미지 src에 상대경로 url을 사용하여 provider가 올바른 절대 경로 url을 구성할 수 있도록 돕는다.

```javascript
module.exports = {
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
};
```

아래와 같은 클라우드 provider가 제공된다.

- Vercel: Works automatically when you deploy on Vercel, no configuration necessary. Learn more
- Imgix: loader: 'imgix'
- Cloudinary: loader: 'cloudinary'
- Akamai: loader: 'akamai'
- _Default: Works automatically with next dev, next start, or a custom server_

### Advanced

### Device Sizes

웹 사이트 사용자로부터 예상되는 장치의 width를 알고 있는 경우에 `deviceSizes` 프로퍼티를 사용하여 특정 장치 사이즈의 breackpoint를 지정할 수 있다. 이 width는 `next/image` 컴포넌트가 `layout="responsive"` 또는 `layout="fill"`을 사용할 때나 장치에 따른 올바른 이미지가 제공된다. 만약 따로 `deviceSizes` 프로퍼티를 지정하지 않으면 아래 값이 default로 사용된다.

```javascript
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};
```

### Image Sizes

`imageSizes` 프로퍼티를 이용하여 특정 이미지 width 목록을 지정할 수 있다. 이러한 width는 `deviceSizes`의 배열과 연결되어 있으므로 `deviceSizes`배열에 정의 된 width와 달라야하고, 일반적으로 그 배열의 width보다 작아야 한다. 이 width는 `next/image` 컴포넌트가 `layout="fixed"`또는 `layout="intrinsic"`를 사용해야한다. 만약 따로 `imageSizes` 프로퍼티를 지정하지 않으면 아래 값이 default로 사용된다.

```javascript
module.exports = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

---

## next/image

아래와 같이 사용한다.

```javascript
import Image from 'next/image';

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src='/me.png'
        alt='Picture of the author'
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}

export default Home;
```

### props

아래와 같은 속성들을 필요로 한다.

1. src
   : 소스 이미지의 경로 또는 url을 말하며, 필수이다. 외부 url을 사용한다면 반드시 `next.config.js`에서 domains를 추가해주어야 한다.
2. width
   : 이미지의 width를 말하며, 픽셀이다. 반드시 단위가 없는 정수이어야 한다. (layout='fill')이 아닌 경우에 필요하다.
3. height
   :이미지의 height를 말하며, 픽셀이다. 반드시 단위가 없는 정수이어야 한다. (layout='fill')이 아닌 경우에 필요하다.

### optional props

1. layout
   뷰포트 사이즈가 변화될 때 이미지의 layout behavior이다.
   - intrinsic: _기본값._ 이미지는 작은 뷰포트 크기에서는 축소되는데 큰 뷰포트에서는 원래 크기를 유지한다.
   - fixed: 이미지의 크기가 뷰포트의 변화에 따라 변화되어도 이미지 크기가 변경되지 않는다.(반응형 아님) HTML의 img 태그와 유사하다.
   - responsive: 이미지는 작은 뷰포트 크기에서는 축소되고, 큰 뷰포트에서는 확대된다.
   - fill: 이미지가 부모 요소의 width와 height의 크기에 따라 stretch된다. 보통 `object-fit`과 함께 사용된다.
2. sizes
   device sizes를 미디어 쿼리로 매핑하는 문자열. 기본값은 device sizes이다.
3. quality
   최적화 된 이미지의 품질. 1~100 사이의 정수이며, 100이 최고의 품질이다. 기본값은 75이다.
4. priority
   `true`이면 이미지가 높은 우선 순위로 간주되며, 미리 로드된다. 단, 이미지가 스크롤 없이 볼 수 있는 부분에만 표시되었을 때 사용해야 한다. 기본값은 `false`이다.

### Advanced Props

1. objectFit
   `layout="fill"`을 사용할 때 이미지가 fit된다.
2. objectPosition
   `layout="fill"`을 사용할 때 이미지의 위치를 말한다.
3. loading
   이미지가 로드될 때의 동작을 의미. 기본값은 `lazy`이다. `lazy`일 때 뷰포트로부터 계산된 거리에 도달할 때까지 이미지의 로드를 연기한다. `eager`라면 이미지를 즉시 로드한다.
4. unoptimized
   true인 경우 소스 이미지의 퀄리티, 사이즈 포맷이 변경 되는 대신 그대로 제공된다. 기본값은 false이다.

### Other Props

img 컴포넌트의 다른 요소들은 아래를 제외하고는 기본 요소로 전달된다.

- style 대신 className을 사용.
- srcSet 대신 Device Sizes를 사용.
- decoding은 항상 async이다.

---

_References_
[Next.js 10](https://nextjs.org/blog/next-10#built-in-image-component-and-automatic-image-optimization)
[next/image](https://nextjs.org/docs/api-reference/next/image)
[Image Component and Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

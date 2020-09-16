---
title: 리액트 라우터
date: 2020-06-17
tags:
---

## SPA

Single Page Application. 한 개의 페이지로 이루어진 어플리케이션. 예전에는 웹 페이지가 여러 페이지로 구성되어 있었고, 사용자가 다른 페이지로 이동할 때 마다 새로운 html을 받아오고, 서버에서 리소스를 받아서 해석한 뒤 화면에 렌더링하는 방식이었음.

## 모던 웹 어플리케이션

사용자와의 인터랙션이 자주 발생하는 모던 웹에서는 화면 전환이 일어날 때마다 html을 계속 서버에 요청하면 성능이슈가 있을 수 있고, 굳이 바뀌지 않아도 되는 부분도 새로 불러와서 보여줘야 하는 불필요한 로딩이 있다.

- 트래픽 과부하
- 서버부하

리액트와 같은 라이브러리가 뷰 렌더링을 사용자의 브라우저가 담당하도록 하고, 어플리케이션을 브라우저에 불러와서 실행시킨 후 사용자와의 인터랙션이 발생하면 필요한 부분만 JS를 이용하여 업데이트 한다. SPA는 사용자에게 제공하는 페이지는 한 종류지만 해당 페이지에 로딩된 JS와 현재 사용자의 브라우저 주소 상태에 따라 다양한 브라우저를 보여줄 수 있다. *이렇게 다른 주소에 다른 화면을 보여주는 것을 라우팅*이라 한다.

## BrowserRouter

라우터 사용 전에 react-routerr-dom을 설치해준다. BrowserRouter은 react-router-dom에 내장되어 있는 컴포넌트. 사용하려면 index.js파일에서 BrowserRouter로 `<App/>`을 감싸준다.

## Route

Route를 써서 특정 주소에 컴포넌트 연결. 어떤 규칙에 따라 어떤 컴포넌트를 보여줄지 지정하는 것.

```javascript
<Route path='주소규칙' component={보여 줄 컴포넌트}/>
```

여러 개의 path에 같은 컴포넌트를 보여주고 싶을 때 기존에는 아래와 같이 두 번 작성했다.

```javascript
<Route path='/about' component={About}/>
<Route path='/info' component={About}/>
```

이렇게 하는 대신 path props를 배열로 설정해 주면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다. _path를 쓸 때 맨 앞에 `/` 쓰는 것을 잊지 않도록 한다. `/`가 빠지면 route의 주소를 제대로 받아올 수 없다. /users/:id에 id로 올 값이 'a', 'b'가 있다면 어떤 링크를 클릭하느냐에 따라 /user/a, /user/b로 주소가 받아와져야 한다. 만약 `/`를 빠뜨리면 /user/user/a, /user/user/a/b 이런 식으로 기존 주소에 새로 클릭하는 링크주소가 계속 붙여져서 제대로 된 경로를 찾지 못한다._

> path: string | string[]

```javascript
<Route path="/users/:id">
  <User />
</Route>

<Route path={["/users/:id", "/profile/:id"]}>
  <User />
</Route>
```

## Link

클릭하면 다른 주소로 이동시켜 주는 컴포넌트. 일반 웹 어플리케이션에서는 `a태그`를 사용하여 페이지를 전환하는데 리액트 라우터에서는 a태그를 사용하지 않는다. a 태그를 사용하면 페이지를 전환하는 과정에서 새로 페이지를 불러오기 때문에 어플리케이션이 들고 있던 상태들을 모두 날려버린다. 컴포넌트들이 다시 렌더링된다.

```javascript
<Link to="주소">내용</Link>
```

## URL 파라미터와 쿼리

페이지 주소 정의시 유동적인 값을 전달해야 할 때 사용.

- 파라미터: /profiles/velopert
- 쿼리: /about?details=true

일반적으로 파라미터는 특정 아이디나 이름을 사용하여 조회할 때 사용. 쿼리는 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용.

### URL 파라미터

라우트로 사용되는 컴포넌트에서 받아오는 `match`라는 객체 안의 params 값을 참조. 이 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어있다.

> path 사용규칙: /profiles/`:username`  
> `:username`과 같이 사용하면 `match.params.username` 값을 통해 현재 설정된 username값을 조회할 수 있다.

위와 같이 설정했다면 profile 컴포넌트에서는 `match`를 props로 받아와서 유동적인 username에 따라 해당값을 조회할 수 있게 한다.

### useParams

URL 파라미터의 key/value object를 리턴하는 hook이다. 이를 이용해서 현재 <Route>의 match.params에 접근할 수 있다.

```javascript
function BlogPost() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:slug">
        <BlogPost />
      </Route>
    </Switch>
  </Router>,
  node
);
```

### URL 쿼리

location 객체에 들어 있는 search 값에서 조회할 수 있고, Route로 사용된 컴포넌트에게 props로 전달된다. search 값은 문자열 형태이기 때문에 `qs`라이브러리를 설치해서 객체로 변환해서 읽어올 수 있도록 한다.

```javascript
const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
    //문자열 맨 앞의 ?를 생략
  });
  const showDetail = query.detail === "true";
  //쿼리 파싱 결과 값은 문자열
```

쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열이다. 따라서 만약 숫자를 받아와야 한다면 `parseInt`를 통해 꼭 숫자로 변환시켜줘야 한다. 혹은 value =1 또는 value=true와 같은 형태를 사용한다면 'true'와 문자열이 일치하는지 비교한다.

### UseLocation

현재의 URL을 나타내는 객체를 리턴하는 hook이다. url이 변경될 때마다 useState처럼 새로운 location을 반환하는 것이라고 생각할 수 있다.

```javascript
function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]);
}

function App() {
  usePageViews();
  return <Switch>...</Switch>;
}
```

## 서브라우트

라우트 내부에서 또 라우트를 정의하는 것.

```javascript
 <Route
  path="profiles"
  exact
  render={() => <div>사용자를 선택해 주세요</div>}
/>
<Route path="/profiles/:username" component={Profile} />
```

첫 번째 라우트 컴포넌트처럼 component 대신 props를 넣어줄 수 있는데, 이는 컴포넌트 자체를 전달하는 것이 아닌, 보여주고 싶은 JSX를 넣어주는 것.

## history

match, location처럼 라우트로 사용되는 컴포넌트에 전달되는 props 중 하나, 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있다.

- 특정 버튼을 눌렀을 때 뒤로가기
- 로그인 후 화면 전환
- 다른 페이지로 이탈 방지

```javascript
//useHistory hook 사용
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

## withRouter

HOC로 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 한다.

## Switch

여러 route를 감싸서 그중 일치하는 단 하나의 라우트만 렌더링시켜준다. 모든 규칙과 일치하지 않을 때 보여줄 `Not Found`도 구현할 수 있다. 아래와 같이구현하면 처음으로 매치되는 항목인 `path="/"`을 화면에 보여준다. 만약 이 경로에 `exact`라는 키워드가 붙어있지 않았다면 `path="/about", "/info"`가 렌더링 되었을 것이다. 만약 지정된 path가 아닌 임의의 경로, 예를 들어 `/abc`와 같이 입력했다면 Switch 내부에서 일치하는 라우트를 찾지 못하게 되었으므로 가장 마지막에 설정된 `Not Found` 관련 라우트가 렌더링된다.

```javascript
<Switch>
  <Route path="/" component={Home} exact />
  <Route path={["/about", "/info"]} component={About} />
  <Route path="/profiles" component={Profiles} />
  <Route path="/history" component={HistorySample} />
  {/* <Route path="/profile/:username" component={Profile} /> */}
  {/* <Route path="/about" component={About} /> */}
  <Route
    // path를 따로 정의하지 않으면 모든 상황에 렌더링됨.
    render={({ location }) => (
      <div>
        <h2>이 페이지는 존재하지 않습니다.</h2>
        <p>{location.pathname}</p>
      </div>
    )}
  />
</Switch>
```

## NavLink

Link와 비슷하다. 현재 경로와 Link에서 사용하는 경로가 일치할 때 특정 스타일이나 CSS 클래스를 적용할 수 있는 컴포넌트를 말한다. NavLink가 활성화되었을 때 스타일을 적용하려면 `activeStyle`을 사용하고, CSS클래스를 적용할 것이면 `activeClassName`값을 props로 넣어준다.

```javascript
const Profiles = () => {
  const activeStyle = {
    background: "black",
    color: "white"
  };
  return (
    <div>
      <h3>사용자목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/velopert">
            velopert
          </NavLink>
        </li>
```

_Reference_
[react-router](https://reacttraining.com/react-router/web/guides/quick-start)
리액트를 다루는 기술

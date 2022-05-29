#실습환경 구축

$ npx create-react-app .

설치하면 디렉토리에 뭐 이것저것 파일이 생기고 커맨드라인에 아래와같은 문구들이 나옴


  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd /Users/seunghoon/Desktop/IhaveaDream/생활코딩강의/react-app
  npm start

Happy hacking!


내가 사용 할 수 있는 명령어들인데 
그중에 제일먼저 npm start를 알아보자면 커맨드라인에서 $ npm start 를 실행하게되면 
리액트 개발환경이 실행되면서 코딩할 수 있는 환경이 동작하기 시작한다. 

즉, 브라우저가 켜지면서 하기 이미지1과 같은 샘플 어플리케이션이 실행된다. 



# 소소코드 수정방법

지금까지 설치를 하였고 이제 수정을 어떻게 하는지 알아보고 
그 다음에는 그렇게 만들어진 결과물을 어떻게 배포하는지 살펴볼 것이다. 

이번에는 수정하는법을 공부해보자. 
create-react-app 을 이용하여 개발환경을 세팅하면 어떤 디렉토리 구조를 가지게 되는지부터 알아보자 

일단 제일 중요한건 src라는 폴더이다. 
그안에는 index.js 라는 파일이 있는데 
이 파일이 바로 입구파일이다. 
******************************************************************************************************************************
(index.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />     <- 이게 사실 전부여
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
******************************************************************************************************************************

즉, 내가 npm start 를 통해 create-react-app 을 구동시키면 
이 도구는 index.js 파일을 찾고 거기에 있는 내용대로 동작하게 되는것이다. 

그렇다면 이미지1의 UI는 어떻게 코드로 표현이 된것인가?
<App />
이 코드하나에 UI가 모두 담겨있어 저 <App /> 코드를 지우면 이미지2 처럼 빈 화면이 나오게 된다. 

즉, 저 <App /> 태그하나가 UI 전체이다. 
그렇다면 저 <App /> 의 실제내용은 어디에 있는가하면 
저 <App /> 은 

import App from './App';

여기서 가져온것이다. 
즉, 현재 src 폴더안의 App.js 파일로부터 저 <App /> 태그가 온 것 이다. 

******************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
******************************************************************************************************************************

App.js 를 열면 위의 코드에서 보다시피 
App 이라는 함수가 있다. 

저 함수 안의 코드가 이미지1의 화면을 구성하고 있는것이다. 


정리하자면 
src 폴더안의 index.js가 입구파일이고 
index.js 에는 여러가지 전역적인 설정들이 들어가있다. 

그리고 그안의  <App /> 안에는 App.js 라는것이 들어가있고 
그 안에서 내가 내용을 편집해가면서 UI 를 만들어가는것이다. 
또한 저 App.js 에서 import 하고 있는 App.css를 통해 디자인을 변경할 수 있다. 

그리고 index.js에서도 index.css 라는 파일을 가져오는데 이 index.css와 App.css 를 다 지워주면 
기본적으로 초기화된 깔끔한 디자인으로 시작할 수 있게된다. 


아래와같은 코드구성으로 앱을 실행하였다.
******************************************************************************************************************************
(App.js)
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      Hello React!
    </div>
  );
}

export default App;

(index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
******************************************************************************************************************************


하기 이미지3과 같은 화면이 출력되고 HTML 코드를 확인해보니 이상한게 하나 있다. 
<div class="App">Hello React!</div> 
  -> 이부분은 App.js에서 온거 알겠다. 

그렇다면 
<div id="root"> 
.
.
</div>

이 root 는 어디서 온걸까?
index.js 의 아래부분의 코드의 의미는  <App /> 이 태그가 id 값이 "root" 인 태그로 렌더링되라 라는 의미이다. 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

그렇다면 id값이 root 인 저 태그는 대체 어디에 있는걸까 
고것은 public 이라는 폴더안에 있다. 

public 폴더안에는 index.html 이라는 파일이 있고 그안에 id 가 root 인 태그가 들어있다. 
******************************************************************************************************************************
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    .
    .주석들
    .
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    .
    .주석들
    .
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>                <-- 요기잉네?
    .
    .주석들
    .
  </body>
</html>
******************************************************************************************************************************

자 지금까지 "설치"와 "수정"을 알아봤다. 
이제 "배포" 를 알아볼 차례이다. 

npm start 를 통해 실행된 이 애플리케이션은 개발을 위한 애플리케이션이다. 
개발하기엔 좋지만 실제로 서비스하기엔 용량도 크고 불필요한 메시지도 표시되어있고 그래서 실제로 서비스에 사용하기엔 적절하지 않다. 
그렇다면 어떻게 서비스하기 적절한 배포본을 만들 수 있는가? 

$ npm run build 

커멘드라인에 위처럼 build 명령을 내려주면된다. 
그러면 이제 build라는 폴더가 하나 생긴다. 

그리고 그 폴더안에는 index.html을 의지한 다른 파일들이 존재하게 된다. 
그리고 build 폴더안의 index.html 파일을 열어보면 공백조차도 없다. 
당연히 배포할 때 파일의 용량을 줄이기 위함 이다. 

그렇다면 이 배포용 파일을 어떻게 실행시켜야 할까 
build 명령을 실행하면 아래와같이 커맨드라인에 build한걸 서비스할 때 serve 라는 앱을 사용할것을 추천한다는 문구가 있다. 

******************************************************************************************************************************
($ npm run build 후 커맨드라인)

➜  React-App git:(master) ✗ npm run build

> react-app@0.1.0 build
> react-scripts build

Creating an optimized production build...
Compiled with warnings.

src/App.js
  Line 1:8:  'logo' is defined but never used  no-unused-vars

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.

File sizes after gzip:

  46.17 kB  build/static/js/main.293b5187.js
  1.78 kB   build/static/js/787.b701888c.chunk.js
  92 B      build/static/css/main.3cf4f106.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:                              <- 여기서 serve 쓰라고 추천을 하네

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment
******************************************************************************************************************************

$ npm install -g serve
$ serve -s build

이 serve는 웹서버인데 그 웹서버가 가지고있는 옵션 중 -s 라는 옵션을 주게되면 
사용자가 어떠한 경로를 통해서 들어오건간에 index.html 파일을 서비스해준다. 

그리고 build 는 폴더를 지정한건데 build 라는 폴더의 index.html 파일을 서비스해주겠다라는 뜻 이다. 

serve는 nodeJS 로 만든 어플리케이션이기 때문에 그냥 간단하게 실행시키려면 npx 사용하면 됨. 

$ npx serve -s build

  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │   Serving!                                          │
  │                                                     │
  │   - Local:            http://localhost:3000         │
  │   - On Your Network:  http://192.168.219.102:3000   │
  │                                                     │
  │   Copied local address to clipboard!                │
  │                                                     │
  └─────────────────────────────────────────────────────┘


  build 폴더안의 index.html 을 서비스하는 웹서버가 실행이 된다. 
  그리고 접속할 수 있는 주소들이 위처럼 나오는데 

브라우저를 통해 localhost:3000 으로 접속해주면 똑같은 어플리케이션이 나오고 (이미지4 참고)
아것은 개발환경을 위한 버전이 아니라 실제로 서비스에서 사용할 수 있는 버전의 파일이 만들어지고 실행된것이다. 



# 컴포넌트만들기

리액트는 사용자정의 태그를 만드는 기술이다. 
이것이 리액트의 본질이다. 

리액트에서 어떻게 사용자정의 태그를 만드는지 알아보자. 

******************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <h1><a href='/'>WEB</a></h1>
      </header>
      <nav>
        <ol>
          <li><a href='/read/1'>html</a></li>
          <li><a href='/read/2'>css</a></li>
          <li><a href='/read/3'>js</a></li>
        </ol>
      </nav>
      <article>
        <h2>Welcome</h2>
        Hello, WEB
      </article>
    </div>
  );
}

export default App;
******************************************************************************************************************************

위와같이 App.js 를 수정하였다. 
그리고 저 안의 header, nav, article 들이 각각 1억줄씩 있다고 상상을 해보자. 
그러면 이 웹페이지가 어떻게 생겨먹었는지 파악하기가 아주 힘들겠지. 

이렇게 어지럽혀져 있는 상황에서 우리는 정리정돈을 하고싶어진다. 
정리정돈의 핵심은 서로 연관된것들끼리 모으는것 이다. 그룹핑을 하는거지. 
그리고 그룹핑한것에 이름을 붙이게되면 이후에 우린 그 이름만 생각하면 되게 되는것이다. 

즉, 아래와같은 복잡한 태그들을 하나의 태그로 만들 수 있다는 것 이다. 

<header>
<h1><a href='/'>WEB</a></h1>
</header>

자 그럼 이제 사용자정의 태그를 직접 만들어보자. 
사용자정의 태그를 만들 땐 함수를 정의해주면 된다. 
또한 리액트에서 사용자정의태그를 만들땐 반드시 대문자로 시작해야한다. 

******************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';

function Header() {               <- 여기서 사용자정의 태그를 만들어주었고
  return(
    <header>
        <h1><a href='/'>WEB</a></h1>
    </header>
  )
}

function App() {
  return (
    <div>
      <Header></Header>           <- 그것을 여기다가 가져다 쓴것이여!!
      <nav>
        <ol>
          <li><a href='/read/1'>html</a></li>
          <li><a href='/read/2'>css</a></li>
          <li><a href='/read/3'>js</a></li>
        </ol>
      </nav>
      <article>
        <h2>Welcome</h2>
        Hello, WEB
      </article>
    </div>
  );
}

export default App;
******************************************************************************************************************************

이렇게 사용자정의 태그를 사용하면 여러곳에 <Header> 태그를 사용하였을 때 그 안의 내용물을 사용자정의 태그를 정의해줬던 함수안에서만 변갱해주면 
여러곳의 1억개의 <Header> 태그가 한번에 바꾸게되는 폭발적인 효과가 생기는것이다. 
(마치 Javascript 객체지향프로그래밍에서 Prototype과도 유사하다는 생각이 든다.)

자 그럼 사용자정의 태그를 만들어보았는데 리액트에선 "사용자정의 태그" 라는 표현은 쓰지 않는다. 
"컴포넌트" 라는 표현을 쓴다. 

자 그럼 이제 기타 <nav> 영역과 <article> 영역도 컴포넌트로 만들어주면 아래와 같다. 
******************************************************************************************************************************
(App.js)
import logo from './logo.svg';
import './App.css';

function Header() {
  return(
    <header>
        <h1><a href='/'>WEB</a></h1>
    </header>
  )
}
function Nav() {
  return(
    <nav>
      <ol>
        <li><a href='/read/1'>html</a></li>
        <li><a href='/read/2'>css</a></li>
        <li><a href='/read/3'>js</a></li>
      </ol>
    </nav>
  )
}
function Article() {
  return(
    <article>
      <h2>Welcome</h2>
      Hello, WEB
    </article>
  )
}
function App() {
  return (
    <div>
      <Header></Header>  
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}
export default App;
******************************************************************************************************************************

위처럼 컴포넌트를 이용하게 되면 기존에는 3억줄(상상)이었던 코드가 3줄로 간단하게 바뀌었고 ,
각각의 코드가 이름을 가지고있기 때문에 어더한 취지이 코드인지도 금방 파악할 수 있고, 
또한 컴포넌트안의 내용을 바꾸면 이 컴포넌트를 사용하는 모든곳에서 동시다발적으로 내용이 바뀌는 폭발적인 효과도 누릴 수 있다. 

이것이 바로 리액트의 본질이다. 
이렇게 컴포넌트를 만드는 기술인 리액트 덕분에 여러 태그들을 하나의 독립된 부품으로 만들 수 있게 되었고 
그 부품을 이용하면 더 적은 복잡도로 S/W 를 만들 수 있게 된것이다. 
동시에 내가 만든 컴포넌트를 타인에게 공유할 수 있고, 타인의 컴포넌트를 내 프로젝트에도 사용할 수 있게함으로서 생산성을 획기적으로 끌어올리는 굉장이 중요한 역할을 하고 있고 
그만큼 거대한 리액트 생태계가 존재하고 있는것이다. 


# props

-.내가 만든 컴포넌트 
<Header></Header>  
<Nav></Nav>
<Article></Article>

-.기존의 HTML 태그
<img src="img.jpg" width="100" height="100"></img>

위의 두개를 비교해보면 기존 HTML 태그는 내가 만든 컴포넌트와는 다른 요소를 가지고있다. 
src 가 무엇이냐에 따라서 이미지가 달라진다. 
width, height 값이 무엇이냐에 다라서 이미지의 크기가 달라진다. 

즉, src, width 같은 속성들 덕분에 img 태그는 입력값을 가질 수 있게되는것이다. 

자 내가 만든 컴포넌트도 저렇게 속성을 가지면 참 좋겠다. 
리액트에서는 속성을 Prop 이라고 부른다. 
이제부터 내가만든 컴포넌트에 어떻게 prop 을 장착할 수 있는지 알아보자. 

<Header></Header>  에 title 값을 넣어주면 

function Header() {
  return(
    <header>
        <h1><a href='/'>WEB</a></h1>
    </header>
  )
}

여기서 WEB 이라고 적힌 부분의 값을 대체할 수 있도록 만들어보자. 

******************************************************************************************************************************
(App.js)
import logo from './logo.svg';
import './App.css';
import { PromiseProvider } from 'mongoose'

function Header(props) {
  console.log('props', props);
  return(
    <header>
        <h1><a href='/'>WEB</a></h1>
    </header>
  )
}
.
.
.
function App() {
  return (
    <div>
      <Header title="REACT"></Header>  
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}
export default App;

(브라우저 콘솔창)
props {title: 'REACT'}
title: "REACT"
[[Prototype]]: Object
******************************************************************************************************************************

자 위처럼 props를 console.log() 해보니 
props에는 객체가 들어와있고 그 객체에는 {title: 'REACT'} 라고 되어있다. 

자 그러면 내가 저 'REACT' 라는 텍스트를 얻어내려면 어떻게 해야할까?
props.title 을 통해 가져올 수 있지 않을까? 
맞다. props.title로 콘솔창에 띄울 수 있다. 

console.log('props.title', props.title); -> props.title REACT


그렇다면 아래처럼 props.title을 넣어주면 브라우저에서 띄울수 있을까?
******************************************************************************************************************************
function Header(props) {
  console.log('props', props);
  return(
    <header>
        <h1><a href='/'>props.title</a></h1>
    </header>
  )
}

(브라우저 출력)
props.title
******************************************************************************************************************************

아니다. 브라우저에도 "props.title" 이라는 텍스트가 그대로 출력된다. 
리액트에서는 표현식이라는것을 나타내주기위해서 중괄호 {} 를 사용한다. 
즉, props.title 을 내가 의도한 props 객체의 title 프로퍼티를 가져오게 하기 위해선 아래처럼 
중괄호를 이용해야 하고 그렇게 하면 내가 의도한대로 브라우저에 표현이 된다. 

******************************************************************************************************************************
function Header(props) {
  console.log('props', props);
  return(
    <header>
        <h1><a href='/'>{props.title}</a></h1>
    </header>
  )
}
.
.
.
function App() {
  return (
    <div>
      <Header title="REACT"></Header>  
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}
export default App;

(브라우저 출력)
REACT
******************************************************************************************************************************

마찬가지도 Article 에도 props를 사용하여 아래와같이 표현해 줄 수 있다. 
******************************************************************************************************************************
import logo from './logo.svg';
import './App.css';
.
.
.
function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function App() {
  return (
    <div>
      <Header title="REACT"></Header>  
      <Nav></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}
export default App;
******************************************************************************************************************************


자 이제 Nav 를 props 를 이용하여 구성해볼것이다. 
topics라는 배열을 만든 뒤 그 배열을 Nav 컴포넌트에 topics 라는이름의 props로 넣어준 후 
아래처럼 배열을 만들어 <ol></ol> 안에 넣어주면 된다. 
리액트에서는 중괄호안에 배열을 넣어주면 그 배열안의 내용들을 순서대로 배치시킨다.
******************************************************************************************************************************
import logo from './logo.svg';
import './App.css';
.
.
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li>{t.title}</li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
.
.
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:1, title:'css', body:'css is...'},
    {id:1, title:'javascript', body:'javascript is...'}
  ];
  return (
    <div>
      <Header title="WEB"></Header>  
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}
export default App;
******************************************************************************************************************************

또한 nav 안의 값들을 태그로 감싸주고 아래처럼 링크주소를 입력해준뒤 실행을 시켜보니 
아래와 같은 에러메시지가 나온다. 
******************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';
.
.
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li><a href={'/read/' + t.id}>{t.title}</a></li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
.
.
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:1, title:'css', body:'css is...'},
    {id:1, title:'javascript', body:'javascript is...'}
  ];
  return (
    <div>
      <Header title="WEB"></Header>  
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}
export default App;

(브라우저 콘솔)
Warning: Each child in a list should have a unique "key" prop.

Check the render method of `Nav`. See https://reactjs.org/link/warning-keys for more information.
    at li
    at Nav (http://localhost:3000/static/js/bundle.js:108:29)
    at div
    at App
******************************************************************************************************************************

저 에러메세지가 무슨말이냐면 
우리가 동적으로 만들어주는 저 각각의 li 태그들은 
각자 "key" 라고하는 prop을 가지고있어야하고 
그 key 라는 prop의 값은 그 "반복문 안에서는 고유한 값을 가져야한다"는 말 이다. 

아래처럼 각각의 li에 key 라는 prop을 주고 그 안에 t.id를 넣어주면 된다.
(t.id 실수로 다 1로 넣었는데 수정함, 위 코드랑 비교해보면 다름)

******************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';
.
.
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/' + t.id}>{t.title}</a></li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
.
.
.
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  return (
    <div>
      <Header title="WEB"></Header>  
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}
export default App;
******************************************************************************************************************************

저 key 값을 정해줘야하는 이유는 지금수준에서 알기에는 시기상조 
간단하게 일단 알자면 리액트는 이렇게 자동으로 생성한 태그의 경우에는 리액트가 이 태그들을 추적해야하는데 
그 추적할때의 근거로서 사용하기 위함이다. 
추적을 하는 이유는 리액트가 성능을 높이고 동작을 하는데 협조를 하기 위함이다. 


# 이벤트 




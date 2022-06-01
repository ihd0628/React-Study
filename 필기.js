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

import React, { useState } from 'react';
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
import { deleteModel, PromiseProvider, STATES } from 'mongoose'

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
(topics.id 실수로 다 1로 넣었는데 수정함, 위 코드랑 비교해보면 다름)

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

_<input type="button" onclick="alert('hi')">

위의 HTML 태그를 보면 onclick 이란게 있다. 
저것 덕분에 사용자가 버튼을 클릭했을 때 경고창을 띄울 수 있다. 

현재까지 재가 만든 컴포넌트에 props, 즉, 속성은 있지만 아직 이벤트는 없다. 

나의 컴포넌트에도 이벤트 기능을 추가하여 컴포넌트에 어떤일이 발생했을 때 사용자가 추가적인 작업을 처리 할 수 있도록 만들어보자. 

아래의 코드를 보면 Header 태그에는 a 태그가 있는데 
a태그에 onClick 이라고 이벤트를 걸어주었다. 
아래의 코드의 a태그는 순수한 HTML 태그와 똑같지 않다. 유사 HTML 태그이다. 
내가 아래의 코드를 작성해주면 REACT 개발환경이 이걸 최종적으로 브라우저가 이해할 수 있는 HTML 로 컨버팅해주는것이기 때문에 
여기서 사용하는 문법은 똑같지 않다. 
그리고 자세히보면 onclick 이 원래 순수 HTML 문법이라면 아래의 코드에는 onClick 이다. C 가 대문자다. 

onClick 이벤트를 걸어줌으로서 저 a태그를 클릭했을 때 함수를 실행시켜줄것이다.(그러니 중괄호를 쓰고 그안에 함수를 넣는것이다.) 
또한 a태그를 클릭했을때의 기본동작인 페이지 리로드를 막기위해 event.preventDefault() 해주고 
props 안에 있는 onChangeMode() 메소드를 실행시켜주면 경고창이 뜨게 된다. 

******************************************************************************************************************************
(App.js)
import logo from './logo.svg';
import './App.css';

function Header(props) {
  console.log('props', props);
  console.log('props.title', props.title);
  return(
    <header>
        <h1><a href='/' onClick={function(event){
            event.preventDefault();               <- 페이지 리로드되는 a태그의 기본동작 막아주고 
            props.onChangeMode();                 <- App() 에서 넘겨준 alert 를 실행시킨다. 
        }}>{props.title}</a></h1>
    </header>
  )
}
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
      <Header title="WEB" onChangeMode={function(){
        alert("Header!!");
      }}></Header>  
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}
export default App;
******************************************************************************************************************************

아래처럼 arrow_function 을 사용하면  코드를 좀 더 간략화 할 수 있다. 
******************************************************************************************************************************
(App.js)
import logo from './logo.svg';
import './App.css';

function Header(props) {
  console.log('props', props);
  console.log('props.title', props.title);
  return(
    <header>
        <h1><a href='/' onClick={(event)=>{
            event.preventDefault();               <- 페이지 리로드되는 a태그의 기본동작 막아주고 
            props.onChangeMode();                 <- App() 에서 넘겨준 alert 를 실행시킨다. 
        }}>{props.title}</a></h1>
    </header>
  )
}
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
      <Header title="WEB" onChangeMode={()=>{
        alert("Header!!");
      }}></Header>  
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}
export default App;
******************************************************************************************************************************

그 다음으로는 Nav를 클릭했을 때 각각의 순서에 맞게 경고창에 1,2,3 을 띄우도록 하고 싶다. 
아래처럼 코드를 작성하였고 현재까지 내가 느낀바 App이 내가 만든 컴포넌트들을 사용하는곳이다. 
또한 App 에서  사용된 컴포넌트들의 세부내용들 즉, 그 컴포넌트들이 기존의 HTML 코드로는 어떤 형상인지에 대해서는 
위의 컴포넌트들의 이름을가진 함수들에서 알 수 있다. 

그러니 App 에서 이벤트발생 시 실행시켜야할 함수를 넣어주면 컴포넌트의 이름을 가진 함수에서 그 함수를 받아서 
이벤트 핸들러를 통해(이 이벤트핸들러는 또 리액트개발환경에서만 통용되는 문법이다 ex. onClick) 그 함수를 실행시키는 것 이다. 

******************************************************************************************************************************
(App.js)
import logo from './logo.svg';
import './App.css';
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a href={'/read/' + t.id} onClick={(event)=>{   <- 1. 리액트 개발환경에서 사용되는 이벤트를 걸어주고 
          event.preventDefault();                     <- 2. 기존 a태그를 클릭하면 페이지 리로드되는 기본동작을 막아준 뒤
          props.onChangeMode(t.id);                   <- 3. App 에서 보내준 함수를 실행시키는것.
      }}>{t.title}</a>
      </li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        alert("Header!!");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(id)=>{
          alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}
export default App;
******************************************************************************************************************************

위와 동일한 방법이지만 a태그에 id 를 설정해주고 event 발생 시 event가 발생한 태그의 속성을 가져다 쓸 수도 있다. 
아래의 코드 참고 
******************************************************************************************************************************
(App.js)
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a href={'/read/' + t.id} onClick={(event)=>{   
          event.preventDefault();                     
          props.onChangeMode(t.id);                   
      }}>{t.title}</a>
      </li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(event)=>{   <- 1. a 태그의 id 를 지정해주고
          event.preventDefault();                      
          props.onChangeMode(event.target.id);                  <- 2. event가 발생한 target 태그의 id 값을 가져온것이다. 
      }}>{t.title}</a>
      </li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
******************************************************************************************************************************

자 지금까지 목록안에서 링크를 설치하고 그 링크가 이벤트를 호출할 때 어떠한 입력값을 주는방법을 살펴보았다. 
이벤트를 가진 컴포넌트를 만들 수 있게 되었다. 






# state 

하기 이미지5 참고
리액트의 컴포넌트는 입력과 출력이 있고 입력으로 prop 을 받고 prop을 통해서 입력된 데이터를 
내가 만든 컴포넌트 함수가 처리해서 return 값을 만들면 바로 그 return 값이 새로운 UI 가 되는것이다. 

그런데 prop과 함께 컴포넌트 함수를 다시 실행해서 새로운 return 값을 만들어주는 또 하나의 데이터가 있는데 
그것이 바로 state 이다. 
prop과 state 모두 이 값이 변경되면 새로운 return 값을 만들어서 UI 를 바꾼다. 

그런데 prop 과 state 의 차이점은 "prop은 컴포넌트를 사용하는 외부자를 위한 데이터" 이고 
"state는 컴포넌트를 만드는 내부자를 위한 데이터" 이다. 

자 이걸 기억하고 앞으로 내가 만들어갈 목표는 다음과 같다. 
하기 이미지6에서 1부분을 클릭하면 그에따라 2부분의 내용이 바뀌게 하는 것 이다. 

일단 mode 라는 파리미터를 만든 뒤 이 mode 의 값이 무엇이냐에 따라 내용이 바뀌게 로직을 만들어보자. 

******************************************************************************************************************************
(App.js)

function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  let mode = "Welcome";                                               <- mode의 값이 무엇이냐에 따라서 
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>   <- Article 값이 바뀐다. 
  } else if(mode === 'Read') {
    content = <Article title="Read" body="Hello, Read"></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        alert("Header!!");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(id)=>{
          alert(id);
      }}></Nav>
        {content}
    </div>
  );
}
export default App;
******************************************************************************************************************************


자 그렇다면 아래처럼 Header 를 클릭했을 때, Nav 를 클릭했을 때 mode의 값을 각각 주게되면 
조건문에 따라서 content의 값이 변경되지 않을까?
그러면 상기 이미지6의 2부분이 바뀌지 않을까?
******************************************************************************************************************************
(App.js)
function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  let mode = "Welcome";
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
    content = <Article title="Read" body="Hello, Read"></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          mode="Welcome";                         <- Header 를 클릭하면 mode 에 "Welcome" 값을 주고
      }}></Header>  
      <Nav topics={topics} onChangeMode={(id)=>{
          mode="Read";                            <- Nav 를 클릭하면 mode에 "Read" 값을 주면 content의 값이 실시간으로 바뀌지 않을까?
      }}></Nav>
        {content}
    </div>
  );
}
export default App;
******************************************************************************************************************************

아니죵 전혀 안바뀌죵 
왜냐?
내가 mode의 값을 바꾼건 맞지만 저 App() 함수가 다시 실행된것은 아니기 때문에 
return 값에는 변화가 없는것이다. 

즉, 내가 하고싶은것은 mode의 값이 바뀌면 이 컴포넌트함수가 새로 실행되면서 새로운 return 값이 만들어지고 
그 return 값이 UI 에 반영되는것이다. 
자 이때 사용하는것이 "state" 다.

state를 사용하기 위해서는 REACT 에서 기본적으로 제공하는 useState 라는 훅을 import 해줘야 한다. 
 -> import { useState } from 'react';
"훅" 이란건 REACT 에서 기본적으로 제공하는 함수를 지칭한다. 

현재 mode는 그냥 일반적인 지역변수인데 이 지역변수를 state 즉, 상태로 업그레이드 시킬것이다. 
하기처럼 useState를 적어주면 상태를 만들어주게 되는것이다. 

let _mode = useState("Welcome");

이렇게 상태를 만들어주면 이 상태가 return 될틴데 이 return 된 결과를 _mode 라고 이름을 지었다. 
그리고 
console.log(_mode); 
를 통해 이 _mode 를 출력해보면 

(2) ['Welcome', ƒ]
0: "Welcome"
1: ƒ ()
length: 2
[[Prototype]]: Array(0)

위와같은 값이 나온다. 
0번째 원소는 "Welcome" 이다. 내가 넣어준 값이 나온것이다. 
1번째 원소는 함수다. 

즉, useState 는 배열을 return 하고 0번쨰 데이터는 상태의 값을 읽을 때 쓰는 data
1번째 데이터는 그 상태의 값을 변경할 때 사용하는 함수 이다. 

자 그럼 어떻게 하면 될까?
일단 mode = _mode[0] 을 해주면 mode 값을 통해서 상태 값을 읽을 수 있게 되겠다. 

다음에 setMode = _mode[1] 을 통해 
_mode 배열의 1번쨰 원소인 setMode 를 통해서 mode의 값을 바꿀 수 있다라는 규칙이 있는것이다. 

정리하자면 
useState('인자') 의 인자는 그 state의 초기값이다. 
그리고 state 의 값은 0번쨰 index 의 값으로 읽는다. 
state 를 바꿀 땐 1번째 index의 함수로 바꾼다. 

추가적으로 아래처럼 코드를 축약할 수 있다. 
  const _mode = useState("Welcome");
  const mode = _mode[0];
  const setMode = _mode[1];
  
   => const [mode, setMode] = useState("Welcome");

자 그럼 이제 mode의 값은 setMode 를 통해 바꿀 수 있다. 
즉, setMode("Read") 라고 코드를 작성하면 _mode[0] 의 값이 바뀌는것이다. 
그러면 App 컴포넌트가 다시 실행되고 그러면서 useState 가 mode의 값을 "Read" 로 세팅해주고 
그렇게되면 조건문에 따라 content 의 내용이 바뀔것이고 그것이 화면에 렌더링되면서 
우리가 의도한대로 Header 와 Nav 를 클릭함에 따라 이미지6의 2 부분이 바뀌게 되는것이다. 

이 모든것을 적용한 코드가 아래와 같다. 

******************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log('props', props);
  console.log('props.title', props.title);
  return(
    <header>
        <h1><a href='/' onClick={(event)=>{
            event.preventDefault();
            props.onChangeMode();
        }}>{props.title}</a></h1>
    </header>
  )
}
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(event.target.id);
      }}>{t.title}</a>
      </li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  // const _mode = useState("Welcome");
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState("Welcome");
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
    content = <Article title="Read" body="Hello, Read"></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");                   <- setMode 를 통해 상태값을 변경 
      }}></Header>  
      <Nav topics={topics} onChangeMode={(id)=>{
          setMode("Read");                      <- setMode 를 통해 상태값을 변경 
      }}></Nav>
        {content}
    </div>
  );
}
export default App;
******************************************************************************************************************************

자 우리는 근데 Read 를 보여주려하는게 아니라 
Nav 에서 html, css, js 를 선택함에따라 내용이 바뀌길 바란다. 
그것을 작성해보자. 

**********************************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';     <- useState import 해주시고
.
.
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(event.target.id);                 <- 1. Nav 에서는 onClick 이벤트 발생 시 onChangeMode의 인자로 클릭한 list의 id를 넣어준다. 
      }}>{t.title}</a>
      </li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  // const _mode = useState("Welcome");
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
    for(let i=0;i<topics.length;i++){
      console.log(i, id);
      if(i+1 == id) {                                                                 <- 3. 그리고 인자로받은 _id 에 맞는 topic 배열안의 객체를 찾아서 
        content = <Article title={topics[i].title} body={topics[i].body}></Article>   <- 4. 그 객체안의 title 과 body 를 브라우저에 출력한다. 
      }
    }
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);                                     <-2. Nav 에서 넣어준 인자를 받아서 setId 를 통해 상태를 변경시키고 App 컴포넌트를 다시 실행시킨다. 
      }}></Nav>
        {content}
    </div>
  );
}
export default App;
**********************************************************************************************************************************************

위의 코드에서는
1. Nav 에서는 onClick 이벤트 발생 시 onChangeMode의 인자로 클릭한 list의 id를 넣어준다. 
2. Nav 에서 넣어준 인자를 받아서 setId 를 통해 상태를 변경시키고 App 컴포넌트를 다시 실행시킨다. 
3. 그리고 인자로받은 _id가 찾는 topic 배열안의 객체를 찾아서 
4. 그 객체안의 title 과 body 를 브라우저에 출력한다. 

자 완벽하다 하지만 동작하지 않는다. 
왜냐하면 console.log(i, id); 로 확인해보니 
i 는 숫자고 id 는 문자다. 

왜 id 가 문자일까? 
id 값은 setId(_id) 로부터 온다. 
_id 는 Nav 로부터 온다. 
_id는 Nav 안의 event.target.id 에서 받아온다. 
그리고 이 event.target.id 는 a 태그의 id = t.id 즉, 태그의 id값으로부터 받아온다. 

t.id 는 숫자일지언정 그것을 태그의 속성으로 넘기면 문자화가 된다. 
그러니 문자화된 데이터를 끌고왔으니 console.log(i, id); 의 id 도 문자인것이다. 

이 문자를 숫자로 컨버팅해주는것이 Number('문자') 라는 메소드이고 이것을 사용하여 아래와같이 코드를 작성하면 의도한대로 
잘 동작하는것을 확인 할 수 있다. 

******************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log('props', props);
  console.log('props.title', props.title);
  return(
    <header>
        <h1><a href='/' onClick={(event)=>{
            event.preventDefault();
            props.onChangeMode();
        }}>{props.title}</a></h1>
    </header>
  )
}
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(event.target.id);
      }}>{t.title}</a>
      </li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
    for(let i=0;i<topics.length;i++){
      console.log(i, id);
      if(i+1 === Number(id)) {          <- id를 숫자화 시켜주었다. 
        content = <Article title={topics[i].title} body={topics[i].body}></Article>   
      }
    }
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
        {content}
    </div>
  );
}
export default App;
******************************************************************************************************************************



# Create

CRUD 중 현재까지 Read 기능을 구현하였다. 
이번엔 Create 기능을 구현해보자. 

기존의 페이지에서 create 버튼을 누르고 제목과 내용을 입력하면 새로운 내용이 추가되는 기능을 구현해볼것이다. 

제일먼저 create 페이지로 이동하는 링크가 있어야한다. 
a 태그를 사용하여 Create 라는 링크를 만들고 링크를 클릭했을 때 create 라는 페이지로 가면 되는데 
우린 실제 페이지로 이동하는게 아니라 mode 값을 바꿈으로서 페이지를 바꾸고 있다. 

따라서 "Create" 링크를 클릭하면 mode가 create 로 바뀌고 create에 해당하는 UI 가 나타나게 할 것이다. 

1. 일단 Create 링크를 만들고 
2. 페이지 리로드가 되지 않게 막아준 뒤
3. mode 를 "Create" 로 바꿔준다. 그러면 App() 컴포넌트가 다시 실행이 된다. 
4. mode가 바뀌면 create 할 수 있는 태그들을 만들어야하는데 너무 복잡하니까 Create 라는 컴포넌트를 따로 만들거다. 

**************************************************************************************************************************************************
(App.js)

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Create(){                                    <- 5. 그 만드는곳이 바로 여기 
  return <article>
    <h2>Create</h2>
  </article>
}
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
      for(let i=0;i<topics.length;i++){
        console.log(i, id);
        if(i+1 === Number(id)) {
          content = <Article title={topics[i].title} body={topics[i].body}></Article>   
        }
      } 
    } else if(mode === "Create") {
      content = <Create></Create>                   <- 4. mode가 바뀌면 create 할 수 있는 태그들을 만들어야하는데 너무 복잡하니까 Create 라는 컴포넌트를 따로 만들거다. 
    }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
        {content}
      <a href='/create' onClick={event=>{           <- 1. 일단 Create 링크를 만들고 
        event.preventDefault();                     <- 2. 페이지 리로드가 되지 않게 막아준 뒤
        setMode("Create");                          <- 3. mode 를 "Create" 로 바꿔준다. 그러면 App() 컴포넌트가 다시 실행이 된다. 
      }}>Create</a>
    </div>
  );
}
export default App;
**************************************************************************************************************************************************

어떤 정보를 서버로 전송할 때 사용하는 HTML 태그가 <form> 이다.
이 form 태그를 사용하여 입력하는 컨트롤들을 추가할것이다. 
제목을 입력하기위한 input(text) 태그와, 내용을 입력하기위한 textarea 태그를 추가하였다. 
또한 입력한 값을 서버로 전송하는 input(submit) 태그를 추가하였다.   
(서로 다른줄에 위치하기 위해 p 태그로 감싸주었다.)
현재까지 만들어진 Create의 구성은 아래 이미지7과 같다. 
******************************************************************************************************************************
(App.js)

function Create(){
  return <article>
    <h2>Create</h2>
    <form>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'/></p>
    </form>
  </article>
}
******************************************************************************************************************************

그렇다면 Create(submit) 버튼을 누른 후에 어떤 작업을 해야할까?
Create 컴포넌트를 이용하는 이용자가 생성버튼을 눌렀을 떄 후속작업을 할 수 있는 Interface를 제공하고 싶다. 
예를들어 Create 컴포넌트에 onCreate 라는 prop 을 만들고 함수를 전달하면 
사용자가 Create(submit) 버튼을 눌렀을 때 이 함수가 실행된다라고 사용자에게 고지해야한다. 

그때의 이 콜백함수는 title, body 값을 받을 수 있어야한다.

******************************************************************************************************************************
function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
      for(let i=0;i<topics.length;i++){
        console.log(i, id);
        if(i+1 === Number(id)) {
          content = <Article title={topics[i].title} body={topics[i].body}></Article>   
        }
      } 
    } else if(mode === "Create") {
      content = <Create onCreate={(_title,_body)=>{       <- onCreate prop에 함수를 전달하고 이 함수는 title, body 를 받는다. 
        
      }}></Create>
    }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
        {content}
      <a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("Create");
      }}>Create</a>
    </div>
  );
}
export default App;
******************************************************************************************************************************

그러면 이제 onCreate 를 어떻게 호출할것인가?

자 일단 form 태그는 submit이 되면 자동으로 페이지가 리로드된다. 
이 submit 되는 이벤트는 onSubmit 이라는 이벤트로서 form 태그에서 다뤄진다. 
리로드를 못하게하기 위해서 a태그에서 했던것과 같이 event.preventDefault() 를통해서 막아줄 수 있다. 

그 다음으로 event 함수안에서 form 태그에 소속되어있는 title, body 의 value 값을 가지고 와야한다. 
event.target 은 event가 발생한 태그를 지칭한다. 
onSubmit 즉, submit event 가 발생한것은 form 태그이니 event.target = form 인것이다. 

그렇다면 그안의 title, body의 value(입력한 내용)는 event.target.title.value, event.target.body.value 로 쉽게 접근할 수 있다. 

******************************************************************************************************************************
function Create(){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      const title = event.target.title.value;
      const body = event.target.body.value;
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'/></p>
    </form>
  </article>
}
******************************************************************************************************************************

자 이제 이렇게 가져온 title과 body에 입력한 value 를 Create 컴포넌트의 사용자에게 공급하면 된다. 
사용자는 어떻게 Create 컴포넌트로부터 submit 정보를 공급받는가?
바로 onCreate prop을 통해서 받는것이다. 

그러니 나는 Create 컴포넌트를 생성하는 함수에 props라는 인자를 주고 
이 props 인자를 통해서 onCreate 함수를 호출할것이다. 
그리고 그 호출한 함수의 첫번쨰 인자로 title, 두번쨰 인자로 body 를 줄것이다. 

그리고 이 호출한 함수가 실행이 되면 Create 컴포넌트를 사용하는곳에 있는 onCreate 가 가리키는 함수가 실행될것이고 
그 함수의 _title, _body 값을 통해서 사용자가 입력한 title 과 body값을 Create 컴포넌트의 사용자에게 공급할 수 있다. 

그 다음 해야할 작업은 topics 변수에 새로운 원소를 추가해서 list에 내가 입력한 새로운것이 추가되도록 해야한다. 
그러기 위해선 topics 가 상태로 승격이 되야한다. 그래야 topics가 바뀌면 페이지에서도 바로 보이기 때문. 
상태로 승격시키는것은 useState() 로 감싸주면 됨. 
또한 읽기와 쓰기를 위해 topice, setTopics 라는 인터페이스를 추가. 

******************************************************************************************************************************
(App.js)
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);            <- props의 onCreate 함수를 호출한 뒤 인자로 사용자가 입력한 title, body 를 넣어준다. 
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'/></p>
    </form>
  </article>
}

function App() {
  const [topics, setTopics] = useState([        <- topics 를 상태로 승격시켰으며 앍기와 쓰기를 위한 인터페이스를 추가 
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]);
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
      for(let i=0;i<topics.length;i++){
        console.log(i, id);
        if(i+1 === Number(id)) {
          content = <Article title={topics[i].title} body={topics[i].body}></Article>   
        }
      } 
    } else if(mode === "Create") {
      content = <Create onCreate={(_title,_body)=>{

      }}></Create>
    }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
        {content}
      <a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("Create");
      }}>Create</a>
    </div>
  );
}
export default App;
******************************************************************************************************************************

자 이제 topics 에 들어갈 새로운 원소를 만들어야 하고 그 원소는 객체 이다. 
새로운 원소를 만들기 위해 newTopic 이라는 객체를 아래와 같이 만든다. 
id 는  별도로 관리하기 위해 nextId 라는 state를 새로 만들었고 초기값은 4초 세팅했다.(일단 기본이 3개이기 때문)
그럼 nextId 값을 통해 다음 원소의 id값을 정할 수 있게된거다. 

******************************************************************************************************************************
(App.js)

function App() {
  const [topics, setTopics] = useState([        
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]);
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] =useState(4);
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
      for(let i=0;i<topics.length;i++){
        console.log(i, id);
        if(i+1 === Number(id)) {
          content = <Article title={topics[i].title} body={topics[i].body}></Article>   
        }
      } 
    } else if(mode === "Create") {
      content = <Create onCreate={(_title,_body)=>{
        const newTopic = {id:nextId, title:_title, body:_body};            <- 요기 topics 에 추가하기위해 새로 만드는 객체
      }}></Create>
    }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
        {content}
      <a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("Create");
      }}>Create</a>
    </div>
  );
}
export default App;
******************************************************************************************************************************

자 그럼 이 newTopic을 topics에 넣기위해서 
아래처럼 해주면 topics 배열에 의도한 대로 newTopic 객체가 추가가 될까?

******************************************************************************************************************************
else if(mode === "Create") {
  content = <Create onCreate={(_title,_body)=>{
    const newTopic = {id:nextId, title:_title, body:_body};            <- 요기 topics 에 추가하기위해 새로 만드는 객체
    topics.push(newTopic);
    setTopics(topics);  
  }}></Create>
}
******************************************************************************************************************************

안된다.
역시 인생은 쉽게 되는게 없다.
그냥 아무일도 일어나지 않는다. 

이 안에는 아주 복잡한 원리가 도사리고 있고 나는 현재 그것을 알지 못한다. 
일단은 현상만을 알고 대처방법만을 숙지한 뒤 넘어가고 언젠가 다가올 깨달음의 순간을 기다리자. 

내가 상태를 만들 떄 그 상태 데이터가 원시데이터(PRIMITIVE) 타입이면(string, number, bigint, boolean, undefined, symbol, null)
 -> const [value, setValue] = useState(PRIMITIVE); 
위에서 사용한 방식이 가능하다. 

하지만 상태 데이터가 범객체라면 (object, array) 처리방법이 달라진다. 
데이터를 복제한 뒤 복제본을 바꾼 후 그 복제본을 setValue() 를 통해 넣어주면 된다.

-> const [value, setValue] = useState(Object);
객체라면 newValue = {...value}; /   <- 중괄호 후 안에 점3개 해주면 복제한다는 뜻 이다. 
배열이라면 newValue = [...value];
newValue 변경 
setValue(newValue)


자 이 방법을 사용하여 topics 를 바꿔보면 아래의 코드와 같다. 
******************************************************************************************************************************
function App() {
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]);
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
      for(let i=0;i<topics.length;i++){
        console.log(i, id);
        if(i+1 === Number(id)) {
          content = <Article title={topics[i].title} body={topics[i].body}></Article>   
        }
      } 
    } else if(mode === "Create") {
      content = <Create onCreate={(_title,_body)=>{
        const newTopic = {id:nextId, title:_title, body:_body};       <- Create를 통해 입력한 값을 객체로 만들어주고 
        const newTopics = [...topics];                                <- 기존의 topics 배열의 복제본을 만들어주고
        newTopics.push(newTopic);                                     <- 복제본에 Create를 통해 새로만든 객체를 추가해주고 
        setTopics(newTopics);                                         <- 새것이 추가된 복제본을 setTopics를 통해 state를 갱신해준다. 
      }}></Create>
    }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
        {content}
      <a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("Create");
      }}>Create</a>
    </div>
  );
}
export default App;
******************************************************************************************************************************

자 위와같이 해준 원리에 대해 간단하게 짚고 넘어가자면 

const [value, setValue] = useState([1]); <- 오리지널데이터에 배열이 있고 
value.push(2);                           <- 오리지널 데이터를 바꿨다. 
setValue(value);                         <- 오리지널 데이터를 입력해줬다. 

리액트는 setValue 를 호출했을 때 오리지널 데이터와 setValue('새로운데이터') 안의 새로 들어오는 데이터가 같은 데이터인지 확인하고 
만일 같은 데이터라면 굳이 컴포넌트를 다시 렌더링하지 않는다. 

그런데 배열은 그 안의 내용이 수정되더라도 결국은 같은 메모리주소안에 저장되어있는 같은 배열데이터이기 때문에 컴포넌트가 새로 렌더링되지 않는것이다. 

아래와같은 경우는 오리지널데이터 1과 새로들어오는 2는 다른 데이터이기 때문에 컴포넌트가 다시 렌더링 되는것이다. 
const [value, setValue] = useState(1); 
setValue(2);                       

그러니 상태를 다루는 데이터가 배열인 경우에는 오리지널 데이터를 복제한 후 그 복제한 데이터를 변경 후 
그 변경한 데이터를 set 해야하는것이다. 아래처럼. 

const [value, setValue] = useState([1]); <- 오리지널 데이터에 배열이 있고 
newValue = [...value];                   <- 오리지널 데이터를 복제한 후
newValue.push(2);                        <- 그 복제한 데이터에 내가 원하는 새로운 데이터를 추가한 후    
setValue(newValue);                      <- 수정된 복제한 데이터를 set 해주면 이제 새로들어오는 데이터와 오리지널 데이터가 다른것이니 컴포넌트가 새로 렌더링 된다. 


원리는 대충 위와 같고 
이제 우리는 글이 추가되면 제대로 추가되었는지 내가 추가한 글의 상세페이지로 이동시켜주는 기능을 추가해볼것이다. 
또한 다음에 새로운 글이 추가되는것에 대비해서 nextId 값도 수정해줄것이다. 
간단하다. 
1. mode를 "Read" 상태로 변경 후 
2. id 에 내가 방금 추가한 id 를 넣어주어서 내가 방금 추가한 글이 보이도록 해준다.
3. 다음 추가될 글을 위해 nextId 값을 1 더해준다.

******************************************************************************************************************************
function App() {
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]);
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
      for(let i=0;i<topics.length;i++){
        console.log(i, id);
        if(i+1 === Number(id)) {
          content = <Article title={topics[i].title} body={topics[i].body}></Article>   
        }
      } 
    } else if(mode === "Create") {
      content = <Create onCreate={(_title,_body)=>{
        const newTopic = {id:nextId, title:_title, body:_body};
        const newTopics = [...topics];
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode("Read");                <- 1. mode를 "Read" 상태로 변경 후 
        setId(nextId);                  <- 2. id 에 내가 방금 추가한 id 를 넣어주어서 내가 방금 추가한 글이 보이도록 해준다.
        setNextId(nextId+1);            <- 3. 다음 추가될 글을 위해 nextId 값을 1 더해준다. 
      }}></Create>
    }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
        {content}
      <a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("Create");
      }}>Create</a>
    </div>
  );
}
export default App;
******************************************************************************************************************************

이 상태들을 변경하는것이 내가 만드는 App 이라는 컴포넌트를 조작하기위한 굉장히 중요한 조작장치라는게..보이지 않는가..??
이것이 바로 상태를 사용했을 때 얻을 수 있는 세련된 효과라고 할 수 있다. 



# Update 

Update 는 Create&Read 를 조합하여 구현할것이다. 

당연히 제일먼저 Update로 가는 링크를 추가해야한다. 
링크를 추가해주고 Create, Update 링크를 li로 묶은다음 그 둘은 ul 로 또 묶어줌으로서 
목록화를 시켜주었다. 

******************************************************************************************************************************
(App.js)

function App() {
.
.
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
      {content}
      <ul>  
      <li><a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("Create");
      }}>Create</a></li>
      <li><a href='/update'>Update</a></li>
      </ul>
    </div>
  );
}
******************************************************************************************************************************

우리가 update를 할 때 에는 update 하려는 대상이 있는데 
그 대상을 URL에서 명시해주는것이 좋다. 
예를 들어 2번 css를 update 한다고하면 "http://localhost:3000/update/2"  이런식으로 말이다. 

또 하나는 이 update라는 기능은 상세보기 페이지로 들어갔을 때 에만 노출되고 
Welcome 페이지에서는 안보이도록 하는게 세련된 구현 방법이다. 

그러기 위해서 contextControl(맥락적으로 노출되는 control UI 라는 뜻) 이라는 지역변수를 하나 만들어준 뒤 
이것을 mode가 Read 일 때 에만 나오게 해주는 것이다. 

그리고 update 링크를 클릭하면 mode가 update 로 바뀐 후 update 화면이 나오도록 구성해야한다. 

정리하자면 아래의 코드의 설명과 같다. 
******************************************************************************************************************************************************************
(App.js)

function App() {
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]);
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  let content = null;
  let contextControl = null;                                              <- 1. contextControl 이라는 지역변수 하나 만들어주고 기본값으로 null 을 준뒤
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
      for(let i=0;i<topics.length;i++){
        console.log(i, id);
        if(i+1 === Number(id)) {
          content = <Article title={topics[i].title} body={topics[i].body}></Article>   
        }
      }
      contextControl =  <li><a href={'/update'+id} onClick={event=>{ <- 2. mode가 Read 일 때에만 Update 링크가 보이고 아니면 null 이된다. 링크의 "/update" 뒤에 id값을 주었다. 
        event.preventDefault();                                      <- 3. 링크를 클릭 시 페이지가 리로드되지 않게 막아주고 
        setMode("Update");                                           <- 4. mode state 를 변경해줌으로서 App()컴포넌트를 다시 실행시키고 Update mode에 따른 코드를 실행시킨다. 
      }}>Update</a></li>;     
  } else if(mode === "Create") {
      content = <Create onCreate={(_title,_body)=>{
        const newTopic = {id:nextId, title:_title, body:_body};
        const newTopics = [...topics];
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode("Read");
        setId(nextId);
        setNextId(nextId+1);
      }}></Create>
  } else if(mode === "Update") {                                    <- 5. mode state가 Update로 변경되면 content에 Update 컴포넌트를 넣어줌으로서 Update 화면을 띄운다. 
    content = <Update></Update>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
      {content}
      <ul>  
      <li><a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("Create");
      }}>Create</a></li>
      {contextControl}                                      <- 6. mode에 따라 null 또는 update 링크가 되겠다. 
      </ul>
    </div>
  );
}
export default App;
******************************************************************************************************************************************************************

이제 update 링크를 클릭하면 mode state가 Update로 바뀐 뒤 
Update 컴포넌트를 띄워준다. 

이 Update 컴포넌트를 구성해보자. 
update의 구성은 Create와 유사하다. 
따라서 Create 컴포넌트의 구성을 그대로 가져온뒤 현재 보고있는 게시물의 id를 통해 
title 과 body를 담아 prop으로 넣어주고 
prop을 통해 받은 값을 Update 컴포넌트 함수에서 form 안의 태그에 value로 넣어주면 된다. 

******************************************************************************************************************************************************************
(App.js)

function Update(props){
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={props.title}/></p>  <- 4. prop으로 받은 title 과 body 값을 초기 value로 넣어준다. 
      <p><textarea name='body' placeholder='body' value={props.body}></textarea></p>
      <p><input type='submit' value='Update'/></p>
    </form>
  </article>
}
.
.
function App(){
.
.
else if(mode === 'Update') {
  let title, body = null;
  for(let i=0;i<topics.length;i++){     <- 1. 현재 보고있는 게시물의 id를 찾은뒤 
    if(i+1 === Number(id)) {
      title = topics[i].title;          <- 2. 그것의 title 과 body의 값을 받아서
      body = topics[i].body;
    }
  }
  content = <Update title={title} body={body} onUpdate={(title, body)=>{  <- 3. Update 컴포넌트의 props 로 넣어준다. 

  }}></Update>
}
.
.
}
******************************************************************************************************************************************************************

이렇게 작성된 페이지는 이미지8과 같은데 
여기서 문제점이 하나 있다. 
바로 저 title 과 body의 내용이 수정되지 않는다는 점 이다. 

왜냐?
리액트에서 props 라는 데이터는 사용자가 그 컴포넌트로 전달한 일종의 명령이다. 
비유하자면 왕의 어명같은 지엄하신것이지. 
유저님께서 컴포넌트에게 내린 어명인것이지. 

그러니 내가 저 텍스트박스의 값을 바꾼다고 props.title의 값이 바뀌는것이 아니니 
백날천날 저기다 키보드 두들겨도 값은 바뀌지 않는것이다. 

그러니 내가 해줘야할것은 저 props를 state로 변환하는것이다. 
prop은 사용자(외부자)가 내부로 전달하는 값 이다. 
그 값을 state로 바꾸고 state는 내부자가 사용하는 데이터니까 
그 state는 컴포넌트안에서 얼마든지 바꿀 수 있는것이다. 

******************************************************************************************************************************************************************
(App.js)

function Update(props){
  const [title, setTitle] =useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title}/></p>  
      <p><textarea name='body' placeholder='body' value={body}></textarea></p>
      <p><input type='submit' value='Update'/></p>
    </form>
  </article>
}
.
.
function App(){
.
.
else if(mode === 'Update') {
  let title, body = null;
  for(let i=0;i<topics.length;i++){     
    if(i+1 === Number(id)) {
      title = topics[i].title;         
      body = topics[i].body;
    }
  }
  content = <Update title={title} body={body} onUpdate={(title, body)=>{  <- 

  }}></Update>
}
.
.
}
******************************************************************************************************************************************************************

으아니 아직도 안된다. 
왜냐 저 텍스트박스안의 값을 바꾼다고 state를 변경하는건 아니니까 
아니 그럼 어떻게 해야하나?
이게 참 어려운데 "onChange"  라는 이벤트를 사용하는것이다. 

리액트에서 onChange 는 HTML 에서의 onchange 와는 다르게 동작한다. 
HTML 에서는 값이 바뀌고 마우스가 상자밖으로 나갈 때 onchange 가 호출되는데 
REACT 에서는 값을 입력할 때 마다 onChange 가 호출된다. 

즉 아래처럼 onChange 이벤트가 발생할 때 마다(=뭔가 입력이 있을 때 마다) 그 텍스트박스의 값을 콘솔창에 출력해보면 
아래의 이미지9 처럼 원래의 value가 입력된값과 함꼐 출력되는걸 볼 수 있다. 

******************************************************************************************************************************************************************
(App.js)
 
function Update(props){
  const [title, setTitle] =useState(props.title);
  const [body, setody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={event => {
        console.log(event.target.value);
      }}/></p>
      <p><textarea name='body' placeholder='body' value={body}></textarea></p>
      <p><input type='submit' value='Update'/></p>
    </form>
  </article>
}
******************************************************************************************************************************************************************

이렇게 획득한 새로 바뀐값을 새로운 state로 바꾸는것이다. 
그러면 내가 값을 입력할 때 마다 새로운 state로 값이 변경될테고 그 새로변경된 state가 value에 계속 남게 되는것이다. 
즉, 입력할 때 마다 값이 변경되며 누적이 되는것이다. 
아래의 코드처럼 작성

******************************************************************************************************************************************************************
(App.js)
 
function Update(props){
  const [title, setTitle] =useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={event => {
        console.log(event.target.value);
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name='body' placeholder='body' value={body}></textarea></p>
      <p><input type='submit' value='Update'/></p>
    </form>
  </article>
}
******************************************************************************************************************************************************************

정리하자면 
props 로 들어온 title을 state로 환승시킨 후 
그 state를 value 값으로 주었다. 
state는 컴포넌트안에서 바꿀 수 있으니 onChange 라는 이벤트발생 시 
새로운 value 로 키워드를 입력할 때 마다 setTitle 값을 지정해주고 
그 때 마다 title의 값이 바뀌고 컴포넌트가 다시 렌더링 되면서 새로운값이 value로 들어오면서 값이 바뀌고 뭐 이런 순환이 이루어지는것이다. 

자 이제 Update form의 value를 수정하는것까지 완료했다. 
이후 submit 버튼을 누르면 어떻게 될까?
onSubmit 이벤트에 따라서 title, body 값을 onUpdate() 의 인자로 전달할것이다. 

onUpdate()는 App 컴포넌트 안에서 확인할 수 있는데 
onUpdate()가 title 과 body를 잘 받아서 topics 배열을 잘 수정해주면 되는것이다. 

******************************************************************************************************************************************************************
(App.js)
function App() {
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]);
  // const _mode = useState("Welcome");
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  let content = null;
  let contextControl = null;
 .
 .
  } else if(mode === 'Update') {
    let title, body = null;
    for(let i=0;i<topics.length;i++){
      if(i+1 === Number(id)) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      -> 여기서 title 과 body를 잘 받아서 topics를 잘 수정해주면 된다. 
    }}></Update>
  }
 .
 .
export default App;
******************************************************************************************************************************************************************

그러기 위해 updatedTopic 이라는 객체를 새로 만들어주고 새로 받은 title과 body를 담아준다. 
id state는 자동으로 세팅되어있다. 
왜냐하면 Update mode는 Read mode 에서만 건너갈 수 있기 때문에 
Read를 하려면 id는 자동으로 세팅되어있기 때문이다. 

그리고 우리가 수정하려는 state는 topic 이라는 배열(객체)이기 때문에 
복제하고 복제한거 수정하고 수정된복제품으로 다시 대체해주는 이전에 설명했던 과정들을 거쳐야한다. 

******************************************************************************************************************************************************************
(App.js)
function App() {
  .
  .
  } else if(mode === 'Update') {
    let title, body = null;
    for(let i=0;i<topics.length;i++){
      if(i+1 === Number(id)) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const updatedTopic = {id:id, title:title, body:body};                 <- 1. form에서 수정해서 보내준 값으로 새로운 객체 만든 후 
      const newTopics = [...topics];                                        <- 2. 기존의 topics 를 복사하여 새로운 객체를 담기 위한 그릇을 만들고 
      for(let i=0;i<topics.length;i++){
        if(newTopics[i].id == id){                                          <- 3. 현재 id와 일치하는 topics 배열안에서 수정할 객체의 자리를 찾아 
          newTopics[i] = updatedTopic;                                      <- 4. 복사본 topics 를 수정해준다. 
          break;
        }
      }
      setTopics(newTopics);                                                 <- 5. 그 수정된 복사본 topics를 새로운 state로 대체해주면 끗.
      setMode("Read");                                                      <- 6. 수정되고 나서 상세페이지로 이동하여 수정된 내용을 보여주기 위함
    }}></Update>                                                                   id는 이미 설정되어있으니 모드만 바꿔주면 된다. 
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
          setMode("Welcome");
      }}></Header>  
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("Read");
          setId(_id);
      }}></Nav>
      {content}
      <ul>  
      <li><a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("Create");
      }}>Create</a></li>
      {contextControl}
      </ul>
    </div>
  );
}
export default App;
******************************************************************************************************************************************************************

# Delete 

Delete 버튼은 Create, Update 링크 아래에 둘것이다.  
Create, Update 는 특정 페이지로 이동하기 때문에 링크다. 
그러나 Delete는 그냥 누르자마자 삭제를 시킬것이기 때문에 링크가 아니라 버튼을 사용 할 것이다. 

자 그럼 Delete 버튼을 어디에 위치시키면 될까?
contextControl 이라는 변수는 mode 가 Read 일 때에만 보이게 되어있다. 
즉 Update 처럼 Delete 도 상세페이지로 들어갈 때 에만 보이게 하도록 할 것이다. 

그러므로 contextControl 변수에 delete 버튼도 추가해주면 되는데 
기존에 Update를 담기위한 li 태그가 하나 있었고 거기에 또 하나의 li 태그를 contextControl 변수안에 담아야하는데 
리액트에서는 태그를 다룰 땐 하나의 태그안에 들어가 있어야한다. 
그래서 <>"묶이는복수의 태그"</> 이렇게 빈 태그로 묶어주어 복수의 태그를 그룹핑하여 사용하여야 한다. 
  -> <></> 는 실제 HTML 상으로는 어떠한 태그도 존재하지 않는다. 

이렇게 가상의 빈태그로 묶어준 범위안에 Delete 버튼을 추가한 뒤 button은 event.preventDefault() 이런거 해줄 필요없다. 
기본 동작 이런것이 없으니까. 
그리고 onClick 이벤트발생시 동작하는 함수에서 newTopics라는 빈 배열을 만들고 topics 배열안에 현재 상세페이지의 id가 아닌
객체들만 push 한 후 setTopics()를 통해 newTopics 배열을 넣어주면 된다. 


***********************************************************************************************************************************************************
(App.js)

function App() {
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]);
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  let content = null;
  let contextControl = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read') {
      for(let i=0;i<topics.length;i++){
        if(i+1 === Number(id)) {
          content = <Article title={topics[i].title} body={topics[i].body}></Article>   
        }
      }
      contextControl =  <>                              <- 복수의 태그를 그룹핑하기 위한 빈태그 
        <li><a href={'/update'+id} onClick={event=>{
          event.preventDefault();
          setMode("Update");
        }}>Update</a></li>
        <li>
          <input type="button" value="Delete" onClick={()=>{    <- Delete 버튼 만들어주고 
            const newTopics= [];                                <- 빈배열을 만든 후 
            for(let i=0;i<topics.length;i++){
              if(topics[i].id !== Number(id)){                  <- 현재 페이지의 id와 다른 객체들만 담아서 배열을 만든 후 
                newTopics.push(topics[i])
              }
            }
            setTopics(newTopics);                               <- 그 새로 만든 배열을 setTopics 를 통해 topics 배열로 바꿔준다. 
            setMode("Welcome");                                 <- 그리고 지웠으니까 홈페이지로 돌아가게 해주기.
          }}/>
        </li>
      </>
  } 
  .
  .
}
export default App;
***********************************************************************************************************************************************************


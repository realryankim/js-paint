# 🎨 js-paint
* Painting Board made with VanillaJS

### 📃 프로젝트 목적
* VanilaJS 연습
* Canvas API 학습

### 🛠 기술 스택
* HTML/CSS/JS

### 🎞 Demo Link
[Demo Link](https://realryankim.github.io/js-paint/)

### 🎬 기능 구현
* Canvas API를 활용한 그림판 구현(색 페인트, 채우기, 리셋)
* 미디어쿼리를 활용하여 화면 크기에 따른 반응형 화면 구현

### 📕 배운 점
1. HTML
> 1.1. range 타입
* input에서 range 타입으로 범위를 지정하는 `min`, `max`와 `step`이라는 속성을 통해서 슬라이드가 움직이는 한 칸의 크기를 정해줄 수 있다는 것을 배웠다.
```html
<input
  type="range"
  id="jsRange"
  min="0.1"
  max="5.0"
  value="2.5"
  step="0.1"
/>
```

![range](https://user-images.githubusercontent.com/27044221/120091010-e7261600-c141-11eb-88f4-200b6bdae7ba.gif)

> 1.2. canvas 엘리먼트
* canvas 엘리먼트는 처음 사용하는 태그였는데, 픽셀을 다루는 모든 작업에서 canvas 태그의 사용이 필수적이라는 것을 알 수 있었다.

2. CSS
> 2.1. :active 선택자
* :active 선택자를 사용하면 특정 동작을 지정할 수 있다.

```js
button:active {
  transform: scale(1.1);
}
```
![active](https://user-images.githubusercontent.com/27044221/120091090-ac70ad80-c142-11eb-8aa6-ce84d369916c.gif)

3. JavaScript
> 3.1. canvas 관련 JavaScript
* canvas는 화면에 나타는 canvas의 크기(html, css 속성)와 실제로 canvas 위에서 다를 수 있는 크기 (JS 속성)을 따로 갖는다. 즉, 아래에 눈으로 보이는 하얀 캔버스(html, css)와 실제로 픽셀을 다루는 canvas(JS) 공간은 별개라는 뜻이다.

![canvas](https://user-images.githubusercontent.com/27044221/120091913-29ebec00-c14a-11eb-90a6-a0775ac9d730.gif)

따라서, CSS에서 다음과 같이 `눈으로 볼 수 있는` canvas 크기를 정해줬다고 하더라도,
```css
.canvas {
  width: 550px;
  height: 550px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 15px 15px 1px rgba(224, 224, 224, 1);
}
```
실제로 픽셀을 다루려면 아래와 같이 JavaScript에서도 canvas의 크기를 지정해주어야한다.
```js
const canvas = document.querySelector('#jsCanvas');
canvas.width = document.getElementsByClassName('canvas')[0].offsetWidth;
canvas.height = document.getElementsByClassName('canvas')[0].offsetHeight;
```
CSS에서 canvas 크기를 정하지 않으면 => 우리 눈으로 canvas를 볼 수 없다.
JS에서 canvas 크기를 정하지 않으면 => canvas 위에서 픽셀을 다룰 수 없다. => 그림을 그릴 수 없다.

> 3.2. cursor의 좌표
* 스크린 상에서 좌표를 얻는 방법 중에 `offset`을 사용했다.
```js
const onMouseMove = e => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    // 선 경로 생성
    context.beginPath();
    // 선 시작 좌표
    context.moveTo(x, y);
  } else {
    // 선 끝 좌표
    context.lineTo(x, y);
    // 선 그리기
    context.stroke();
  }
};

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
}
```

* event 객체를 콘솔에 출력
![image](https://user-images.githubusercontent.com/27044221/120092621-30c92d80-c14f-11eb-9651-e6dc4b304445.png)

canvas 위에서 콜백이 인자로 받는 event 객체를 콘솔에 출력하면 `clientX, Y`, `pageX, Y`, `offsetX, Y`, `screenX, Y` 라는 좌표 정보를 얻을 수 있다. 각 좌표의 의미는 아래 그림과 같다.

![image](https://user-images.githubusercontent.com/27044221/120092676-cc5a9e00-c14f-11eb-8c0f-2e84ecd900aa.png)
[출처](https://www.cnblogs.com/cmt/p/14580194.html?from=https%3A%2F%2Fwww.cnblogs.com%2FDB-IT%2Fp%2F8451301.html&blogId=411927&postId=8451301)

**client**: 현재 보이는 브라우저 화면이 기준이다.
* **clientX**: 브라우저 페이지에서의 X좌표 위치를 반환하나 스크롤은 무시하고 해당 페이지의 상단을 0으로 측정한다.
* **clientY**: 브라우저 페이지에서의 Y좌표 위취를 반환하나 스크롤은 무시하고 해당 페이지의 상당을 0으로 측정한다.

**offset**: 이벤트 대상이 기준이 된다. 화면 중간에 있는 박스 내부에서 클릭한 위치를 찾을 때, 해당 박스의 왼쪽 모서리 좌표가 0이된다. 화면이 기준이 아니다.
* **offsetX**: 이벤트 대상 객체에서의 상대적 마우스 x좌표 위치를 반환한다.
* **offsetY**: 이벤트 대상 객체에서의 상대적 마우스 y좌표 위치를 반환한다.

**page**: 전체 문서를 기준으로 x, y좌표를 반환한다. 스크롤 화면을 포함해서 측정한다.
* **pageX**: 브라우저 페이지에서의 x좌표 위치를 반환한다.
* **pageY**: 브라우저 페이지에서의 y좌표 위치를 반환한다.

**screen**: 모니터 화면을 기준으로 좌표를 제공한다.
* **screenX**: 전체 모니터 스크린에서의 x좌표 위치를 반환한다.
* **screenY**: 전체 모니터 스크린에서의 y좌표 위치를 반환한다.


# 2D context 관련 추가 정리하기

### 참고
* http://megaton111.cafe24.com/2016/11/29/clientx-offsetx-pagex-screenx%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90/

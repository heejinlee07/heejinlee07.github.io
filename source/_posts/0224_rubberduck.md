---
title: 200224 러버덕 정리
date: 2020-02-24
tags:
---

## 리터럴

값을 생성하는 가장 간단한 방법
사람이 이해할 수 있는 문자로 값을 생성
런타임 때 값을 평가하여 생성함

## 표현식인 문과 표현식이 아닌 문

값: 표현식이 평가되어 생성된 결과
표현식: 값으로 평가될 수 있는 문
문: 컴퓨터에 내리는 명령. 선언문, 할당문, 조건 문 등
표현식인 문: 변수에 할당할 수 있는 문으로 값을 생성한다.
표현식이 아닌 문: 변수에 할당할 수 없다.

```javascript
//example
var a;
->undefined
//변수 선언문은 표현식이 아닌 문이기 때문에
//평가할 수 없어서 완료된 평가값이 나올 자리에
//평가값 대신 undefined가 출력된다.
//undefined는 평가된 값이 아닌 완료값이다.
 a = 1;
->2
//변수 할당문은 표현식인 문이기 때문에 평가된 값 2가 출력된다.
```

## 데이터 타입

원시타입: string, number, boolean, null, undefined, symbol
객체: object, array, function…

원시타입은 변경불가하고, 객체는 변경가능하다.

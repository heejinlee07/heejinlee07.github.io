---
title: Team Project
date: 2020-06-22 11:00
tags:
---

## soft development life cycle

소프트웨어를 계획/개발/시험/배포하는 과정
요구사항 분석 -> 설계 -> 구현 -> 테스트 -> 유지 및 보수

- build&fix: 일단 만들고 고침.
- Prototype: 최소한의 요구사항 분석 후 프로토타입을 제작하여 고객의 요구를 개발에 적극적으로 도입. 고객 평가가 중요한 프로덕트에 도입하는 모델. 외주의 느낌. 핵심기능을 모두 구현 + 부가기능을 붙이는 방식
- Waterfall: 요구사항 분석 -> 설계 -> 구현 -> 운용이 순차적으로 진행. 대규모 팁에 적합. 각 단계를 완료하기 전까지 다음 단계로 넘어가지 않음. 분석이나 설계에서 빠진 사항이 있을 때 다음 단계에서 보충하기 어려움. 다시 cycle를 돌려야함.
- Spiral: 목표설정 -> 위험분석 -> 개발 및 검증 -> 고객평가/다음단계수립을 반복. 점진적으로 단계를 반복수행하여 위험을 최소화. 대형 시스템 구축에 유리. 안정성.
- Agile software development:
  - 프로젝트의 생명주기동안 반복적인 개발을 촉진하는 모델
  - 리스크에 대한 고민은 최소화. 분석 최소화. 문서화 생략. 속도와 코드가 핵심.
  - TMP(Too Much Plan) TLP(Too Less Plan)의 타협.
  - Code-oriented Methodology
  - XP(eXtreme Programming), Scrum 등의 상세 방법론 존재. 흔히 사용되며, 최근엔 이 두가지를 섞어서 쓰는 방법이 많이 쓰임.
  - 직위체계가 사라지는 현상이 있어서 많이 안쓰기도 함.

## eXtreme Programming

- 클라이언트 중심: 고객 중심의 양질의 소프트웨어를 빠른 시간 안에 전달한다.
- Business Requirements의 변동이 심한 경우 적합.
- Test Driven Development. 모듈에 대한 Test가 핵심.

### XP - Key Process

- Role: Project Manager, Technical writer, Interaction Designer, Architect, Tester, Programmer, User(stakeholder). 롤이 부여되고, 각자의 역할이 존재.
- planning: 2주 주기로 계획을 세우고 , 프로토타입을 통해 개발 방향 점검
- Test Driven Development: test code를 먼저 작성하고 기능을 개발한 뒤, 테스트를 통해 검증.
- pair programming: 2인 이상의 팀을 이뤄 한명이 drive하고, 한명은 QA 또는 navigator로 참여.

## Scrum

- 상호, 점진적 개발방법론
- 개발할 기능, 수정사항에 대해 우선순위를 부여한 뒤, 이 순서대로 Task 진행
- 매일 15분의 회의 진행
- 1~4주의 Sprint(기획~리뷰)
- 데일리 스크럼 필요: 내가 어떤 것을 하고 있는지, 어떤 것을 보충해야하는지에 대해 서로 논의.

### Scrum - Key Process

- Role: produce owner, scrum master, developer
- product backlog: 제품 전체의 요구사항
- planning meeting: sprint 목표와 sprint backlog 계획
- sprint backlog
- daily scrum: 어제 한 일, 오늘 할 일, issue 등 공유

1. sprint 주기: 2주(deadline:중간발표, 최종발표일). 릴리즈 가능한 상태일 것
2. requirement analysis -> design -> implementation(scrum with XP)

- planning meeting: sprint 기간 중 구현할 내용계획
- sprint backlog 작성: m/h 추산 및 분배를 통해 task분배
- daily scrum
- test-driven development(optional): 테스트코드 먼저 작성해 본 후 코드 작성

## Before Implementation

요구사항 분석을 통한 specification 작성. 필요한 기능에 대한 기획(사이트맵의 느낌)

- requirement analysis

  - client
  - functional
  - external interface

- wireframe, usecase(user flow), stroyboard(각 페이지가 어떻게 유기적으로 움직이는가)
- design prototype(FE)
- ERD(Entity Relationship Diagram)(BE)
- API Design (FE + BE)

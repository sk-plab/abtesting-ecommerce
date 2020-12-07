# 소개

이 프로젝트는 Create React App 기반 React + Typescript E-Commerce 앱 예제입니다.
그리고, Plab Javascript SDK를 사용하여 A/B Testing 이 적용되어 있습니다.

# Deployment

https://a-b-testing.netlify.app/

[![Build Status](https://travis-ci.com/sk-plab/abtesting-ecommerce.svg?branch=master)](https://travis-ci.com/sk-plab/abtesting-ecommerce)

# A/B Testing

## 사전준비

1. 실험 준비
https://abtest.skplanet.com/a-b-test-getting-started/

2. 실험 코딩
https://abtest.skplanet.com/a-b-test-sdk/


## 실험 페이지

### 상품 목록 페이지

- 설명: 상품 목록에 대해 A/A Testing 진행
- 실험키: ProductList
- 이벤트: 
  - 액션: 상품 클릭시
  - 이벤트: ProductList.product_click

### 상품 보기 페이지

- 설명: 하단에 바로구매/장바구니 버튼 A/B Testing 진행
- 실험키: ProductView
- 이벤트:
  - 액션1: 장바구니 클릭
  - 이벤트: add_to_cart
  - 액션2: 바로 구매 클릭시
  - 이벤트2: order


## 기타

상단 DevTool 버튼 기능
- A/B Testing Debugging 화면 제공
- 기본 실험 정보 표현
- 실험별 A/B Variation 강제 설정


# 쿠키 도메인 세팅 관련

abtesting 라이브러리 초기화시 domain 은 자동 설정됨.
e.g. a.test.com 이라면 test.com

그런데, netlify 배포시 설정한 도메인을 모두 선언하지 않으면 쿠키가 저장되지 않음.
e.g. netlify.app 라고 선언되면 저장되지 않음.

설정한 도메인이 abtesting-plab.netlify.app 이라면 abtesting-plab.netlify.app 풀도메인을 abtesting 라이브러리 초기화시 선언하여 실행해야함. netlify build 시스템이 이를 검증하는 것 같음.

위 설정은 .env.NODE_ENV 파일에 선언해야 함.

REACT_APP_DOMAIN=abtesting-plab.netlify.app


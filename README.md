# 소개

이 프로젝트는 Create React App 기반 React + Typescript E-Commerce 앱 예제입니다.
그리고, Plab Javascript SDK를 사용하여 A/B Testing 이 적용되어 있습니다.

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

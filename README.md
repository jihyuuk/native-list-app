# 📱 간단한 리액트 네이티브 리스트 앱

간단한 상품 이름과 가격을 조회·추가·삭제할 수 있는 **React Native 앱**입니다.  

이전에 React와 pwa를 이용하여 앱을 만들었지만, 로컬스토리지 데이터 손실 문제가 발생하여 
더 안정적인 로컬 저장 방식을 사용하는 React Native로 새롭게 제작했습니다.

(첫 react-native 프로젝트 입니다.😉)

---

## ✨ 주요 기능

1. 상품 전체 목록 조회
2. 상품 검색
3. 상품 추가/삭제/수정
4. 엑셀 파일에서 상품 불러오기
5. 엑셀(.xlsx) 파일로 내보내기


---

## 🧱 기술 스택

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage) – 안정적인 로컬 저장소
- [SheetJS (xlsx)](https://sheetjs.com/) – 엑셀 파일 읽기/쓰기 처리

---

## 📁 엑셀 파일 형식

| name         | price |
|--------------|-------|
| 사과 주스      | 2500  |
| 바나나 우유     | 1800  |

## 📌 향후 계획

- 상품 규격(옵션) 컬럼 추가 기능
  - 예시) **"상품A 1.5m"** , **"상품A 1.8m"** 처럼
이름은 같고 규격만 다른 상품들을 하나의 상품으로 그룹화하고
별도의 규격 컬럼을 추가하는 기능을 고려 중입니다

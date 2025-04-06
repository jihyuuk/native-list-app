import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';
import { Alert } from 'react-native';

export const handleImportCSV = async (setItems) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];

    // 확장자 검사
    if (!file.name.endsWith('.csv')) {
      Alert.alert('⚠️ 지원되지 않는 파일', 'CSV 파일만 선택해주세요.');
      return;
    }

    const response = await fetch(file.uri);
    const csvText = await response.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const importedItems = parsed.data.map((row, index) => ({
      id: Date.now().toString() + index,
      name: row['상품명']?.trim() || '',
      price: parseInt(row['가격']) || 0,
    }));

    setItems(importedItems);
    Alert.alert('✅ 불러오기 성공', `총 ${importedItems.length}개 항목을 불러왔어요.`);
  } catch (e) {
    console.error(e);
    Alert.alert('❌ 불러오기 실패', 'CSV 파일을 읽는 중 오류가 발생했어요.');
  }
};

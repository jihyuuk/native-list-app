import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

const convertToCSV = (items) => {
  const header = '상품명,가격\n';
  const rows = items.map(item => `${item.name},${item.price}`).join('\n');
  return header + rows;
};

const saveCSVToFile = async (csvData) => {
  const fileUri = FileSystem.documentDirectory + 'item_list.csv';
  await FileSystem.writeAsStringAsync(fileUri, csvData, {
    encoding: FileSystem.EncodingType.UTF8
  });
  return fileUri;
};

const shareFile = async (fileUri) => {
  const isAvailable = await Sharing.isAvailableAsync();
  if (isAvailable) {
    await Sharing.shareAsync(fileUri);
  } else {
    Alert.alert('공유 불가', '현재 기기에서 공유 기능을 사용할 수 없습니다.');
  }
};

export const handleExportCSV = async (items) => {
  try {
    const csv = convertToCSV(items);
    const fileUri = await saveCSVToFile(csv);
    await shareFile(fileUri);
  } catch (e) {
    console.error('❌ CSV 내보내기 실패:', e);
    Alert.alert('❌ 오류', 'CSV 내보내기 중 오류가 발생했어요.');
  }
};

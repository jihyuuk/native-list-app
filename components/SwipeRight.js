import * as React from 'react';
import { Alert, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const SwipeRight = ({ item, removeItem, cancleSwipe, openEditModal }) => {


    // 삭제
    const handleDelete = () => {
        Alert.alert(
            item.name,
            "해당 상품을 삭제하시겠습니까?",
            [
                { text: '취소', style: 'cancle', onPress: () => cancleSwipe(item.id) },
                { text: '삭제', style: 'destructive', onPress: () => removeItem(item.id) },
            ]
        );
    }    


    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* 편집 버튼 */}
            <View style={{ backgroundColor: 'green', height: '100%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                <IconButton icon="pencil" iconColor="white" onPress={openEditModal} />
            </View>

            {/* 삭제 버튼 */}
            <View style={{ backgroundColor: 'red', height: '100%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                <IconButton icon="trash-can-outline" iconColor="white" onPress={handleDelete} />
            </View>
        </View>
    );
};


export default SwipeRight;
import * as React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

const SwipeRight = (item) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* 편집 버튼 */}
        <View style={{ backgroundColor: 'green', height: '100%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
            <IconButton icon="pencil" iconColor="white" />
        </View>

        {/* 삭제 버튼 */}
        <View style={{ backgroundColor: 'red', height: '100%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
            <IconButton icon="trash-can-outline" iconColor="white" />
        </View>
    </View>
);


export default SwipeRight;
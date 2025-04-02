import { Appbar, Divider, List, Searchbar, Text } from 'react-native-paper';
import { useState } from 'react';
import { View } from 'react-native';

export default function MainPage() {

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            {/* 헤더 영역 */}
            <Appbar.Header>
                {/* 햄버거 버튼 */}
                <Appbar.Action icon="menu" onPress={() => { }} />

                {/* 검색창 */}
                <Searchbar
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{ flex: 1 }}
                />
            </Appbar.Header>

            {/* 리스트 영역 */}
            <View style={{ flex: 1, padding: 16 }}>

                <List.Section>
                    <List.Item
                        titleNumberOfLines={5}
                        title="흑하이덴 2*10*500이고 테스트용으로 기이이이이이이이이일게 써봄"
                        right={() => <Text style={{ alignSelf: 'center' }}>₩3,000</Text>}
                    />

                    <Divider />

                    <List.Item
                        title="치마비닐 1*60*200(나일론줄)"
                        right={() => <Text style={{ alignSelf: 'center' }}>₩3,000</Text>}
                    />

                    <Divider />

                    <List.Item
                        title="흑색유공 2*150*300(15*25)"
                        right={() => <Text style={{ alignSelf: 'center' }}>₩3,000</Text>}
                    />
                </List.Section>


            </View>
        </>
    );
}

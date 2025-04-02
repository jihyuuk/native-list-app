import { Appbar, Divider, List, Menu, Searchbar, Text } from 'react-native-paper';
import * as React from 'react';
import { View } from 'react-native';

export default function MainPage() {

    const [searchQuery, setSearchQuery] = React.useState('');

    // 메뉴를 위한거
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <>
            {/* 헤더 영역 */}
            <Appbar.Header>

                {/* 검색창 */}
                <Searchbar
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{ flex: 1 }}
                />

                {/* 메뉴 버튼 */}
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
                    anchorPosition="bottom"
                    style={{ marginTop: 20 }}
                >
                    <Menu.Item
                        onPress={() => { }}
                        title="불러오기"
                        leadingIcon="table-arrow-up"
                    />
                    <Menu.Item
                        onPress={() => { }}
                        title="내보내기"
                        leadingIcon="table-arrow-down"
                    />
                    <Menu.Item
                        onPress={() => { }}
                        title="추가하기"
                        leadingIcon="plus"
                    />
                </Menu>

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

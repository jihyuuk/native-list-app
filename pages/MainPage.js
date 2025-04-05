import { Appbar, Divider, List, Menu, Searchbar, Text } from 'react-native-paper';
import * as React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AddItemNodal from '../components/AddItemModal';
import { Swipeable } from 'react-native-gesture-handler';
import SwipeRight from '../components/SwipeRight';

export default function MainPage() {

    //데이터
    const [items, setItems] = React.useState([
        { id: '1', name: '흑하이덴 2*10*500', price: 3000 },
        { id: '2', name: '치마비닐 1*60*200(나일론줄)', price: 3000 },
        { id: '3', name: '흑색유공 2*150*300(15*25)', price: 3000 },
    ]);

    //스와이프 
    const swipeableRefs = React.useRef({});
    const cancleSwipe = (itemId) => {
        swipeableRefs.current[itemId]?.close();
    }

    //검색어
    const [searchQuery, setSearchQuery] = React.useState('');

    //검색로직
    const searchItems = items.filter(item =>
        item.name.includes(searchQuery.trim())
    );

    // 메뉴를 위한거
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    //추가하기 모달
    const [modalVisible, setModalVisible] = React.useState(false);
    const closeModal = () => setModalVisible(false);

    //추가
    const addItem = (newItem) => {
        setItems(prev => [...prev, newItem]);
    };
    //삭제
    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

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
                        onPress={() => { closeMenu(); }}
                        title="불러오기"
                        leadingIcon="table-arrow-up"
                    />
                    <Menu.Item
                        onPress={() => { closeMenu(); }}
                        title="내보내기"
                        leadingIcon="table-arrow-down"
                    />
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            setModalVisible(true);
                        }}
                        title="추가하기"
                        leadingIcon="plus"
                    />
                </Menu>

            </Appbar.Header>

            {/* 리스트 영역 */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, padding: 16 }}>

                    {/* 아이템 리스트 */}
                    <List.Section>

                        {searchItems.map(item => (
                            <View key={item.id}>
                                <Swipeable
                                    ref={ref => swipeableRefs.current[item.id] = ref}
                                    renderRightActions={() => <SwipeRight item={item} removeItem={removeItem} cancleSwipe={cancleSwipe} />}>
                                    <List.Item
                                        title={item.name}
                                        style={{ backgroundColor: 'white' }}
                                        right={() => (
                                            <Text style={{ alignSelf: 'center' }}>
                                                ₩ {item.price.toLocaleString('ko-KR')}
                                            </Text>
                                        )}
                                    />
                                </Swipeable>
                                <Divider />
                            </View>
                        ))}

                    </List.Section>

                </View>
            </TouchableWithoutFeedback>

            <AddItemNodal modalVisible={modalVisible} closeModal={closeModal} addItem={addItem} />
        </>
    );
}

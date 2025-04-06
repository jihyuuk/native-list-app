import { Appbar, Divider, List, Menu, Searchbar, Text } from 'react-native-paper';
import * as React from 'react';
import { View, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import AddItemNodal from '../components/ItemModal';
import { Swipeable } from 'react-native-gesture-handler';
import SwipeRight from '../components/SwipeRight';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleExportCSV } from '../utils/csvExport';

const STORAGE_KEY = '@item_list';

export default function MainPage() {

    //데이터
    const [items, setItems] = React.useState([]);

    //스토리지에서 불러오기
    const loadStorage = async () => {
        try {
            const stroageValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (stroageValue) setItems(JSON.parse(stroageValue));
        } catch (e) {
            Alert.alert('❌ 불러오기 실패', e.message);
        }
    };
    //스토리지에 저장
    const saveStorage = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            Alert.alert('❌ 저장 실패', e.message);
        }
    };

    //데이터 불러오기
    React.useEffect(() => {
        loadStorage();
    }, []);

    //데이터 변경감지 후 자동 저장
    const isFirst = React.useRef(true);
    React.useEffect(() => {
        //처음 데이터 불러올때는 저장 안함
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }
        //정상로직
        saveStorage();
    }, [items])

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

    //메뉴 아이템 핸들러
    const handleReset = () => {
        closeMenu();
        Alert.alert(
            "🚨 모든 데이터를 삭제할까요?",
            "\n⚠️ 삭제된 항목은 복구할 수 없습니다. \n\n※ 꼭 데이터 백업 후에 실행해주세요.",
            [
                { text: '취소', style: 'cancel' },
                { text: '완전 삭제', style: 'destructive', onPress: () => setItems([]) },
            ]
        );
    }
    const handleExport = () => {
        closeMenu();
        handleExportCSV(items);
    }


    //모달
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editTarget, setEditTarget] = React.useState(null);

    const openAddModal = () => {
        closeMenu();
        setModalVisible(true);
    }
    const openEditModal = (item) => {
        setEditTarget(item);
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);

        if (editTarget) {
            setEditTarget(null);
            cancleSwipe(editTarget.id);
        }
    }


    //추가
    const addItem = (newItem) => {
        setItems(prev => [...prev, newItem]);
    };
    //삭제
    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };
    //수정
    const editItem = (updateItem) => {
        setItems(prev => prev.map(item => item.id === updateItem.id ? updateItem : item));
    }

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
                        onPress={handleReset}
                        title="모두삭제"
                        leadingIcon="database-remove-outline"
                    />
                    <Menu.Item
                        onPress={() => { closeMenu(); }}
                        title="불러오기"
                        leadingIcon="table-arrow-up"
                    />
                    <Menu.Item
                        onPress={handleExport}
                        title="내보내기"
                        leadingIcon="table-arrow-down"
                    />
                    <Menu.Item
                        onPress={openAddModal}
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
                                    renderRightActions={() => <SwipeRight item={item} removeItem={removeItem} cancleSwipe={cancleSwipe} openEditModal={() => openEditModal(item)} />}>
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

            <AddItemNodal modalVisible={modalVisible} closeModal={closeModal} submit={editTarget ? editItem : addItem} editTarget={editTarget} />
        </>
    );
}

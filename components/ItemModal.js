import * as React from 'react';
import { View } from 'react-native';
import { Button, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';

const AddItemNodal = ({ modalVisible, closeModal, submit, editTarget }) => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');

    //초기화
    React.useEffect(() => {
        if (editTarget) {
            setName(editTarget.name);
            setPrice(editTarget.price.toLocaleString('ko-KR'));
        } else {
            setName('');
            setPrice('');
        }
    }, [modalVisible])


    const handleSumbit = () => {
        // 빈 값 방지
        if (!name.trim() || !price.trim()) return;

        //item 객체 생성
        const newItem = {
            id: editTarget ? editTarget.id : Date.now().toString(),
            name: name.trim(),
            price: Number(price.replace(/,/g, ''))
        };

        //부모 함수 호출
        submit(newItem);
        closeModal();
    }

    //가격 콤마 찍는 로직
    const handlePriceChange = (text) => {
        const raw = text.replace(/[^0-9]/g, ''); // 숫자만 추출
        const formatted = Number(raw).toLocaleString('ko-KR'); // 콤마추가
        setPrice(formatted);
    }


    return (
        <Portal>
            <Modal visible={modalVisible} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 }}>

                {/* 헤더 영역 */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text variant="titleMedium">{editTarget ? '상품 수정' : '상품 추가'}</Text>
                    <IconButton icon="close" onPress={closeModal} />
                </View>

                <TextInput
                    label="상품명"
                    value={name}
                    onChangeText={setName}
                    style={{ marginBottom: 16 }}
                />
                <TextInput
                    label="가격"
                    value={price}
                    onChangeText={handlePriceChange}
                    keyboardType="numeric"
                    style={{ marginBottom: 16 }}
                />
                <Button mode="contained" onPress={handleSumbit}>
                    {editTarget ? '수정하기' : '추가하기'}
                </Button>
            </Modal>
        </Portal>
    );
}

export default AddItemNodal;
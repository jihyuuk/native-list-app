import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, TextInput, StyleSheet, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';

const ItemModal = ({ modalVisible, closeModal, submit, editTarget }) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editTarget) {
      setName(editTarget.name);
      setPrice(editTarget.price.toLocaleString('ko-KR'));
    } else {
      setName('');
      setPrice('');
    }
  }, [modalVisible]);

  const handleSubmit = () => {
    if (!name.trim() || !price.trim()) return;

    const newItem = {
      id: editTarget ? editTarget.id : Date.now().toString(),
      name: name.trim(),
      price: Number(price.replace(/,/g, '')),
    };

    submit(newItem);
    closeModal();
  };

  const handlePriceChange = (text) => {
    const raw = text.replace(/[^0-9]/g, '');
    const formatted = Number(raw).toLocaleString('ko-KR');
    setPrice(formatted);
  };

  return (
    <Modal
      isVisible={modalVisible}
      avoidKeyboard
      backdropOpacity={0.3}
      style={styles.modalStyle}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{editTarget ? '상품 수정' : '상품 추가'}</Text>
          <IconButton icon="close" onPress={closeModal} style={{marginRight:0}}/>
        </View>

        <TextInput
          placeholder="상품명"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="가격"
          value={price}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
          style={styles.input}
        />

        <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 10 }}>
          {editTarget ? '수정하기' : '추가하기'}
        </Button>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// react-native-paper의 모달 인풋 버벅임 버그로 직접 해결
const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});

export default ItemModal;

import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../../utils/format';

const SearchScreen = ({ navigation }: any) => {
    const [keyword, setKeyword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="search" size={20} color="#666" />
                <TextInput
                    style={styles.input}
                    placeholder="Tìm nhẫn, dây chuyền..."
                    value={keyword}
                    onChangeText={setKeyword}
                    autoFocus
                />
            </View>
            <View style={styles.body}>
                <Text style={{ textAlign: 'center', marginTop: 50, color: '#999' }}>
                    Nhập tên sản phẩm để tìm kiếm...
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
    header: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5',
        margin: 20, padding: 10, borderRadius: 10
    },
    input: { flex: 1, marginLeft: 10 },
    body: { flex: 1 }
});

export default SearchScreen;
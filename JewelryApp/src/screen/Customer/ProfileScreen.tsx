import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/format';

const ProfileScreen = ({ navigation }: any) => {
    const { orders } = useCart(); // Lấy danh sách đơn hàng

    const handleLogout = () => {
        // Demo đăng xuất: Quay về màn Login
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const renderOrderItem = ({ item }: any) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{item.id}</Text>
                <Text style={styles.orderStatus}>{item.status}</Text>
            </View>
            <Text style={styles.orderDate}>{item.date}</Text>
            <View style={styles.divider} />

            {/* Hiển thị 1 sản phẩm đại diện */}
            <Text style={styles.itemText}>
                {item.items[0].name} {item.items.length > 1 ? `và ${item.items.length - 1} sản phẩm khác` : ''}
            </Text>

            <View style={styles.orderFooter}>
                <Text style={styles.totalLabel}>Tổng tiền:</Text>
                <Text style={styles.totalPrice}>{formatCurrency(item.total)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header Profile */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=12' }} // Avatar mẫu
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.userName}>Ngô Thắng</Text>
                        <Text style={styles.userEmail}>thang123@gmail.com</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={28} color="red" />
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <Text style={styles.sectionTitle}>Lịch sử đơn hàng ({orders.length})</Text>

                {orders.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="receipt-outline" size={60} color="#ccc" />
                        <Text style={{ color: '#999', marginTop: 10 }}>Chưa có đơn hàng nào</Text>
                    </View>
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={item => item.id}
                        renderItem={renderOrderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </View>

            {/* Nút quay lại trang chủ */}
            <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home" size={24} color="#fff" />
                <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 5 }}>Trang Chủ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: 20, paddingTop: 60, backgroundColor: '#fff', marginBottom: 10
    },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
    userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    userEmail: { fontSize: 14, color: '#666' },

    body: { flex: 1, padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    emptyContainer: { alignItems: 'center', marginTop: 50 },

    orderCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    orderId: { fontWeight: 'bold', fontSize: 15 },
    orderStatus: { color: 'orange', fontWeight: 'bold' },
    orderDate: { color: '#999', fontSize: 12, marginBottom: 10 },
    divider: { height: 1, backgroundColor: '#eee', marginBottom: 10 },
    itemText: { fontSize: 14, color: '#555', marginBottom: 10 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontSize: 14, color: '#666' },
    totalPrice: { fontSize: 16, fontWeight: 'bold', color: 'red' },

    homeBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#D4AF37', margin: 20, padding: 15, borderRadius: 10
    }
});

export default ProfileScreen;
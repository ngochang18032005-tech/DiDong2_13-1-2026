import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/format';

const CartScreen = ({ navigation }: any) => {
    const { cart, updateQuantity, removeFromCart, totalAmount } = useCart();

    if (cart.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={80} color="#ccc" />
                <Text style={{ marginTop: 20, color: '#888' }}>Giỏ hàng trống</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#D4AF37', fontWeight: 'bold' }}>Tiếp tục mua sắm</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Giỏ Hàng ({cart.length})</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>

                            <View style={styles.quantityControl}>
                                <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrease')}>
                                    <Ionicons name="remove-circle-outline" size={24} color="#666" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => updateQuantity(item.id, 'increase')}>
                                    <Ionicons name="add-circle-outline" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                            <Ionicons name="trash-outline" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View style={styles.row}>
                    <Text style={styles.totalLabel}>Tổng cộng:</Text>
                    <Text style={styles.totalPrice}>{formatCurrency(totalAmount)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutBtn}
                    onPress={() => navigation.navigate('Checkout')} // 👈 Chuyển sang Checkout
                >
                    <Text style={styles.checkoutText}>THANH TOÁN NGAY</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', paddingTop: 30 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    itemContainer: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
    itemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 15 },
    itemInfo: { flex: 1 },
    itemName: { fontWeight: 'bold', fontSize: 14, marginBottom: 5 },
    itemPrice: { color: '#D4AF37', fontWeight: 'bold' },
    quantityControl: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    quantityText: { marginHorizontal: 15, fontWeight: 'bold' },
    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    totalLabel: { fontSize: 16, fontWeight: 'bold' },
    totalPrice: { fontSize: 18, fontWeight: 'bold', color: 'red' },
    checkoutBtn: { backgroundColor: '#D4AF37', padding: 15, borderRadius: 10, alignItems: 'center' },
    checkoutText: { color: '#fff', fontWeight: 'bold' }
});

export default CartScreen;
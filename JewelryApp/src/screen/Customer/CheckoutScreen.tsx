import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity,
    ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// 👇 Đảm bảo CartContext đã có hàm addOrder như bước trước mình gửi
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/format';

const CheckoutScreen = ({ navigation }: any) => {
    // 👇 Lấy hàm addOrder thay vì clearCart
    const { cart, totalAmount, addOrder } = useCart();

    const [name, setName] = useState('Admin User');
    const [phone, setPhone] = useState('0987654321');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [isLoading, setIsLoading] = useState(false);

    const handleOrder = () => {
        if (!address.trim()) {
            Alert.alert('Thiếu thông tin', 'Vui lòng nhập địa chỉ nhận hàng!');
            return;
        }

        setIsLoading(true);

        // Giả lập xử lý đặt hàng mất 2 giây
        setTimeout(() => {
            setIsLoading(false);

            // 👇 THAY ĐỔI QUAN TRỌNG: 
            // Gọi addOrder để lưu đơn hàng vào lịch sử & tự động xóa giỏ
            addOrder({
                name,
                phone,
                address,
                paymentMethod
            });

            Alert.alert(
                '🎉 Đặt hàng thành công!',
                `Cảm ơn ${name} đã mua sắm.\nBạn có thể xem lại đơn hàng trong mục Hồ sơ.`,
                [
                    // Nút chuyển hướng về trang Profile để xem đơn vừa đặt
                    { text: 'Xem đơn hàng', onPress: () => navigation.navigate('Profile') },
                    { text: 'Về trang chủ', onPress: () => navigation.navigate('Home') }
                ]
            );
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thanh Toán</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>📍 Thông tin giao hàng</Text>
                <View style={styles.card}>
                    <Text style={styles.label}>Họ và tên</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />

                    <Text style={styles.label}>Số điện thoại</Text>
                    <TextInput style={styles.input} value={phone} keyboardType="phone-pad" onChangeText={setPhone} />

                    <Text style={styles.label}>Địa chỉ nhận hàng</Text>
                    <TextInput
                        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                        placeholder="Số nhà, đường, phường, quận..."
                        value={address}
                        onChangeText={setAddress}
                        multiline
                    />
                </View>

                <Text style={styles.sectionTitle}>📦 Đơn hàng ({cart.length} sản phẩm)</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Tổng thanh toán</Text>
                        <Text style={styles.totalPrice}>{formatCurrency(totalAmount)}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>💳 Phương thức thanh toán</Text>

                <TouchableOpacity
                    style={[styles.paymentOption, paymentMethod === 'COD' && styles.paymentActive]}
                    onPress={() => setPaymentMethod('COD')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="cash-outline" size={24} color="#D4AF37" />
                        <Text style={styles.paymentText}>Thanh toán khi nhận hàng (COD)</Text>
                    </View>
                    <View style={styles.radioOuter}>
                        {paymentMethod === 'COD' && <View style={styles.radioInner} />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.paymentOption, paymentMethod === 'BANKING' && styles.paymentActive]}
                    onPress={() => setPaymentMethod('BANKING')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="qr-code-outline" size={24} color="#D4AF37" />
                        <Text style={styles.paymentText}>Chuyển khoản Ngân hàng / QR</Text>
                    </View>
                    <View style={styles.radioOuter}>
                        {paymentMethod === 'BANKING' && <View style={styles.radioInner} />}
                    </View>
                </TouchableOpacity>

                {paymentMethod === 'BANKING' && (
                    <View style={styles.bankingInfo}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>🏦 THÔNG TIN CHUYỂN KHOẢN:</Text>
                        <Text>Ngân hàng: <Text style={{ fontWeight: 'bold' }}>MB Bank</Text></Text>
                        <Text>STK: <Text style={{ fontWeight: 'bold', color: 'blue' }}>9999.8888.6666</Text></Text>
                        <Text>Chủ TK: <Text style={{ fontWeight: 'bold' }}>LUXURY STORE</Text></Text>
                        <Text>Nội dung: <Text style={{ fontWeight: 'bold', color: 'red' }}>THANHTOAN {phone}</Text></Text>
                    </View>
                )}

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleOrder} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.confirmText}>ĐẶT HÀNG ({formatCurrency(totalAmount)})</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    content: { padding: 20, paddingBottom: 100 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 10, color: '#555' },
    card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10 },
    label: { fontSize: 13, color: '#666', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: '#fafafa' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    totalLabel: { fontSize: 16, fontWeight: 'bold' },
    totalPrice: { fontSize: 18, fontWeight: 'bold', color: 'red' },
    paymentOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
    paymentActive: { borderColor: '#D4AF37', backgroundColor: '#FFFdf0' },
    paymentText: { marginLeft: 10, fontWeight: '500' },
    radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
    radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#D4AF37' },
    bankingInfo: { backgroundColor: '#e8f4fd', padding: 15, borderRadius: 10, marginTop: -5, marginBottom: 15, borderWidth: 1, borderColor: '#b6e1fc' },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderColor: '#eee' },
    confirmBtn: { backgroundColor: '#D4AF37', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    confirmText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default CheckoutScreen;
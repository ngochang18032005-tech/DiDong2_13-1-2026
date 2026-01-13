import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../../utils/format';
import { useCart } from '../../context/CartContext'; // Import Context vừa tạo

const ProductDetailScreen = ({ route, navigation }: any) => {
    const { product } = route.params; // Lấy dữ liệu sản phẩm từ Home gửi sang
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        Alert.alert('Thành công', 'Đã thêm sản phẩm vào giỏ hàng!');
    };

    return (
        <View style={styles.container}>
            {/* Nút Back */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <ScrollView>
                <Image source={product.image} style={styles.image} />

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>{formatCurrency(product.price)}</Text>

                    <View style={styles.rating}>
                        <Ionicons name="star" size={16} color="#D4AF37" />
                        <Text style={{ marginLeft: 5 }}>{product.rating} (50 đánh giá)</Text>
                    </View>

                    <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
                    <Text style={styles.description}>
                        Sản phẩm được chế tác tinh xảo từ {product.name.includes('Vàng') ? 'Vàng thật' : 'Bạc cao cấp'}.
                        Thiết kế sang trọng, phù hợp cho các dịp lễ, đám cưới hoặc làm quà tặng.
                        Bảo hành trọn đời tại Luxury Jewelry.
                    </Text>
                </View>
            </ScrollView>

            {/* Footer Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
                    <Text style={styles.addText}>THÊM VÀO GIỎ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: '#fff', padding: 8, borderRadius: 20 },
    image: { width: '100%', height: 400, resizeMode: 'cover' },
    infoContainer: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: '#fff' },
    name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    price: { fontSize: 20, color: '#D4AF37', fontWeight: 'bold', marginBottom: 10 },
    rating: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    descriptionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    description: { lineHeight: 22, color: '#666' },
    footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee' },
    addBtn: { backgroundColor: '#333', padding: 15, borderRadius: 10, alignItems: 'center' },
    addText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default ProductDetailScreen;
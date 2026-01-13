import React from 'react';
import {
  View, Text, StyleSheet, Image, TextInput,
  TouchableOpacity, FlatList, Dimensions, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../../utils/format';
import { useCart } from '../../context/CartContext';

// --- 1. DỮ LIỆU DANH MỤC ---
const CATEGORIES = [
  { id: '1', name: 'Nhẫn', icon: require('../../assets/cat_ring.png') },
  { id: '2', name: 'Dây chuyền', icon: require('../../assets/cat_necklace.jpg') },
  { id: '3', name: 'Bông tai', icon: require('../../assets/cat_earrings.jpg') },
  { id: '4', name: 'Lắc tay', icon: require('../../assets/cat_bracelet.jpg') },
  { id: '5', name: 'Kim cương', icon: require('../../assets/cat_diamond.jpg') },
];

// --- 2. DỮ LIỆU SẢN PHẨM ---
const PRODUCTS = [
  {
    id: '1', name: 'Nhẫn Kim Cương PNJ Vàng 18K', price: 15500000,
    image: require('../../assets/product_ring_18k.png'), rating: 4.8
  },
  {
    id: '2', name: 'Dây Chuyền Vàng Ý 18K', price: 8900000,
    image: require('../../assets/product_necklace_gold.jpg'), rating: 5.0
  },
  {
    id: '3', name: 'Bông Tai Ngọc Trai', price: 3200000,
    image: require('../../assets/product_earrings_pearl.jpg'), rating: 4.5
  },
  {
    id: '4', name: 'Lắc Tay Bạc PNJSilver', price: 950000,
    image: require('../../assets/product_bracelet_silver.png'), rating: 4.7
  },
  {
    id: '5', name: 'Nhẫn Cưới Vàng 24K', price: 12000000,
    image: require('../../assets/product_wedding_ring.png'), rating: 4.9
  },
  {
    id: '6', name: 'Mặt Dây Chuyền Phật', price: 5600000,
    image: require('../../assets/product_pendant_buddha.png'), rating: 4.8
  },
];

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 15;

const HomeScreen = ({ navigation }: any) => {
  const { cart } = useCart();

  // --- Header Component ---
  const renderHeader = () => (
    <View>
      {/* 1. Top Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greetingText}>Xin chào, Admin 👋</Text>

          {/* 👇 CẬP NHẬT: Bấm vào tên để mở trang Profile */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.brandText}>LUXURY JEWELRY 👤</Text>
          </TouchableOpacity>
        </View>

        {/* Nút Giỏ Hàng */}
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#333" />

          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={{ marginRight: 10 }} />
        <TextInput placeholder="Tìm kiếm trang sức..." style={styles.searchInput} />
      </View>

      {/* 3. Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../../assets/banner_wedding.png')}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>WEDDING COLLECTION</Text>
          <Text style={styles.bannerSub}>Up to 20% OFF</Text>
        </View>
      </View>

      {/* 4. Categories */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIconBox}>
                <Image source={item.icon} style={styles.categoryIcon} />
              </View>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginHorizontal: 15, marginTop: 20 }]}>Sản phẩm mới nhất</Text>
    </View>
  );

  // --- Product Item Component ---
  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#D4AF37" />
          <Text style={styles.ratingText}>{item.rating} | Đã bán 20+</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={PRODUCTS}
        keyExtractor={item => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  headerContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, paddingTop: 50, backgroundColor: '#fff'
  },
  greetingText: { fontSize: 12, color: '#666' },
  brandText: { fontSize: 20, fontWeight: 'bold', color: '#D4AF37' },
  cartBtn: { padding: 5 },
  badge: {
    position: 'absolute', top: -5, right: -5, backgroundColor: 'red',
    width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center',
    zIndex: 10, borderWidth: 1.5, borderColor: '#fff'
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 20, paddingHorizontal: 15, height: 45, borderRadius: 8,
    marginBottom: 15, borderWidth: 1, borderColor: '#eee'
  },
  searchInput: { flex: 1 },
  bannerContainer: { marginHorizontal: 20, borderRadius: 12, overflow: 'hidden', height: 160 },
  bannerImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  bannerOverlay: {
    position: 'absolute', bottom: 20, left: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', padding: 10, borderRadius: 8
  },
  bannerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  bannerSub: { color: '#FFD700', fontSize: 12, marginTop: 2 },
  sectionContainer: { marginTop: 25, paddingLeft: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  categoryItem: { marginRight: 20, alignItems: 'center' },
  categoryIconBox: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  categoryIcon: { width: 30, height: 30, resizeMode: 'contain' },
  categoryName: { fontSize: 12, color: '#555' },
  row: { justifyContent: 'space-between', paddingHorizontal: 15 },
  productCard: {
    width: COLUMN_WIDTH, backgroundColor: '#fff', borderRadius: 10,
    marginBottom: 15, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1
  },
  productImage: { width: '100%', height: 140, resizeMode: 'cover' },
  productInfo: { padding: 10 },
  productName: { fontSize: 13, fontWeight: '500', color: '#333', marginBottom: 5, height: 35 },
  productPrice: { fontSize: 15, fontWeight: 'bold', color: '#D4AF37' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingText: { fontSize: 10, color: '#999', marginLeft: 3 },
  addBtn: {
    position: 'absolute', bottom: 10, right: 10,
    backgroundColor: '#333', width: 28, height: 28, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center'
  },
});

export default HomeScreen;
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'; // Đường dẫn tới Navigator của bạn
// 👇 Import CartProvider từ file vừa tạo ở Bước 1
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    // 👇 BỌC TOÀN BỘ APP BẰNG CART PROVIDER
    <CartProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </CartProvider>
  );
}
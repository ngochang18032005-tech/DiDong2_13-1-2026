import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// 1. Nhóm màn hình Xác thực (Auth)
import LoginScreen from '../screen/Auth/LoginScreen';
import RegisterScreen from '../screen/Auth/RegisterScreen';

// 2. Nhóm màn hình Chính (Chứa thanh Tab ở dưới đáy)
// Bao gồm: Trang chủ, Tìm kiếm, Đánh giá, Giỏ hàng, Cá nhân
import MainTabNavigator from './MainTabNavigator';

// 3. Nhóm màn hình Con (Nằm đè lên Tab khi bấm vào)
import ProductDetailScreen from '../screen/Customer/ProductDetailScreen';
import CheckoutScreen from '../screen/Customer/CheckoutScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }} // Ẩn header mặc định của Stack
            >

                {/* --- KHU VỰC ĐĂNG NHẬP/ĐĂNG KÝ --- */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />

                {/* --- KHU VỰC CHÍNH (SAU KHI LOGIN) --- */}
                {/* Màn hình 'Main' chứa thanh Tab ở dưới đáy */}
                <Stack.Screen name="Main" component={MainTabNavigator} />

                {/* --- CÁC MÀN HÌNH CON KHÁC --- */}
                {/* Khi bấm vào sản phẩm -> Nhảy sang màn hình Chi tiết (che mất thanh Tab) */}
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

                {/* Khi bấm thanh toán -> Nhảy sang màn hình Checkout */}
                <Stack.Screen name="Checkout" component={CheckoutScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
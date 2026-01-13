import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

// Import các màn hình
import HomeScreen from '../screen/Customer/HomeScreen';
import SearchScreen from '../screen/Customer/SearchScreen';
import StoreReviewScreen from '../screen/Customer/StoreReviewScreen';
import CartScreen from '../screen/Customer/CartScreen';
import ProfileScreen from '../screen/Customer/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const { cart } = useCart(); // Lấy số lượng giỏ hàng để hiện Badge đỏ

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Ẩn header mặc định của Tab
                tabBarActiveTintColor: '#D4AF37', // Màu vàng khi chọn
                tabBarInactiveTintColor: 'gray',  // Màu xám khi không chọn
                tabBarStyle: { paddingBottom: 5, height: 60 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'HomeTab') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'SearchTab') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'ReviewTab') {
                        iconName = focused ? 'star' : 'star-outline';
                    } else if (route.name === 'CartTab') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'ProfileTab') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{ tabBarLabel: 'Trang chủ' }}
            />

            <Tab.Screen
                name="SearchTab"
                component={SearchScreen}
                options={{ tabBarLabel: 'Tìm kiếm' }}
            />

            <Tab.Screen
                name="ReviewTab"
                component={StoreReviewScreen}
                options={{ tabBarLabel: 'Đánh giá' }}
            />

            <Tab.Screen
                name="CartTab"
                component={CartScreen}
                options={{
                    tabBarLabel: 'Giỏ hàng',
                    // Hiển thị số lượng màu đỏ trên icon Giỏ hàng
                    tabBarBadge: cart.length > 0 ? cart.length : undefined
                }}
            />

            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Cá nhân' }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../../api/authApi';

const LoginScreen = ({ navigation }: any) => {
    // Dùng tài khoản mặc định để test nhanh (đỡ phải gõ nhiều lần)
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123456');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // 1. Validate cơ bản
        if (email.length === 0 || password.length === 0) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ Email và Mật khẩu');
            return;
        }

        setIsLoading(true);

        try {
            // Gọi API đăng nhập (Giả lập hoặc Thật)
            const response: any = await authApi.login({ email, password });

            // Backend trả về: { token: "...", user: { ... } }
            const { token, user } = response.data;

            // 2. Lưu Token và User vào bộ nhớ máy
            await AsyncStorage.setItem('accessToken', token);
            await AsyncStorage.setItem('userProfile', JSON.stringify(user));

            Alert.alert('Thành công', 'Đăng nhập thành công!');

            // 3. 👇 QUAN TRỌNG: Chuyển sang màn hình 'Main' (Màn hình chứa Tab Bar)
            // Dùng reset để xóa lịch sử, không cho back lại màn Login
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });

        } catch (error: any) {
            console.log('Login Error:', error);
            const message = error.response?.data?.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại!';
            Alert.alert('Lỗi', message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logoText}>💎 LUXURY JEWELRY</Text>
                <Text style={styles.subText}>Tinh hoa trang sức Việt</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                <Text style={styles.label}>Email / Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    placeholder="admin@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput
                    style={styles.input}
                    placeholder="123456"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <View style={styles.registerContainer}>
                        <Text style={{ color: '#666' }}>Chưa có tài khoản? </Text>
                        <Text style={styles.registerText}>Đăng ký ngay</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
    header: { alignItems: 'center', marginBottom: 40 },
    logoText: { fontSize: 28, fontWeight: 'bold', color: '#D4AF37' },
    subText: { fontSize: 14, color: '#666', marginTop: 5 },
    form: { width: '100%' },
    label: { fontWeight: '600', marginBottom: 5, color: '#333' },
    input: {
        height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
        paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fafafa'
    },
    button: {
        height: 50, backgroundColor: '#D4AF37', borderRadius: 8,
        justifyContent: 'center', alignItems: 'center', marginTop: 10,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, shadowRadius: 4, elevation: 3
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    registerText: { color: '#D4AF37', fontWeight: 'bold' }
});

export default LoginScreen;
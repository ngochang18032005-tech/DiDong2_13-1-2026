import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    Alert, ScrollView, ActivityIndicator
} from 'react-native';
import { authApi } from '../../api/authApi';

const RegisterScreen = ({ navigation }: any) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        // 1. Validate dữ liệu
        if (!fullName || !email || !password || !phoneNumber) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp!');
            return;
        }

        // 2. Gọi API
        setIsLoading(true);
        try {
            await authApi.register({
                fullName,
                email,
                password,
                phoneNumber
            });

            Alert.alert('Thành công', 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
            navigation.goBack(); // Quay lại màn hình Login

        } catch (error: any) {
            const message = error.response?.data?.message || 'Đăng ký thất bại, email có thể đã tồn tại.';
            Alert.alert('Lỗi', message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Tạo tài khoản mới</Text>
                    <Text style={styles.subTitle}>Trở thành thành viên của Luxury Jewelry</Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Họ và tên"
                        value={fullName} onChangeText={setFullName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email} onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        value={phoneNumber} onChangeText={setPhoneNumber}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry
                        value={password} onChangeText={setPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry
                        value={confirmPassword} onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>ĐĂNG KÝ NGAY</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.loginLink}>
                        <Text style={{ color: '#666' }}>Đã có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.linkText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
    header: { marginBottom: 30 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#D4AF37', marginBottom: 5 },
    subTitle: { fontSize: 14, color: '#666' },
    form: { width: '100%' },
    input: {
        height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
        paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fafafa'
    },
    button: {
        height: 50, backgroundColor: '#333', // Màu đen sang trọng
        borderRadius: 8, justifyContent: 'center', alignItems: 'center',
        marginTop: 10, elevation: 3
    },
    buttonText: { color: '#D4AF37', fontWeight: 'bold', fontSize: 16 }, // Chữ vàng trên nền đen
    loginLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    linkText: { color: '#D4AF37', fontWeight: 'bold' }
});

export default RegisterScreen;
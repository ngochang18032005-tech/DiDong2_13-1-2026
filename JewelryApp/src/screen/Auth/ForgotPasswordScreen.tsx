import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    Alert, ActivityIndicator, Keyboard
} from 'react-native';

const ForgotPasswordScreen = ({ navigation }: any) => {
    // Step 1: Nhập SĐT, Step 2: Nhập OTP, Step 3: Đổi mật khẩu (Tuỳ chọn)
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpInput, setOtpInput] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(''); // Lưu mã OTP hệ thống tự sinh ra
    const [isLoading, setIsLoading] = useState(false);

    // --- HÀM 1: GIẢ LẬP GỬI OTP ---
    const handleSendOTP = () => {
        // Validate số điện thoại cơ bản
        if (!phoneNumber || phoneNumber.length < 10) {
            Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại hợp lệ!');
            return;
        }

        setIsLoading(true);
        Keyboard.dismiss(); // Ẩn bàn phím

        // Giả lập chờ mạng (1.5 giây)
        setTimeout(() => {
            setIsLoading(false);

            // 👉 LOGIC RANDOM OTP Ở ĐÂY 👈
            // Math.random() sinh số từ 0-1. Nhân với 900000 + 100000 để ra số 6 chữ số
            const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

            // Lưu lại mã này để lát so sánh
            setGeneratedOtp(randomCode);

            // Chuyển sang bước nhập OTP
            setStep(2);

            // GIẢ LẬP TIN NHẮN TỚI ĐIỆN THOẠI
            Alert.alert(
                '📩 Tin nhắn giả lập',
                `Mã OTP xác thực của bạn là: ${randomCode}`,
                [{ text: 'OK, Đã nhớ' }]
            );
        }, 1500);
    };

    // --- HÀM 2: KIỂM TRA OTP ---
    const handleVerifyOTP = () => {
        if (otpInput === generatedOtp) {
            Alert.alert(
                '✅ Thành công',
                'Xác thực thành công! Mật khẩu mới đã được gửi về SMS.',
                [
                    {
                        text: 'Đăng nhập ngay',
                        onPress: () => navigation.navigate('Login') // Quay về Login
                    }
                ]
            );
        } else {
            Alert.alert('❌ Thất bại', 'Mã OTP không chính xác. Vui lòng thử lại!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>QUÊN MẬT KHẨU</Text>
                <Text style={styles.subTitle}>
                    {step === 1
                        ? 'Nhập số điện thoại để lấy lại mật khẩu'
                        : `Đã gửi mã OTP đến số ${phoneNumber}`}
                </Text>
            </View>

            <View style={styles.form}>
                {/* --- GIAO DIỆN BƯỚC 1: NHẬP SĐT --- */}
                {step === 1 && (
                    <>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0987xxxxxx"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad" // Bàn phím số
                            maxLength={10}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSendOTP}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.btnText}>GỬI MÃ OTP</Text>
                            )}
                        </TouchableOpacity>
                    </>
                )}

                {/* --- GIAO DIỆN BƯỚC 2: NHẬP OTP --- */}
                {step === 2 && (
                    <>
                        <Text style={styles.label}>Nhập mã OTP (6 số)</Text>
                        <TextInput
                            style={[styles.input, styles.otpInput]}
                            placeholder="- - - - - -"
                            value={otpInput}
                            onChangeText={setOtpInput}
                            keyboardType="number-pad"
                            maxLength={6}
                            autoFocus={true}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                            <Text style={styles.btnText}>XÁC NHẬN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.resendBtn}
                            onPress={() => { setStep(1); setOtpInput(''); }}
                        >
                            <Text style={{ color: '#666' }}>Chưa nhận được? <Text style={{ fontWeight: 'bold' }}>Gửi lại</Text></Text>
                        </TouchableOpacity>
                    </>
                )}

                {/* Nút quay lại */}
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={{ color: '#D4AF37', fontWeight: '600' }}>Quay lại Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Style Luxury (Vàng - Đen - Trắng)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 80 },
    header: { marginBottom: 30 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#D4AF37', marginBottom: 10, textTransform: 'uppercase' },
    subTitle: { color: '#666', fontSize: 14 },
    form: { width: '100%' },
    label: { fontWeight: '600', marginBottom: 8, color: '#333' },
    input: {
        height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
        paddingHorizontal: 15, marginBottom: 20, backgroundColor: '#fafafa', fontSize: 16
    },
    otpInput: { textAlign: 'center', letterSpacing: 8, fontSize: 24, fontWeight: 'bold' },
    button: {
        height: 50, backgroundColor: '#D4AF37', borderRadius: 8,
        justifyContent: 'center', alignItems: 'center', elevation: 3, shadowColor: '#000'
    },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    resendBtn: { marginTop: 20, alignItems: 'center' },
    backBtn: { marginTop: 40, alignItems: 'center' }
});

export default ForgotPasswordScreen;
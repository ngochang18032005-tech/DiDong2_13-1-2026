// import axiosClient from './axiosClient'; // Tạm thời đóng kết nối thật lại

export const authApi = {
    // --- 1. HÀM LOGIN GIẢ LẬP ---
    login: async (payload: any) => {
        console.log('⚡ [API Mock] Đang giả lập đăng nhập...', payload);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        // Token giả để App lưu vào máy
                        token: 'fake_login_token_123456789',

                        // Thông tin User giả
                        user: {
                            email: payload.email,
                            name: 'Admin User',
                            role: 'ADMIN',
                            avatar: 'https://i.pravatar.cc/150?img=3' // Ảnh đại diện ngẫu nhiên
                        }
                    }
                });
            }, 1000); // Giả vờ đợi 1 giây
        });

        // 👇 Khi nào có Server thật thì mở dòng dưới này ra và xóa đoạn trên đi
        // return axiosClient.post('/auth/login', payload);
    },

    // --- 2. HÀM REGISTER GIẢ LẬP (Tự động đăng nhập) ---
    register: async (payload: any) => {
        console.log('⚡ [API Mock] Đang giả lập đăng ký & trả về Token...', payload);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        // 👉 Trả về Token luôn để RegisterScreen tự chuyển vào Home
                        token: 'fake_register_token_999999999',

                        user: {
                            email: payload.email,
                            name: payload.fullName, // Lấy tên người dùng vừa nhập
                            role: 'USER',
                            phoneNumber: payload.phoneNumber,
                            avatar: 'https://i.pravatar.cc/150?img=12'
                        },

                        message: 'Đăng ký thành công! Chào mừng bạn mới.'
                    }
                });
            }, 1500); // Giả vờ đợi 1.5 giây cho giống thật
        });

        // 👇 Khi nào có Server thật thì dùng dòng này
        // return axiosClient.post('/auth/register', payload);
    },

    // --- 3. HÀM QUÊN MẬT KHẨU (Nếu cần sau này) ---
    forgotPassword: async (email: string) => {
        // return axiosClient.post('/auth/forgot-password', { email });
        return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true } }), 1000));
    }
};
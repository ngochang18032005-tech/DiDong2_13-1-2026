import axios from 'axios'; // Hoặc import axios from 'axios';

// ⚠️ LƯU Ý QUAN TRỌNG VỀ ĐỊA CHỈ IP:
// - Nếu chạy trên Android Emulator: Dùng 'http://10.0.2.2:8080/api'
// - Nếu chạy trên Máy thật: Dùng IP LAN của máy tính (VD: 'http://192.168.1.15:8080/api')
// - Tuyệt đối KHÔNG dùng 'localhost' vì máy ảo/điện thoại không hiểu localhost là máy tính của bạn.

const baseURL = 'http://192.168.1.15:8080/api'; // Thay IP máy bạn vào

const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
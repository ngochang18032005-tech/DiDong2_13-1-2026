import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const REVIEWS = [
    { id: '1', user: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm rất đẹp, sáng bóng!', date: '10/01/2024' },
    { id: '2', user: 'Trần Thị B', rating: 4, comment: 'Giao hàng hơi chậm nhưng nhẫn đẹp.', date: '12/01/2024' },
    { id: '3', user: 'Lê C', rating: 5, comment: 'Tuyệt vời, sẽ ủng hộ tiếp.', date: '15/01/2024' },
];

const StoreReviewScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đánh giá từ khách hàng</Text>
            <View style={styles.summary}>
                <Text style={styles.score}>4.8/5</Text>
                <View style={{ flexDirection: 'row' }}><Ionicons name="star" size={20} color="#D4AF37" /><Ionicons name="star" size={20} color="#D4AF37" /><Ionicons name="star" size={20} color="#D4AF37" /><Ionicons name="star" size={20} color="#D4AF37" /><Ionicons name="star-half" size={20} color="#D4AF37" /></View>
                <Text style={{ color: '#666' }}>(1.2k đánh giá)</Text>
            </View>

            <FlatList
                data={REVIEWS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.user}>{item.user}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            {[...Array(item.rating)].map((_, i) => (
                                <Ionicons key={i} name="star" size={14} color="#D4AF37" />
                            ))}
                        </View>
                        <Text>{item.comment}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingHorizontal: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    summary: { alignItems: 'center', marginBottom: 20, padding: 20, backgroundColor: '#FFFdf0', borderRadius: 10 },
    score: { fontSize: 32, fontWeight: 'bold', color: '#D4AF37' },
    reviewCard: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
    user: { fontWeight: 'bold' },
    date: { fontSize: 12, color: '#999' }
});

export default StoreReviewScreen;
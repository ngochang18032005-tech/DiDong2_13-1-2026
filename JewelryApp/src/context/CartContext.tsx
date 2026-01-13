import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
    const [cart, setCart] = useState<any[]>([]);
    // 👇 MỚI: Thêm state để lưu lịch sử đơn hàng
    const [orders, setOrders] = useState<any[]>([]);

    // ... (Giữ nguyên các hàm addToCart, updateQuantity, removeFromCart)
    const addToCart = (product: any) => { /* ...code cũ... */
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            } else { return [...prevCart, { ...product, quantity: 1 }]; }
        });
    };

    const updateQuantity = (id: string, type: 'increase' | 'decrease') => { /* ...code cũ... */
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === id) {
                    const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
                }
                return item;
            });
        });
    };

    const removeFromCart = (id: string) => { /* ...code cũ... */
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // 👇 SỬA HÀM clearCart THÀNH addOrder
    // Khi thanh toán xong, ta chuyển giỏ hàng thành một "Đơn hàng" rồi mới xóa
    const addOrder = (customerInfo: any) => {
        const newOrder = {
            id: 'ORD-' + new Date().getTime(), // Tạo mã đơn hàng ngẫu nhiên
            date: new Date().toLocaleString(), // Ngày giờ mua
            items: cart, // Lưu lại các món đã mua
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: 'Đang xử lý', // Trạng thái mặc định
            customer: customerInfo
        };

        setOrders((prev) => [newOrder, ...prev]); // Thêm vào đầu danh sách
        setCart([]); // Xóa sạch giỏ hàng
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        // 👇 Nhớ thêm orders và addOrder vào value
        <CartContext.Provider value={{ cart, orders, addToCart, updateQuantity, removeFromCart, addOrder, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
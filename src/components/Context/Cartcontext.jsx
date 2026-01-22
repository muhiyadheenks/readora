import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, setUser } = useAuth();
    const [cart, setCart] = useState(user?.cart || []);



    useEffect(() => {

        if (user?.cart) {
            setCart(user.cart);
        }
    }, [user]);

    const saveCartToDB = async (updatedCart) => {
        if (!user) return;
        try {
            await api.patch(`/users/${user.id}`, {
                cart: updatedCart,
            })

            setUser(prev => ({
                ...prev,
                cart: updatedCart,
            }));
        } catch (err) { console.error("cart update failed", err) }
    };



    // Add cart
    const addToCart = async (book) => {
        let updatedCart;

        const exist = cart.find((item) => item.id === book.id);

        if (exist) {
            updatedCart = cart.map((item) =>
                item.id === book.id ? { ...item, qty: item.qty + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...book, qty: 1 }];
        }

        setCart(updatedCart);
        saveCartToDB(updatedCart);
    };
    // Remove cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        saveCartToDB(updatedCart);
    };

    // Increase qty
    const increaseQty = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
        setCart(updatedCart);
        saveCartToDB(updatedCart);

    };

    // Decrease qty
    const decreaseQty = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id && item.qty > 1
                ? { ...item, qty: item.qty - 1 }
                : item
        );
        setCart(updatedCart);
        saveCartToDB(updatedCart);

    };
    // clear cart
    const clearCart = () => {
        setCart([]);
        saveCartToDB([]);
    };


    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

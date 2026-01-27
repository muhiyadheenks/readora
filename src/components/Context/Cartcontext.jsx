import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";
import { v4 as uuid } from "uuid";
import { array } from "yup";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, setUser } = useAuth();
    const [cart, setCart] = useState({});
    const [refreshcart, setRefreshcart] = useState(Math.random())


    useEffect(() => {
        if (!user) {
            setCart({});
            return;
        }

        api
            .get(`/cart?userId=${user.id}`)
            .then((res) => {
                setCart(res.data[0] || {});
            })
            .catch((err) => console.error(err));
    }, [user, refreshcart]);

    // const saveCartToDB = async (updatedCart) => {
    //     if (!user) return;
    //     try {
    //         await api.patch(`/users/${user.id}`, {
    //             cart: updatedCart,
    //         })

    //         setUser(prev => ({
    //             ...prev,
    //             cart: updatedCart,
    //         }));
    //     } catch (err) { console.error("cart update failed", err) }
    // };



    const saveCartToDB = async (items) => {
        if (!user) return;
        if (Object.keys(cart).length === 0) {
            // create cart ONCE
            await api.post("/cart", {
                userId: user.id,
                items
            });

        } else {
            // update existing cart
            await api.patch(`/cart/${cart.id}`, {
                items
            });
        }
        setRefreshcart(Math.random())


    };



    // Add cart
    const addToCart = async (book) => {
        let updatedCart;

        const exist = cart.items?.find((item) => item.id === book.id);
        if (exist) {
            updatedCart = cart.items?.map((item) =>
                item.id === book.id ? { ...item, qty: item.qty + 1 } : item
            );
        } else {
            if (Array.isArray(cart.items)) {
                updatedCart = [...cart.items, { ...book, qty: 1 }];
            } else {
                updatedCart = [{ ...book, qty: 1 }]
            }
        }


        saveCartToDB(updatedCart);
    };
    // Remove cart
    const removeFromCart = (id) => {
        const updatedCart = cart.items?.filter((item) => item.id !== id);
        setCart(updatedCart);
        saveCartToDB(updatedCart);
    };

    // Increase qty
    const increaseQty = (id) => {
        const updatedCart = cart.items?.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
        setCart(updatedCart);
        saveCartToDB(updatedCart);

    };

    // Decrease qty
    const decreaseQty = (id) => {
        const updatedCart = cart.items?.map((item) =>
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

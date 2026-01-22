import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";

const WishListContext = createContext(null);

export const useWishList = () => {
    const context = useContext(WishListContext);
    if (!context) {
        throw new Error("useWishList must be used within a WishListProvider");
    }
    return context;
};

export const WishListProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishList, setWishList] = useState([]);

    /* 🔹 Fetch wishlist when user is ready */
    useEffect(() => {
        if (!user?.id) return;

        const fetchWishlist = async () => {
            try {
                const res = await api.get(`/users/${user.id}`);
                setWishList(res.data.wishlist || []);
            } catch (err) {
                console.error("Failed to fetch wishlist", err);
            }
        };

        fetchWishlist();
    }, [user?.id]);

    /* 🔹 Add to wishlist */
    const addToWishList = async (item) => {
        if (wishList.includes(item)) return
        const updatedWishlist = [...wishList, item];

        try {
            await api.patch(`/users/${user.id}`, {
                wishlist: updatedWishlist,
            });
            setWishList(updatedWishlist);
        } catch (err) {
            console.error("Add to wishlist failed", err);
        }
    };

    /* 🔹 Remove from wishlist */
    const removeFromWishList = async (id) => {
        const updatedWishlist = wishList.filter(item => item.id !== id);

        try {
            await api.patch(`/users/${user.id}`, {
                wishlist: updatedWishlist,
            });
            setWishList(updatedWishlist);
        } catch (err) {
            console.error("Remove from wishlist failed", err);
        }
    };

    return (
        <WishListContext.Provider
            value={{ wishList, addToWishList, removeFromWishList }}
        >
            {children}
        </WishListContext.Provider>
    );
};

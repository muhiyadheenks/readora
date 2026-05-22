import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";
import { data } from "react-router-dom";

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
        if (!user?._id) return;

        api.get(`/api/wishlist/${user._id}`)
            .then((res) => setWishList(res.data.wishlist || []))
            .catch((err) => console.error(err));
    }, [user?._id]);

    /* 🔹 Add to wishlist */
    // const addToWishList = async (book) => {
    //     if (!user) return

    //     try {
    //         const res = await api.post(`/api/wishlist`, {
    //             userId: user._id,
    //             bookId: book._id
    //         });
    //         const updated = await api.get(`/api/wishlist/${user._id}`);
    //         setWishList(updated.data.wishList || []);
    //     } catch (err) {
    //         console.error("Add to wishlist failed", err);
    //     }
    // };

    const addToWishList = async (book) => {
        if (!user) return;
        try {
            console.log("adding book:", book._id);
            console.log("userId:", user._id);

            const res = await api.post(`/api/wishlist`, {
                userId: user._id,
                bookId: book._id
            });
            console.log("post response:", res.data);

            const updated = await api.get(`/api/wishlist/${user._id}`);
            console.log("get response:", updated.data);

            setWishList(updated.data.wishlist || []);
            console.log("wishlist set:", updated.data.wishlist);
        } catch (err) {
            console.error("Wishlist toggle failed", err);
        }
    };

    /* 🔹 Remove from wishlist */
    const removeFromWishList = async (bookId) => {
        if (!user) return
        try {
            await api.post(`/api/wishlist`, {
                userId: user._id,
                bookId
            })
            const updated = await api.get(`/api/wishlist/${user._id}`);
            setWishList(updated.data.wishlist || []);
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

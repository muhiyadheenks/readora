// // import React, { createContext, useContext, useEffect, useState } from "react";
// // import api from "../../API/Axios";
// // import { useAuth } from "./AuthContext";
// // import { v4 as uuid } from "uuid";
// // import { array } from "yup";


// // const CartContext = createContext();

// // export const CartProvider = ({ children }) => {
// //     const { user, setUser } = useAuth();
// //     const [cart, setCart] = useState({});
// //     const [refreshcart, setRefreshcart] = useState(Math.random())


// //     useEffect(() => {
// //         if (!user) {
// //             setCart({});
// //             return;
// //         }

// //         api
// //             .get(`/api/cart?userId=${user.id}`)
// //             .then((res) => {
// //                 setCart(res.data[0] || {});
// //             })
// //             .catch((err) => console.error(err));
// //     }, [user, refreshcart]);



// //     const saveCartToDB = async (items) => {
// //         if (!user) return;
// //         if (Object.keys(cart).length === 0) {
// //             // create cart ONCE
// //             await api.post("/api/cart", {
// //                 userId: user.id,
// //                 items
// //             });

// //         } else {
// //             // update existing cart
// //             await api.patch(`/api/cart/${cart.id}`, {
// //                 items
// //             });
// //         }
// //         setRefreshcart(Math.random())


// //     };



// //     // Add cart
// //     const addToCart = async (book) => {
// //         let updatedCart;

// //         const exist = cart.items?.find((item) => item.id === book.id);
// //         if (exist) {
// //             updatedCart = cart.items?.map((item) =>
// //                 item.id === book.id ? { ...item, qty: item.qty + 1 } : item
// //             );
// //         } else {
// //             if (Array.isArray(cart.items)) {
// //                 updatedCart = [...cart.items, { ...book, qty: 1 }];
// //             } else {
// //                 updatedCart = [{ ...book, qty: 1 }]
// //             }
// //         }


// //         saveCartToDB(updatedCart);
// //     };
// //     // Remove cart
// //     const removeFromCart = (id) => {
// //         const updatedCart = cart.items?.filter((item) => item.id !== id);
// //         setCart(updatedCart);
// //         saveCartToDB(updatedCart);
// //     };

// //     // Increase qty
// //     const increaseQty = (id) => {
// //         const updatedCart = cart.items?.map((item) =>
// //             item.id === id ? { ...item, qty: item.qty + 1 } : item
// //         );
// //         setCart(updatedCart);
// //         saveCartToDB(updatedCart);

// //     };

// //     // Decrease qty
// //     const decreaseQty = (id) => {
// //         const updatedCart = cart.items?.map((item) =>
// //             item.id === id && item.qty > 1
// //                 ? { ...item, qty: item.qty - 1 }
// //                 : item
// //         );
// //         setCart(updatedCart);
// //         saveCartToDB(updatedCart);

// //     };
// //     // clear cart
// //     const clearCart = () => {
// //         setCart([]);
// //         saveCartToDB([]);
// //     };


// //     return (
// //         <CartContext.Provider
// //             value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}
// //         >
// //             {children}
// //         </CartContext.Provider>
// //     );
// // };

// // export const useCart = () => useContext(CartContext);


// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "../../API/Axios";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const { user } = useAuth();
//     const [cart, setCart] = useState({});
//     const [refreshcart, setRefreshcart] = useState(Math.random());
//     useEffect(() => {
//         console.log("user object:", user);
//     }, [user]);
//     // Fetch cart on login
//     useEffect(() => {
//         if (!user) {
//             setCart({});
//             return;
//         }
//         api
//             .get(`/api/cart?userId=${user._id}`)
//             .then((res) => {
//                 setCart(res.data[0] || {});
//             })
//             .catch((err) => console.error(err));
//     }, [user, refreshcart]);

//     const saveCartToDB = async (items) => {
//         if (!user) return;
//         try {
//             if (!cart._id) {
//                 // No cart yet — create one
//                 const res = await api.post("/api/cart", {
//                     userId: user._id, items: cleanItems
//                 });
//                 setCart(res.data);
//             } else {
//                 // Cart exists — update it
//                 const res = await api.patch(`/api/cart/${cart._id}`, { items });
//                 setCart(res.data);
//             }
//             setRefreshcart(Math.random());
//         } catch (err) {
//             console.error("Cart save error:", err);
//         }
//     };

//     // Add to cart
//     // const addToCart = async (book) => {
//     //     const exist = cart.items?.find((item) => item.book?._id === book._id);
//     //     let updatedItems;

//     //     if (exist) {
//     //         // increase qty
//     //         updatedItems = cart.items.map((item) =>
//     //             item.book?._id === book._id ? { ...item, qty: item.qty + 1 } : item
//     //         );
//     //     } else {
//     //         //  add cart
//     //         const newItem = { book: book._id, qty: 1 };
//     //         updatedItems = Array.isArray(cart.items)
//     //             ? [...cart.items, newItem]
//     //             : [newItem];
//     //     }

//     //     await saveCartToDB(updatedItems);
//     // };


//     const saveCartToDB = async (items) => {
//         if (!user) return;
//         try {
//             // ✅ Define cleanItems here
//             const cleanItems = items.map((item) => ({
//                 book: item.book?._id || item.book,
//                 qty: item.qty
//             }));

//             if (!cart._id) {
//                 const res = await api.post("/api/cart", {
//                     userId: user._id,
//                     items: cleanItems // ✅ use cleanItems
//                 });
//                 setCart(res.data);
//             } else {
//                 const res = await api.patch(`/api/cart/${cart._id}`, {
//                     items: cleanItems // ✅ use cleanItems
//                 });
//                 setCart(res.data);
//             }
//             setRefreshcart(Math.random());
//         } catch (err) {
//             console.error("Cart save error:", err);
//         }
//     };


//     // Remove single item 
//     const removeFromCart = async (id) => {
//         const updatedItems = cart.items?.filter((item) => item.book?._id !== id);
//         await saveCartToDB(updatedItems);
//     };

//     // Increase qty
//     const increaseQty = async (id) => {
//         const updatedItems = cart.items?.map((item) =>
//             item.book?._id === id ? { ...item, qty: item.qty + 1 } : item
//         );
//         await saveCartToDB(updatedItems);
//     };

//     // Decrease qty — auto remove if qty hits 0
//     const decreaseQty = async (id) => {
//         const updatedItems = cart.items
//             ?.map((item) =>
//                 item.book?._id === id ? { ...item, qty: item.qty - 1 } : item
//             )
//             .filter((item) => item.qty > 0);
//         await saveCartToDB(updatedItems);
//     };

//     // Clear entire cart — DELETE from DB
//     const clearCart = async () => {
//         if (!cart._id) return;
//         try {
//             await api.delete(`/api/cart/${cart._id}`);
//             setCart({});
//         } catch (err) {
//             console.error("Clear cart error:", err);
//         }
//     };

//     return (
//         <CartContext.Provider
//             value={{ cart, addToCart, saveCartToDB, removeFromCart, increaseQty, decreaseQty, clearCart }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);


import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState({});
    const [refreshcart, setRefreshcart] = useState(Math.random());

    // Fetch cart on login
    useEffect(() => {
        if (!user) {
            setCart({});
            return;
        }
        api
            .get(`/api/cart?userId=${user._id}`)
            .then((res) => {
                console.log("cart response:", res.data); // ✅ add this

                setCart(res.data || {});

            })
            .catch((err) => console.error(err));
    }, [user, refreshcart]);

    const saveCartToDB = async (items) => {
        if (!user) return;
        try {
            const cleanItems = items.map((item) => ({
                book: item.book?._id || item.book,
                qty: item.qty
            }));

            if (!cart._id) {
                const res = await api.post("/api/cart", {
                    userId: user._id,
                    items: cleanItems
                });
                setCart(res.data);
            } else {
                const res = await api.patch(`/api/cart/${cart._id}`, {
                    items: cleanItems
                });
                setCart(res.data);
            }
            setRefreshcart(Math.random());
        } catch (err) {
            console.error("Cart save error:", err);
        }
    };

    const addToCart = async (book) => {
        const exist = cart.items?.find((item) => item.book?._id === book._id);
        let updatedItems;

        if (exist) {
            updatedItems = cart.items.map((item) =>
                item.book?._id === book._id ? { ...item, qty: item.qty + 1 } : item
            );
        } else {
            const newItem = { book: book._id, qty: 1 };
            updatedItems = Array.isArray(cart.items)
                ? [...cart.items, newItem]
                : [newItem];
        }
        await saveCartToDB(updatedItems);
    };

    const removeFromCart = async (id) => {
        const updatedItems = cart.items?.filter((item) => item.book?._id !== id);
        await saveCartToDB(updatedItems);
    };

    const increaseQty = async (id) => {
        const updatedItems = cart.items?.map((item) =>
            item.book?._id === id ? { ...item, qty: item.qty + 1 } : item
        );
        await saveCartToDB(updatedItems);
    };

    const decreaseQty = async (id) => {
        const updatedItems = cart.items
            ?.map((item) =>
                item.book?._id === id ? { ...item, qty: item.qty - 1 } : item
            )
            .filter((item) => item.qty > 0);
        await saveCartToDB(updatedItems);
    };

    const clearCart = async () => {
        if (!cart._id) return;
        try {
            await api.delete(`/api/cart/${cart._id}`);
            setCart({});
        } catch (err) {
            console.error("Clear cart error:", err);
        }
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
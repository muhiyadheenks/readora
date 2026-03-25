import { useEffect, useState } from "react"
import api from "../../API/Axios"

function AddBooks({ isOpen, onClose }) {
    const [book, setBook] = useState({
        category: "",
        title: "",
        img: "",
        price: "",
        author: "",
        description: "",
        rating: "",
        stock: ""
    })


    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setBook({ ...book, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!book.title || !book.price || !book.author) {
            alert("Please fill required fields")
            return
        }

        try {
            await api.post("/allbooks", {
                ...book,
                price: Number(book.price),

            })

            alert("Book added successfully ✅")
            onClose()   // close modal after success

            setBook({
                category: "",
                title: "",
                img: "",
                price: "",
                author: "",
                description: "",
                stock: ""
            })
        } catch (err) {
            console.error(err)
            alert("Failed to add book ")
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>

                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Add New Book
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        value={book.title}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />

                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={book.author}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={book.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />

                    <input
                        type="text"
                        name="img"
                        placeholder="Image URL"
                        value={book.img}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={book.price}
                            onChange={handleChange}
                            className="p-3 border rounded"
                        />


                    </div>

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={book.stock}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Book Description"
                        value={book.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                        rows={4}
                    />

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 w-full"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddBooks

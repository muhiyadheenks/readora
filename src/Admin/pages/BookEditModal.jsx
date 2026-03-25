import { useEffect, useState } from "react";
const BookEditModal = ({ isOpen, onClose, book, onSave }) => {

    const [formData, setFormData] = useState({
        title: book?.title || "",
        author: book?.author || "",
        price: book?.price || "",
        category: book?.category || "",
        description: book?.description || "",
        stock: book?.stock || "",
    });

    useEffect(() => {
        setFormData({
            title: book?.title || "",
            author: book?.author || "",
            price: book?.price || "",
            category: book?.category || "",
            description: book?.description || "",
            stock: book?.stock || "",
        })
    }, [book])
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Edit Book</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />

                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />


                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookEditModal;

import { useEffect, useState } from "react"
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaSearch,
} from "react-icons/fa"
import api from "../../API/Axios"
import { useNavigate } from "react-router-dom"
import BookEditModal from "./BookEditModal"
import AddBooks from "../components/AddBooks"

const AdminBooks = ({ book }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [books, setBooks] = useState([])
    const [editBook, setEditBook] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [addopen, setAddopen] = useState(false);
    const [page, setPage] = useState(1)
    const limit = 8;

    const handleEdit = (book) => {
        setSelectedBook(book)
        setOpen(true);
    };
    const fetchbook = async () => {
        try {
            const res = await api.get(`/allbooks?&_sort=id&_order=asc`)
            const start = (page - 1) * limit;
            const end = start + limit;
            setBooks(res.data.slice(start, end));
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {

        fetchbook()
    }, [page])

    // editbook & updation
    const handleSave = async (updatedBook) => {
        try {
            await api.patch(`/allbooks/${selectedBook.id}`, updatedBook);

            setBooks((prev) =>
                prev.map((b) =>
                    b.id === selectedBook.id ? { ...b, ...updatedBook } : b
                )
            );

            setOpen(false);
        } catch (error) {
            console.error("Book update failed", error);
        }
    };




    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    )

    const deleteBook = async (id) => {
        if (window.confirm("Delete this book?"))
            try {
                api.delete(`/allbooks/${id}`);
                setBooks(prev => prev.filter((o) => o.id !== id))
            } catch (error) {
                console.error("Delete failed", error);

            }
    }

    const toggleStatus = (id) => {
        setBooks(
            books.map((b) =>
                b.id === id
                    ? {
                        ...b,
                        status: b.status === "Active" ? "Disabled" : "Active",
                    }
                    : b
            )
        )
    }


    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen text-black">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Books Management</h1>
                <button
                    onClick={() => setAddopen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
                    <FaPlus /> Add Book
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-white p-3 rounded shadow w-full max-w-md">
                <FaSearch className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search books..."
                    className="outline-none w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">Cover</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Stock</th>
                            {/* <th className="p-3">Status</th> */}
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredBooks.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">
                                    No books found
                                </td>
                            </tr>
                        )}

                        {filteredBooks.map((book) => (
                            <tr key={book.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    <img
                                        src={book.img}
                                        alt={book.title}
                                        className="w-10 h-10 rounded"
                                    />
                                </td>
                                <td className="p-3 font-medium">{book.title}</td>
                                <td className="p-3">{book.author}</td>
                                <td className="p-3">{book.category}</td>
                                <td className="p-3">₹ {book.price}</td>
                                <td className="p-3">
                                    {book.stock > 0 ? book.stock : "Out of stock"}
                                </td>

                                <td className="p-3 flex gap-3">
                                    <button
                                        onClick={() => handleEdit(book)} className="text-blue-600 hover:text-blue-800">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => deleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="flex justify-center gap-8 ">
                <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                >
                    Preview
                </button>

                <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"

                    disabled={books.length < limit}
                    onClick={() => setPage(p => p + 1)}
                >
                    Next
                </button>



            </div>

            <AddBooks
                isOpen={addopen}
                onClose={() => setAddopen(false)}
            />


            <BookEditModal
                isOpen={open}
                onClose={() => setOpen(false)}
                book={selectedBook}
                onSave={handleSave}
            />
        </div>
    )
}

export default AdminBooks

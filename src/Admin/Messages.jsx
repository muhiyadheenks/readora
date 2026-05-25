// admin/pages/Messages.jsx
import { useEffect, useState } from "react";
import api from "../API/Axios";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/messages')
            .then(res => setMessages(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6 text-black">
            <h1 className="text-2xl font-bold">Messages</h1>

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : messages.length === 0 ? (
                <p className="text-gray-400">No messages yet</p>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-white p-5 rounded-xl shadow space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-800">{msg.name}</span>
                                <span className="text-gray-400 text-sm">
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-blue-500">{msg.email}</p>
                            <p className="text-gray-700">{msg.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Messages;
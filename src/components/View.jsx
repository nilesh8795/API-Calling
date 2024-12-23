import React, { useEffect, useState } from "react";

export default function CrudApp() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        try {
            const url = "http://localhost:3000/user";
            const response = await fetch(url);
            const res = await response.json();
            setData(res);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId
            ? `http://localhost:3000/user/${editingId}`
            : "http://localhost:3000/user";

        try {
            const response = await fetch(url, {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({ name: "", email: "", password: "" });
                setEditingId(null);
                fetchData();
            } else {
                console.error("Error saving data");
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({ name: item.name, email: item.email, password: item.password });
    };

    const handleDelete = async (id) => {
        try {
            const url = `http://localhost:3000/user/${id}`;
            const response = await fetch(url, { method: "DELETE" });

            if (response.ok) fetchData();
            else console.error("Error deleting item");
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">CRUD Application</h1>

            {/* Form for Create/Update */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {editingId ? "Update" : "Create"}
                </button>
            </form>

            {/* Table for Read/Update/Delete */}
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">S.No</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Password</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="bg-white border-b">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.password}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

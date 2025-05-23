import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/itemsSlice";
import { useNavigate } from "react-router-dom";

const AddItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const base64Images = await Promise.all(
      form.images.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    dispatch(
      addItem({
        name: form.name,
        description: form.description,
        images: base64Images,
        price: form.price,
      })
    );
    navigate("/items");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/items")}
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 cursor-pointer"
        >
          View Items
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center cursor-pointer">Add New Item</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="w-full text-sm text-gray-500 cursor-pointer"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItems;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editItem } from "../redux/itemsSlice";

const EditItem = () => {
  const { id } = useParams();
  const index = parseInt(id);
  const item = useSelector((state) => state.items.list[index]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    existingImages: [],
    newImages: [],
  });

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        description: item.description,
        price: item.price,
        existingImages: item.images || [],
        newImages: [],
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
    }));
  };

  const handleRemoveExistingImage = (i) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, index) => index !== i),
    }));
  };

  const handleRemoveNewImage = (i) => {
    setForm((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, index) => index !== i),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBase64Images = await Promise.all(
      form.newImages.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    const updatedItem = {
      name: form.name,
      description: form.description,
      price: form.price,
      images: [...form.existingImages, ...newBase64Images],
    };

    dispatch(editItem({ index, updatedItem }));
    navigate("/items");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Edit Item</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Existing Images</label>
          <div className="flex flex-wrap gap-4">
            {form.existingImages.map((img, i) => (
              <div key={i} className="text-center">
                <img src={img} alt="" className="w-24 h-24 object-cover mb-2 rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(i)}
                  className="text-red-600 hover:underline text-sm cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Add New Images</label>
          <input type="file" multiple onChange={handleFileChange} className="mb-2 border-2 rounded border-gray-400 py-1 px-2 focus:none" />
          <div className="flex flex-wrap gap-4">
            {form.newImages.map((img, i) => (
              <div key={i} className="text-center">
                <p className="text-sm text-gray-600">{img.name}</p>
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(i)}
                  className="text-red-600 hover:underline text-sm cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Item
          </button>
          <button
            type="button"
            onClick={() => navigate("/items")}
            className="bg-gray-400 cursor-pointer hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;

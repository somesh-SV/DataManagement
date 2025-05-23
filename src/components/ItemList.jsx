import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../redux/itemsSlice";

const ItemsList = () => {
  const items = useSelector((state) => state.items.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Items</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 cursor-pointer"
        >
          Add Item
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded p-4 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="mt-2 font-medium text-green-600">Price: {item.price}</p>
            <div className="flex mt-3 space-x-2 overflow-x-auto">
              {item.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => navigate(`/items/${index}`)}
                className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 cursor-pointer"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/edit/${index}`)}
                className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteItem(index))}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;

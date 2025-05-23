import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = useSelector((state) => state.items.list[parseInt(id)]);

  if (!item) {
    return <p className="text-center text-red-500 text-xl mt-10">Item not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <button
        onClick={() => navigate("/items")}
        className="mb-6 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-4 py-2 rounded shadow cursor-pointer"
      >
        Back
      </button>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
        <p className="mb-2">
          <span className="font-semibold">Description:</span> {item.description}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Price:</span> {item.price}
        </p>
        <div className="flex flex-wrap gap-4">
          {item.images &&
            item.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                className="max-w-xs rounded border w-32 h-32"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

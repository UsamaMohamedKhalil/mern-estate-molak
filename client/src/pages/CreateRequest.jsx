import  { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateRequest() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "Cairo",
    maxPrice: null,
    mintPrice: null,
    Area: null,
    furnished: false,
    parking: false,
    type: "rent",
    userRef: currentUser._id
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [id]: checked });
    } else if (type === "radio") {
        setFormData({ ...formData, type: value });
      } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/request/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      navigate(`/request/${data._id}`);

      setLoading(false);
      if (!data.success) {
        setError(data.message);
        return;
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Request</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          id="name"
          required
          onChange={handleChange}
          value={formData.name}
          className="border p-3 rounded-lg"
        />
        <select
          id="city"
          required
          onChange={handleChange}
          value={formData.city}
          className="border p-3 rounded-lg"
        >
          {["Cairo", "Alexandria", "Giza", "Shubra El-Kheima", "Port Said",
            "Suez", "El Mahalla El Kubra", "Luxor", "Mansoura", "Tanta",
            "Asyut", "Ismailia", "Fayyum", "Zagazig", "Damietta", "Aswan",
            "Minya", "Damanhur", "Beni Suef", "Hurghada", "Qena", "Sohag",
            "Shibin El Kom", "Banha", "Arish", "10th of Ramadan City"].map((city, index) => (
              <option key={index} value={city}>{city}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Maximum Price"
          id="maxPrice"
          required
          onChange={handleChange}
          value={formData.maxPrice}
          className="border p-3 rounded-lg"
        />
        <input
          type="number"
          placeholder="Minimum Price"
          id="mintPrice"
          required
          onChange={handleChange}
          value={formData.mintPrice}
          className="border p-3 rounded-lg"
        />
        <input
          type="number"
          placeholder="Area (m²)"
          id="Area"
          required
          onChange={handleChange}
          value={formData.Area}
          className="border p-3 rounded-lg"
        />
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="furnished"
            onChange={handleChange}
            checked={formData.furnished}
            className="w-5 h-5"
          />
          <label htmlFor="furnished">Furnished</label>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="parking"
            onChange={handleChange}
            checked={formData.parking}
            className="w-5 h-5"
          />
          <label htmlFor="parking">Parking spot</label>
        </div>
        <div className="flex gap-4">
  <div className="flex items-center gap-2">
    <input
      type="radio"
      id="rent"
      name="type"
      value="rent"
      onChange={handleChange}
      checked={formData.type === "rent"}
      className="w-5 h-5"
    />
    <label htmlFor="rent" className="text-sm">Rent</label>
  </div>
  <div className="flex items-center gap-2">
    <input
      type="radio"
      id="sale"
      name="type"
      value="sale"
      onChange={handleChange}
      checked={formData.type === "sale"}
      className="w-5 h-5"
    />
    <label htmlFor="sale" className="text-sm">Sale</label>
    </div>
    </div> 
        <button
          disabled={loading}
          className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </main>
  );
}

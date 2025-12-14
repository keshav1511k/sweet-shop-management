import { useEffect, useState } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [restockQty, setRestockQty] = useState({});

  // Search state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const isAdmin = user?.role === "ADMIN";

  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
  window.location.reload(); 
 };


  // Fetch all sweets
  const fetchSweets = async () => {
    try {
      const res = await api.get("/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Search sweets
  const handleSearch = async () => {
    try {
      const params = {};
      if (name) params.name = name;
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get("/api/sweets/search", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setSweets(res.data);
    } catch {
      alert("Search failed");
    }
  };

  // Purchase sweet
  const handlePurchase = async (id) => {
    try {
      await api.post(
        `/api/sweets/${id}/purchase`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSweets();
    } catch {
      alert("Out of stock");
    }
  };

  // Restock sweet (ADMIN)
  const handleRestock = async (id) => {
    try {
      const qty = Number(restockQty[id]);
      if (!qty || qty <= 0) {
        alert("Enter valid quantity");
        return;
      }

      await api.post(
        `/api/sweets/${id}/restock`,
        { quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchSweets();
      setRestockQty({ ...restockQty, [id]: "" });
    } catch {
      alert("Restock failed");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="search-box">
        <h2>Search Sweets</h2>

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchSweets}>Reset</button>
      </div>

      <h2>Available Sweets</h2>

      {sweets.length === 0 && <p>No sweets found</p>}

      {sweets.map((sweet) => (
        <div key={sweet.id} className="sweet-card">
          <h3>{sweet.name}</h3>
          <p>Category: {sweet.category}</p>
          <p>Price: ₹{sweet.price}</p>
          <p>Quantity: {sweet.quantity}</p>

          <button
            onClick={() => handlePurchase(sweet.id)}
            disabled={sweet.quantity === 0}
          >
            {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
          </button>

          {isAdmin && (
            <div style={{ marginTop: "8px" }}>
              <input
                type="number"
                placeholder="Restock qty"
                value={restockQty[sweet.id] || ""}
                onChange={(e) =>
                  setRestockQty({
                    ...restockQty,
                    [sweet.id]: e.target.value,
                  })
                }
              />
              <button onClick={() => handleRestock(sweet.id)}>Restock</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sweets;

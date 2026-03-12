import { useEffect, useState } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const defaultFilters = {
  name: "",
  category: "",
  minPrice: "",
  maxPrice: "",
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const decodeUser = (token) => {
  if (!token) {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

const getStockState = (quantity) => {
  if (quantity === 0) {
    return { label: "Sold out", tone: "is-empty" };
  }

  if (quantity <= 5) {
    return { label: "Low stock", tone: "is-low" };
  }

  if (quantity <= 12) {
    return { label: "Moving fast", tone: "is-medium" };
  }

  return { label: "Well stocked", tone: "is-full" };
};

const updateSweetList = (items, updatedSweet) =>
  items.map((sweet) => (sweet.id === updatedSweet.id ? updatedSweet : sweet));

function Sweets() {
  const [catalog, setCatalog] = useState([]);
  const [restockQty, setRestockQty] = useState({});
  const [filters, setFilters] = useState({ ...defaultFilters });
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = decodeUser(token);
  const isAdmin = user?.role === "ADMIN";
  const navigate = useNavigate();

  const visibleSweets = catalog.filter((sweet) => {
    const matchesName = sweet.name
      .toLowerCase()
      .includes(filters.name.trim().toLowerCase());
    const matchesCategory = filters.category
      ? sweet.category === filters.category
      : true;
    const matchesMinPrice = filters.minPrice
      ? Number(sweet.price) >= Number(filters.minPrice)
      : true;
    const matchesMaxPrice = filters.maxPrice
      ? Number(sweet.price) <= Number(filters.maxPrice)
      : true;

    return (
      matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice
    );
  });

  const categories = [...new Set(catalog.map((sweet) => sweet.category))]
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));

  const totalStock = visibleSweets.reduce(
    (sum, sweet) => sum + Number(sweet.quantity),
    0
  );

  const inventoryValue = visibleSweets.reduce(
    (sum, sweet) => sum + Number(sweet.price) * Number(sweet.quantity),
    0
  );

  const lowStockCount = visibleSweets.filter(
    (sweet) => sweet.quantity > 0 && sweet.quantity <= 5
  ).length;

  const soldOutCount = visibleSweets.filter(
    (sweet) => sweet.quantity === 0
  ).length;

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const featuredSweet = catalog.reduce((bestSweet, currentSweet) => {
    if (!bestSweet) {
      return currentSweet;
    }

    if (currentSweet.quantity > bestSweet.quantity) {
      return currentSweet;
    }

    if (
      currentSweet.quantity === bestSweet.quantity &&
      currentSweet.price > bestSweet.price
    ) {
      return currentSweet;
    }

    return bestSweet;
  }, null);

  const handleAuthFailure = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authchange"));
    navigate("/login", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authchange"));
    navigate("/login", { replace: true });
  };

  const refreshInventory = () => {
    setRefreshCount((current) => current + 1);
  };

  const handleFilterChange = (field) => (event) => {
    const { value } = event.target;
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({ ...defaultFilters });
  };

  const handlePurchase = async (sweet) => {
    try {
      const res = await api.post(
        `/api/sweets/${sweet.id}/purchase`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCatalog((current) => updateSweetList(current, res.data));
      setFeedback({
        type: "success",
        message: `${sweet.name} was purchased successfully.`,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthFailure();
        return;
      }

      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          `${sweet.name} is currently unavailable.`,
      });
    }
  };

  const handleRestock = async (sweet) => {
    const quantity = Number(restockQty[sweet.id]);

    if (!quantity || quantity <= 0) {
      setFeedback({
        type: "error",
        message: "Enter a valid restock quantity before submitting.",
      });
      return;
    }

    try {
      const res = await api.post(
        `/api/sweets/${sweet.id}/restock`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCatalog((current) => updateSweetList(current, res.data));
      setRestockQty((current) => ({ ...current, [sweet.id]: "" }));
      setFeedback({
        type: "success",
        message: `${sweet.name} was restocked by ${quantity} units.`,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthFailure();
        return;
      }

      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Restock failed.",
      });
    }
  };

  useEffect(() => {
    let isActive = true;

    const fetchInventory = async () => {
      setIsLoading(true);

      try {
        const res = await api.get("/api/sweets", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!isActive) {
          return;
        }

        setCatalog(res.data);
        setFeedback(null);
      } catch (error) {
        if (!isActive) {
          return;
        }

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("authchange"));
          navigate("/login", { replace: true });
          return;
        }

        setFeedback({
          type: "error",
          message: "We could not load the sweet inventory right now.",
        });
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchInventory();

    return () => {
      isActive = false;
    };
  }, [navigate, refreshCount, token]);

  return (
    <section className="dashboard-page">
      <div className="glass-panel dashboard-hero">
        <div className="dashboard-copy">
          <span className="section-tag">
            {isAdmin ? "Administrator Mode" : "Storefront View"}
          </span>
          <h2>Keep every shelf polished and purchase-ready.</h2>
          <p>
            Browse the full collection, filter by price or category, and stay
            ahead of demand before your best sellers disappear.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={refreshInventory}
            >
              Refresh inventory
            </button>
            <button className="ghost-button" type="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>

        <div className="hero-spotlight">
          <span className="spotlight-label">Spotlight collection</span>
          {featuredSweet ? (
            <>
              <h3>{featuredSweet.name}</h3>
              <p>
                {featuredSweet.category} collection with{" "}
                {featuredSweet.quantity} units ready to go.
              </p>
              <div className="spotlight-meta">
                <span>{currencyFormatter.format(featuredSweet.price)}</span>
                <span>{isAdmin ? "Restock tools enabled" : "Purchasing enabled"}</span>
              </div>
            </>
          ) : (
            <>
              <h3>Fresh display loading</h3>
              <p>Once inventory is available, your featured sweet appears here.</p>
            </>
          )}
        </div>
      </div>

      <div className="stats-grid">
        <article className="glass-panel stat-card">
          <span>Visible sweets</span>
          <strong>{visibleSweets.length}</strong>
          <p>Filtered catalog items ready for browsing.</p>
        </article>

        <article className="glass-panel stat-card">
          <span>Total stock</span>
          <strong>{totalStock}</strong>
          <p>Units currently available across the visible selection.</p>
        </article>

        <article className="glass-panel stat-card">
          <span>Low stock alerts</span>
          <strong>{lowStockCount}</strong>
          <p>Items nearing a restock decision.</p>
        </article>

        <article className="glass-panel stat-card">
          <span>Inventory value</span>
          <strong>{currencyFormatter.format(inventoryValue)}</strong>
          <p>Estimated value of all visible sweet stock.</p>
        </article>
      </div>

      <div className="dashboard-grid">
        <section className="glass-panel filters-panel">
          <div className="panel-heading">
            <div>
              <span className="section-tag">Smart Filters</span>
              <h3>Find the right sweet faster</h3>
            </div>

            {activeFilterCount > 0 && (
              <button className="text-button" type="button" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>

          <p className="panel-copy">
            Results update instantly as you type, keeping discovery quick and
            visual.
          </p>

          <div className="filters-grid">
            <label className="field-group">
              <span>Name</span>
              <input
                type="text"
                placeholder="Search by sweet name"
                value={filters.name}
                onChange={handleFilterChange("name")}
              />
            </label>

            <label className="field-group">
              <span>Category</span>
              <select
                value={filters.category}
                onChange={handleFilterChange("category")}
              >
                <option value="">All collections</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="field-group">
              <span>Minimum price</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={filters.minPrice}
                onChange={handleFilterChange("minPrice")}
              />
            </label>

            <label className="field-group">
              <span>Maximum price</span>
              <input
                type="number"
                min="0"
                placeholder="1000"
                value={filters.maxPrice}
                onChange={handleFilterChange("maxPrice")}
              />
            </label>
          </div>
        </section>

        <aside className="glass-panel insights-panel">
          <span className="section-tag">Shop Pulse</span>
          <h3>{isAdmin ? "Ready for restocking decisions" : "Ready for shoppers"}</h3>
          <p>
            A cleaner dashboard makes it easier to spot pressure points and keep
            the customer-facing collection looking rich.
          </p>

          <div className="insight-list">
            <div className="insight-item">
              <span>Categories</span>
              <strong>{categories.length}</strong>
            </div>

            <div className="insight-item">
              <span>Sold out items</span>
              <strong>{soldOutCount}</strong>
            </div>

            <div className="insight-item">
              <span>Active filters</span>
              <strong>{activeFilterCount}</strong>
            </div>
          </div>
        </aside>
      </div>

      {feedback && (
        <div
          className={`glass-panel feedback-banner ${
            feedback.type === "error" ? "is-error" : "is-success"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <section className="inventory-section">
        <div className="inventory-heading">
          <div>
            <span className="section-tag">Inventory Gallery</span>
            <h3>Available sweets</h3>
            <p>
              {activeFilterCount > 0
                ? `Showing ${visibleSweets.length} matches from ${catalog.length} sweets.`
                : `Explore ${catalog.length} sweets across ${categories.length} categories.`}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="sweet-grid skeleton-grid">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={`skeleton-${index}`}
                className="glass-panel skeleton-card"
              />
            ))}
          </div>
        ) : visibleSweets.length === 0 ? (
          <div className="glass-panel empty-state">
            <h4>No sweets found</h4>
            <p>Try relaxing one of the filters to reveal more items.</p>
          </div>
        ) : (
          <div className="sweet-grid">
            {visibleSweets.map((sweet) => {
              const stockState = getStockState(sweet.quantity);
              const stockLevel = sweet.quantity
                ? Math.min(100, Math.max(18, sweet.quantity * 8))
                : 0;

              return (
                <article
                  key={sweet.id}
                  className={`glass-panel sweet-card ${stockState.tone}`}
                >
                  <div className="sweet-card-head">
                    <div>
                      <span className="sweet-category">{sweet.category}</span>
                      <h4>{sweet.name}</h4>
                    </div>

                    <span className={`stock-badge ${stockState.tone}`}>
                      {stockState.label}
                    </span>
                  </div>

                  <div className="sweet-price-row">
                    <strong>{currencyFormatter.format(sweet.price)}</strong>
                    <span>{sweet.quantity} units left</span>
                  </div>

                  <div className="stock-meter">
                    <span style={{ width: `${stockLevel}%` }} />
                  </div>

                  <div className="sweet-meta-row">
                    <span>
                      {sweet.quantity === 0
                        ? "Replenish soon"
                        : sweet.quantity <= 5
                          ? "Restock window open"
                          : "Shelf is healthy"}
                    </span>
                    <span>{sweet.category} signature line</span>
                  </div>

                  <div className="card-actions">
                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => handlePurchase(sweet)}
                      disabled={sweet.quantity === 0}
                    >
                      {sweet.quantity === 0 ? "Out of stock" : "Purchase"}
                    </button>
                  </div>

                  {isAdmin && (
                    <div className="restock-row">
                      <input
                        className="compact-input"
                        type="number"
                        min="1"
                        placeholder="Restock qty"
                        value={restockQty[sweet.id] || ""}
                        onChange={(event) =>
                          setRestockQty((current) => ({
                            ...current,
                            [sweet.id]: event.target.value,
                          }))
                        }
                      />
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={() => handleRestock(sweet)}
                      >
                        Restock
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
}

export default Sweets;

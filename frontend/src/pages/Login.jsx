import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const highlights = [
    { value: "Live", label: "Inventory pulse" },
    { value: "Fast", label: "Search and restock" },
    { value: "Premium", label: "Viewer experience" },
  ];

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("authchange"));
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="glass-panel auth-showcase">
        <div className="showcase-copy">
          <span className="section-tag">Luxury Storefront Flow</span>
          <h2>Make your sweet shop look as polished behind the scenes.</h2>
          <p>
            Inventory management, search, and stock updates now feel like a
            premium brand experience instead of a plain admin screen.
          </p>
        </div>

        <div className="metric-row">
          {highlights.map((item) => (
            <div key={item.label} className="metric-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="showcase-ribbon">
          <div className="ribbon-card">
            <span>Glassmorphism</span>
            <strong>Soft depth with modern layering</strong>
          </div>

          <div className="ribbon-card">
            <span>Responsive layout</span>
            <strong>Refined on desktop and mobile</strong>
          </div>
        </div>
      </div>

      <div className="glass-panel auth-card">
        <span className="section-tag">Secure Access</span>
        <h2>Welcome back</h2>
        <p>
          Sign in to monitor inventory, keep the catalog irresistible, and stay
          ahead of low-stock moments.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label className="field-group">
            <span>Email address</span>
            <input
              type="email"
              placeholder="manager@sweetshop.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="field-group">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <p className={`form-message ${error ? "is-error" : ""}`}>
            {error || "Use your staff credentials to enter the dashboard."}
          </p>

          <button
            className="primary-button full-width"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Enter dashboard"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;

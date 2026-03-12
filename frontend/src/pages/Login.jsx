import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const highlights = [
    { value: "Customer", label: "Account access" },
    { value: "Fast", label: "Sign in flow" },
    { value: "Live", label: "Inventory visibility" },
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
          <span className="section-tag">Customer And Staff Access</span>
          <h2>Sign in and continue your sweet shop journey.</h2>
          <p>
            Customers can browse and purchase sweets, while staff can continue
            managing stock and keeping the catalog polished.
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
            <span>Customer logins</span>
            <strong>Now supported directly on the site</strong>
          </div>

          <div className="ribbon-card">
            <span>Responsive layout</span>
            <strong>Refined for desktop and mobile</strong>
          </div>
        </div>
      </div>

      <div className="glass-panel auth-card">
        <span className="section-tag">Secure Access</span>
        <h2>Welcome back</h2>
        <p>
          Sign in as a customer or staff member to browse sweets, purchase
          items, or manage inventory.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label className="field-group">
            <span>Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
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
            {error ||
              "Use your customer or staff credentials to enter the dashboard."}
          </p>

          <button
            className="primary-button full-width"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Enter dashboard"}
          </button>
        </form>

        <p className="auth-switch">
          New customer? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

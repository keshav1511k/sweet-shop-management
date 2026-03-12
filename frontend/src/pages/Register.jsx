import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const benefits = [
    { value: "Browse", label: "Discover sweets" },
    { value: "Buy", label: "Purchase quickly" },
    { value: "Track", label: "See live stock" },
  ];

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/api/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      const loginResponse = await api.post("/api/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      localStorage.setItem("token", loginResponse.data.token);
      window.dispatchEvent(new Event("authchange"));
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "We could not create your account right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="glass-panel auth-showcase">
        <div className="showcase-copy">
          <span className="section-tag">Customer Access</span>
          <h2>Create your sweet shop account in a minute.</h2>
          <p>
            Customers can now sign up directly from the website, log in
            securely, and move straight into browsing and purchasing sweets.
          </p>
        </div>

        <div className="metric-row">
          {benefits.map((item) => (
            <div key={item.label} className="metric-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="showcase-ribbon">
          <div className="ribbon-card">
            <span>Customer sign-up</span>
            <strong>Self-serve account creation</strong>
          </div>

          <div className="ribbon-card">
            <span>Instant access</span>
            <strong>Auto login after registration</strong>
          </div>
        </div>
      </div>

      <div className="glass-panel auth-card">
        <span className="section-tag">Join The Store</span>
        <h2>Create account</h2>
        <p>
          Register as a customer to explore the catalog, monitor stock, and
          purchase sweets from your dashboard.
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <label className="field-group">
            <span>Full name</span>
            <input
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange("name")}
              autoComplete="name"
              required
            />
          </label>

          <label className="field-group">
            <span>Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              autoComplete="email"
              required
            />
          </label>

          <label className="field-group">
            <span>Password</span>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange("password")}
              autoComplete="new-password"
              required
            />
          </label>

          <label className="field-group">
            <span>Confirm password</span>
            <input
              type="password"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              autoComplete="new-password"
              required
            />
          </label>

          <p className={`form-message ${error ? "is-error" : ""}`}>
            {error || "Your account will be created as a customer profile."}
          </p>

          <button
            className="primary-button full-width"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create customer account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;

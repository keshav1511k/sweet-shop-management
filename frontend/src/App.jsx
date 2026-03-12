import { NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="app-shell">
      <div className="app-orb orb-one" />
      <div className="app-orb orb-two" />
      <div className="app-orb orb-three" />

      <main className="app-content">
        <header className="glass-panel brand-bar">
          <div className="brand-copy">
            <span className="section-tag">Confection Command Center</span>
            <div>
              <h1>Sweet Shop Management</h1>
              <p>
                Premium storefront operations, glassmorphism visuals, and a
                warmer first impression for every viewer.
              </p>
            </div>
          </div>

          <nav className="brand-nav" aria-label="Primary">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                `route-chip ${isActive ? "is-active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `route-chip ${isActive ? "is-active" : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `route-chip ${isActive ? "is-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </header>

        <section className="app-intro">
          <p>
            A polished inventory experience for premium sweet collections,
            faster storefront decisions, and shelves that always look curated.
          </p>
        </section>

        <AppRoutes />
      </main>
    </div>
  );
}

export default App;

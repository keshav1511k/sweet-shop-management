import { Link } from "react-router-dom";

const heroImage =
  "https://images.unsplash.com/photo-1760263217152-009971f0bccc?auto=format&fit=crop&w=1600&q=80";

const showcaseCards = [
  {
    title: "Customer accounts",
    copy: "Visitors can now register from the site, sign in securely, and start shopping without manual setup.",
  },
  {
    title: "Browse with confidence",
    copy: "Customers see live stock and pricing, while the clean layout keeps the catalog easy to explore.",
  },
  {
    title: "Staff and customer ready",
    copy: "One polished experience supports both shoppers and store operators with the right tools.",
  },
];

const galleryCards = [
  {
    title: "Golden market energy",
    copy: "Fresh imarti textures bring warmth and movement to the brand presentation.",
    image:
      "https://images.unsplash.com/photo-1760263217152-009971f0bccc?auto=format&fit=crop&w=1200&q=80",
    sourceLabel: "Photo by Zoshua Colah on Unsplash",
    sourceHref:
      "https://unsplash.com/photos/stack-of-golden-fried-sweet-rings-at-a-market-stall-KKnpil90IBw",
  },
  {
    title: "Premium gifting mood",
    copy: "Kaju katli photography adds a refined festive touch that fits the upgraded visual style.",
    image:
      "https://images.unsplash.com/photo-1667185487656-91aee4306658?auto=format&fit=crop&w=1200&q=80",
    sourceLabel: "Photo by VD Photography on Unsplash",
    sourceHref:
      "https://unsplash.com/photos/a-plate-of-food-ZInghxWSBHc",
  },
];

function Landing({ isLoggedIn }) {
  return (
    <section className="landing-page">
      <div className="glass-panel landing-hero">
        <div className="landing-copy">
          <span className="section-tag">Sweet Shop Experience</span>
          <h2>Discover, sign up, and shop sweets through a warmer digital storefront.</h2>
          <p>
            The home page now welcomes real customers, invites them to create an
            account, and leads them into a polished login and shopping flow.
          </p>

          <div className="landing-actions">
            {isLoggedIn ? (
              <Link className="primary-button" to="/dashboard">
                Open dashboard
              </Link>
            ) : (
              <>
                <Link className="primary-button" to="/register">
                  Create customer account
                </Link>
                <Link className="ghost-button landing-anchor" to="/login">
                  Log in
                </Link>
              </>
            )}
          </div>

          <div className="landing-metrics">
            <div className="metric-card">
              <span>Customer access</span>
              <strong>Live</strong>
            </div>
            <div className="metric-card">
              <span>Purchasing</span>
              <strong>Ready</strong>
            </div>
            <div className="metric-card">
              <span>Store flow</span>
              <strong>Smooth</strong>
            </div>
          </div>
        </div>

        <figure className="landing-visual">
          <img
            src={heroImage}
            alt="Golden Indian sweets stacked at a market stall"
          />
          <figcaption className="landing-overlay-card">
            <span>Curated Sweet Photography</span>
            <strong>Warm, festive, and immediately eye-catching.</strong>
          </figcaption>
        </figure>
      </div>

      <div className="landing-showcase-grid">
        {showcaseCards.map((card) => (
          <article key={card.title} className="glass-panel landing-showcase-card">
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>

      <section id="landing-gallery" className="landing-gallery-section">
        <div className="inventory-heading">
          <div>
            <span className="section-tag">Customer Features</span>
            <h3>A better home page for shoppers and returning users</h3>
            <p>
              The site now feels customer-ready, with clear entry points for
              registration, login, and browsing.
            </p>
          </div>
        </div>

        <div className="landing-gallery-grid">
          {galleryCards.map((card) => (
            <article key={card.title} className="glass-panel gallery-card">
              <div className="gallery-image-wrap">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="gallery-copy">
                <h4>{card.title}</h4>
                <p>{card.copy}</p>
                <a
                  href={card.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="gallery-credit"
                >
                  {card.sourceLabel}
                </a>
              </div>
            </article>
          ))}

          <article className="glass-panel landing-access-card">
            <span className="section-tag">Customer Access</span>
            <h4>Register and log in directly from the site</h4>
            <p>
              New visitors no longer need a pre-created account. They can sign
              up as customers, log in securely, and start exploring the
              available sweets right away.
            </p>

            <div className="story-list">
              <div className="insight-item">
                <span>Registration</span>
                <strong>Customer sign-up page</strong>
              </div>
              <div className="insight-item">
                <span>Login</span>
                <strong>Customer and staff access</strong>
              </div>
              <div className="insight-item">
                <span>Dashboard</span>
                <strong>Browse and purchase sweets</strong>
              </div>
            </div>

            <div className="landing-actions">
              <Link className="primary-button" to={isLoggedIn ? "/dashboard" : "/register"}>
                {isLoggedIn ? "Go to dashboard" : "Create account"}
              </Link>
              {!isLoggedIn && (
                <Link className="ghost-button landing-anchor" to="/login">
                  Existing user login
                </Link>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="glass-panel landing-cta">
        <div>
          <span className="section-tag">Ready To Shop</span>
          <h3>Customers can now sign up, log in, and start exploring sweets.</h3>
        </div>
        <p>
          The homepage now leads naturally into account creation, login, and the
          shopping dashboard instead of showing developer-focused notes.
        </p>
        <div className="landing-actions">
          <Link className="primary-button" to={isLoggedIn ? "/dashboard" : "/register"}>
            {isLoggedIn ? "Go to dashboard" : "Start with registration"}
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Landing;

import { Link } from "react-router-dom";

const heroImage =
  "https://images.unsplash.com/photo-1760263217152-009971f0bccc?auto=format&fit=crop&w=1600&q=80";

const showcaseCards = [
  {
    title: "Editorial storefront feel",
    copy: "A warmer, more cinematic presentation makes the system feel premium from the first second.",
  },
  {
    title: "Inventory clarity",
    copy: "Fast filtering, status cues, and stock feedback reduce friction while browsing or restocking.",
  },
  {
    title: "Built for trust",
    copy: "Glass layers, strong hierarchy, and clean responsive spacing make the product feel more polished.",
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
          <span className="section-tag">Branded Landing Experience</span>
          <h2>Turn your mithai management system into a storefront people remember.</h2>
          <p>
            This refreshed landing layer gives the project a more premium first
            impression, sets the tone before login, and ties the full UI together
            with curated imagery and stronger storytelling.
          </p>

          <div className="landing-actions">
            <Link className="primary-button" to={isLoggedIn ? "/dashboard" : "/login"}>
              {isLoggedIn ? "Open dashboard" : "Log in now"}
            </Link>
            <a className="ghost-button landing-anchor" href="#landing-gallery">
              Preview the brand
            </a>
          </div>

          <div className="landing-metrics">
            <div className="metric-card">
              <span>Visual identity</span>
              <strong>Stronger</strong>
            </div>
            <div className="metric-card">
              <span>Experience</span>
              <strong>Responsive</strong>
            </div>
            <div className="metric-card">
              <span>Viewer impact</span>
              <strong>Premium</strong>
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
            <span className="section-tag">Curated Gallery</span>
            <h3>Photography that supports the premium look</h3>
            <p>
              The landing page now uses web photography to add appetite, depth,
              and a more memorable sense of brand.
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

          <article className="glass-panel landing-story-card">
            <span className="section-tag">What Changed</span>
            <h4>More than a visual skin</h4>
            <p>
              The app now has a complete public-facing entry point, richer
              storytelling, and a more trustworthy feel before the user even
              reaches the dashboard.
            </p>

            <div className="story-list">
              <div className="insight-item">
                <span>Home route</span>
                <strong>Public landing page</strong>
              </div>
              <div className="insight-item">
                <span>Media layer</span>
                <strong>Curated web imagery</strong>
              </div>
              <div className="insight-item">
                <span>Navigation</span>
                <strong>Clear brand shell</strong>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="glass-panel landing-cta">
        <div>
          <span className="section-tag">Ready To Use</span>
          <h3>Open the refreshed experience and share it with confidence.</h3>
        </div>
        <p>
          Visitors now land on a polished home page, then move naturally into a
          refined login and dashboard flow.
        </p>
        <div className="landing-actions">
          <Link className="primary-button" to={isLoggedIn ? "/dashboard" : "/login"}>
            {isLoggedIn ? "Go to dashboard" : "Start with login"}
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Landing;

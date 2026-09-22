import { useEffect, useState } from "react";
import { basicData, resumeData } from "./components/Data";
import "./App.scss";

const nav = ["about", "work", "experience", "skills", "vault", "contact"];
const heroChips = ["Python", "AWS", "Data", "GenAI"];
const vaultAttemptKey = "his-vault-attempts";
const vaultLockoutKey = "his-vault-locked-until";
const vaultLockoutDuration = 5 * 60 * 1000;

const linkFiles = import.meta.glob("/data/**/*.txt", {
  eager: true,
  query: "?raw",
  import: "default",
});
const downloadableFiles = import.meta.glob("/data/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function titleFromFile(filename) {
  return filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
}

export function buildVaultTopics(links = linkFiles, files = downloadableFiles) {
  const topics = new Map();
  const topicFor = (path) => {
    const parts = path.split("/");
    const topic = parts[2];
    if (!topic || parts.length < 4) return null;
    if (!topics.has(topic)) {
      topics.set(topic, { name: topic, links: [], files: [] });
    }
    return topics.get(topic);
  };

  Object.entries(links).forEach(([path, contents]) => {
    const topic = topicFor(path);
    if (!topic) return;
    String(contents)
      .split(/\r?\n/)
      .map((link) => link.trim())
      .filter((link) => /^https?:\/\//i.test(link))
      .forEach((url) => {
        try {
          topic.links.push({
            url,
            label: new URL(url).hostname.replace(/^www\./, ""),
          });
        } catch {
          // Ignore malformed URLs and keep rendering the remaining links.
        }
      });
  });

  Object.entries(files).forEach(([path, url]) => {
    if (/\.txt$/i.test(path)) return;
    const topic = topicFor(path);
    if (!topic) return;
    const filename = path.split("/").at(-1);
    topic.files.push({ name: titleFromFile(filename), filename, url });
  });

  return [...topics.values()]
    .filter((topic) => topic.links.length || topic.files.length)
    .sort((a, b) => a.name.localeCompare(b.name));
}

const vaultTopics = buildVaultTopics();

function ThemeButton({ dark, onClick }) {
  return (
    <button
      className="theme-button"
      onClick={onClick}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}

function HeroArtwork() {
  return (
    <div
      className="hero-art"
      aria-label="Abstract cloud and data architecture artwork"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="hero-glow" />
      <img src="/images/portfolio-hero.png" alt="" />
      {heroChips.map((chip, index) => (
        <div className="floating-chip" data-position={index + 1} key={chip}>
          {chip}
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <header className="section-heading reveal">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </header>
  );
}

function ProfileMenu() {
  const linkedIn = basicData.basic_info.social.find(
    (social) => social.name === "linkedin"
  );

  return (
    <div className="profile-menu">
      <a
        className="brand"
        href="#home"
        aria-label="Parvathirajan Natarajan, home and profile details"
        aria-describedby="profile-card"
      >
        <img src="/logo.png" alt="" />
      </a>
      <aside className="profile-card" id="profile-card">
        <img
          className="profile-card-image"
          src="/profile.png"
          alt="Illustrated portrait of Parvathirajan Natarajan"
        />
        <div className="profile-card-copy">
          <strong>Parvathirajan Natarajan</strong>
          <span>Manager · Technology leader</span>
          <p>Building cloud, data, and engineering experiences that matter.</p>
          <a href={linkedIn.url} target="_blank" rel="noreferrer">
            View LinkedIn profile ↗
          </a>
        </div>
      </aside>
    </div>
  );
}

function Vault() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem("his-vault") === "open"
  );
  const [promptOpen, setPromptOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(
    () => Number(sessionStorage.getItem(vaultAttemptKey)) || 0
  );
  const [lockedUntil, setLockedUntil] = useState(() => {
    const storedLockout = Number(sessionStorage.getItem(vaultLockoutKey));
    if (storedLockout > Date.now()) return storedLockout;
    sessionStorage.removeItem(vaultLockoutKey);
    return 0;
  });
  const [currentTime, setCurrentTime] = useState(Date.now);
  const isLocked = lockedUntil > currentTime;
  const remainingSeconds = Math.max(0, Math.ceil((lockedUntil - currentTime) / 1000));
  const remainingTime = `${Math.floor(remainingSeconds / 60)}:${String(
    remainingSeconds % 60
  ).padStart(2, "0")}`;

  useEffect(() => {
    if (!lockedUntil) return undefined;

    const updateLockout = () => {
      if (Date.now() >= lockedUntil) {
        sessionStorage.removeItem(vaultLockoutKey);
        sessionStorage.removeItem(vaultAttemptKey);
        setLockedUntil(0);
        setAttempts(0);
        setError("");
        return;
      }
      setCurrentTime(Date.now());
    };

    updateLockout();
    const timer = window.setInterval(updateLockout, 1000);
    return () => window.clearInterval(timer);
  }, [lockedUntil]);

  function unlock(event) {
    event.preventDefault();
    if (isLocked) return;
    if (passcode === "00444") {
      sessionStorage.setItem("his-vault", "open");
      sessionStorage.removeItem(vaultAttemptKey);
      sessionStorage.removeItem(vaultLockoutKey);
      setUnlocked(true);
      setAttempts(0);
      setLockedUntil(0);
      setError("");
      return;
    }

    const nextAttempts = attempts + 1;
    if (nextAttempts >= 3) {
      const nextLockout = Date.now() + vaultLockoutDuration;
      sessionStorage.removeItem(vaultAttemptKey);
      sessionStorage.setItem(vaultLockoutKey, String(nextLockout));
      setAttempts(0);
      setLockedUntil(nextLockout);
      setCurrentTime(Date.now());
      setError("Too many incorrect attempts. Try again in 5:00.");
    } else {
      sessionStorage.setItem(vaultAttemptKey, String(nextAttempts));
      setAttempts(nextAttempts);
      setError(
        `That passcode doesn't match. ${3 - nextAttempts} attempt${
          3 - nextAttempts === 1 ? "" : "s"
        } remaining.`
      );
    }
    setPasscode("");
  }

  return (
    <section className="vault section" id="vault">
      <SectionTitle
        eyebrow="Private collection"
        title="Parvathirajan's Vault."
        copy="A curated space for my notes, useful references, and downloadable resources. Read the guidance, then open the vault when you're ready."
      />
      {!unlocked && !promptOpen ? (
        <div className="vault-gateway">
          <div className="vault-door" aria-hidden="true">
            <div className="vault-rim">
              <div className="vault-handle">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="vault-instructions">
            <span>Before you enter</span>
            <h3>A personal archive, thoughtfully collected.</h3>
            <p>
              Each topic contains selected reading links and files you can
              download. Open the vault and enter the passcode to explore the
              collection.
            </p>
            <button type="button" onClick={() => setPromptOpen(true)}>
              Open the vault <b>→</b>
            </button>
          </div>
        </div>
      ) : !unlocked ? (
        <form className="vault-lock" onSubmit={unlock}>
          <div className="lock-symbol" aria-hidden="true">
            ⌁
          </div>
          <h3>Unlock the archive</h3>
          <p>
            {isLocked
              ? `Too many incorrect attempts. Try again in ${remainingTime}.`
              : "Enter the five-digit passcode to continue."}
          </p>
          <button
            className="vault-back"
            type="button"
            onClick={() => {
              setPromptOpen(false);
              setPasscode("");
              setError("");
            }}
          >
            ← Back to vault
          </button>
          <label htmlFor="vault-passcode">Passcode</label>
          <div className="passcode-row">
            <input
              id="vault-passcode"
              type="password"
              value={passcode}
              onChange={(event) =>
                setPasscode(event.target.value.replace(/\D/g, "").slice(0, 5))
              }
              disabled={isLocked}
              inputMode="numeric"
              autoComplete="off"
              placeholder="•••••"
              aria-describedby={error ? "vault-error" : undefined}
            />
            <button type="submit" disabled={isLocked}>
              Unlock <span>→</span>
            </button>
          </div>
          {error && (
            <p className="vault-error" id="vault-error" role="alert">
              {error}
            </p>
          )}
        </form>
      ) : (
        <div className="vault-content">
          <div className="vault-toolbar">
            <span>
              {vaultTopics.length}{" "}
              {vaultTopics.length === 1 ? "topic" : "topics"}
            </span>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("his-vault");
                setUnlocked(false);
                setPromptOpen(false);
                setPasscode("");
              }}
            >
              Lock vault
            </button>
          </div>
          {vaultTopics.length ? (
            <div className="vault-grid">
              {vaultTopics.map((topic, index) => (
                <article className="vault-topic" key={topic.name}>
                  <div className="topic-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>{topic.name}</h3>
                  {topic.links.length > 0 && (
                    <div className="vault-links">
                      {topic.links.map((link, linkIndex) => (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          key={`${link.url}-${linkIndex}`}
                        >
                          <span>Visit {link.label}</span>
                          <b>↗</b>
                        </a>
                      ))}
                    </div>
                  )}
                  {topic.files.length > 0 && (
                    <div className="vault-files">
                      {topic.files.map((file) => (
                        <a
                          href={file.url}
                          download={file.filename}
                          key={file.filename}
                        >
                          <span>
                            <small>Download</small>
                            {file.name}
                          </span>
                          <b>↓</b>
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="vault-empty">
              <span>Archive ready</span>
              <h3>Your first topic will appear here.</h3>
              <p>
                Add a folder inside <code>data/</code>, commit it to GitHub, and
                the next deployment will publish its files and links.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export function App() {
  const [dark, setDark] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [vaultVisible, setVaultVisible] = useState(false);
  const [scrollToVault, setScrollToVault] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    document.body.dataset.theme = dark ? "dark" : "light";
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("visible")
        ),
      { threshold: 0.12 }
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const updateBackToTopVisibility = () => {
      setShowBackToTop(window.scrollY > 320);
    };

    updateBackToTopVisibility();
    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateBackToTopVisibility);
  }, []);
  useEffect(() => {
    const updateActiveSection = () => {
      const visibleSections = ["home", ...nav].filter(
        (section) => section !== "vault" || vaultVisible
      );
      const currentSection = visibleSections.reduce((active, section) => {
        const element = document.getElementById(section);
        if (!element) return active;

        const { top, bottom } = element.getBoundingClientRect();
        return top <= 96 && bottom > 96 ? section : active;
      }, null);
      if (currentSection) setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [vaultVisible]);
  useEffect(() => {
    if (!scrollToVault || !vaultVisible) return;

    document
      .getElementById("vault")
      ?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    setScrollToVault(false);
  }, [scrollToVault, vaultVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (event, item) => {
    if (item !== "vault") return;

    event.preventDefault();
    setVaultVisible(true);
    setScrollToVault(true);
    setActiveSection("vault");
  };

  return (
    <>
      <nav className="topbar" aria-label="Primary navigation">
        <ProfileMenu />
        <div className="nav-links">
          {nav.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={activeSection === item ? "is-active" : undefined}
              aria-current={activeSection === item ? "location" : undefined}
              onClick={(event) => handleNavigation(event, item)}
            >
              {item}
            </a>
          ))}
        </div>
        <ThemeButton dark={dark} onClick={() => setDark((value) => !value)} />
      </nav>
      <main>
        <section className="hero" id="home">
          <div className="hero-copy reveal visible">
            <p className="eyebrow">Manager · Engineer · Developer</p>
            <h1>
              Ideas built
              <br />
              for <span>real impact.</span>
            </h1>
            <p className="hero-lead">
              I'm Parvathirajan Natarajan, a technology manager shaping cloud
              platforms, data products, and high-performing engineering teams.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work ↘
              </a>
              <a
                className="button secondary"
                href={basicData.basic_info.socialLink.myCV}
              >
                Download résumé
              </a>
            </div>
            <div className="hero-meta">
              <span>Based in India</span>
              <span>Working globally</span>
            </div>
          </div>
          <HeroArtwork />
        </section>
        <section className="statement" id="about">
          <p className="reveal">
            I connect <strong>technology</strong>, <strong>people</strong>, and{" "}
            <strong>purpose</strong> to turn complex systems into simple,
            dependable experiences.
          </p>
        </section>
        <section className="work section" id="work">
          <SectionTitle
            eyebrow="Selected work"
            title="Built with intention."
            copy="Tools and platforms designed to make complex data tasks feel remarkably simple."
          />
          <div className="project-grid">
            {resumeData.projects.map((project, index) => (
              <a
                className={`project-card reveal project-${index + 1}`}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                key={project.title}
              >
                <div className="project-copy">
                  <span>{project.startDate} · Python</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <b>View project ↗</b>
                </div>
                <div className="project-visual">
                  <img
                    src={`/${project.images[0]}`}
                    alt={`${project.title} preview`}
                  />
                </div>
              </a>
            ))}
          </div>
        </section>
        <section className="career section" id="experience">
          <SectionTitle eyebrow="Career" title="A decade of forward motion." />
          <div className="career-grid">
            <div className="career-intro reveal">
              <p>
                From hands-on engineering to technology leadership, I've stayed
                close to the craft while expanding the scale of my impact.
              </p>
              <div className="metric">
                <strong>9+</strong>
                <span>
                  years building
                  <br />
                  software
                </span>
              </div>
            </div>
            <div className="timeline">
              {resumeData.experience.map((role, index) => (
                <article
                  className="timeline-item reveal"
                  key={`${role.title}-${role.years}`}
                >
                  <div className="timeline-index">0{index + 1}</div>
                  <div>
                    <span>{role.years}</span>
                    <h3>{role.title}</h3>
                    <h4>{role.company}</h4>
                    <p>{role.description}</p>
                    {role.responsibilities?.length > 0 && (
                      <details className="responsibilities">
                        <summary>
                          <span>View responsibilities</span>
                          <span aria-hidden="true">+</span>
                        </summary>
                        <ul>
                          {role.responsibilities.map((responsibility) => (
                            <li key={responsibility}>{responsibility}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="capabilities section" id="skills">
          <SectionTitle
            eyebrow="Capabilities"
            title="Depth where it matters."
            copy="A practical toolkit for building, scaling, and leading modern technology."
          />
          <div className="capability-grid">
            {resumeData.expertise.icons.map((item, index) => (
              <article className="capability-card reveal" key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="skill-cloud reveal">
            {basicData.skills.icons.map((skill) => (
              <span key={skill.name}>{skill.name}</span>
            ))}
          </div>
        </section>
        <section className="education section">
          <SectionTitle eyebrow="Foundation" title="Always learning." />
          <div className="education-grid">
            {resumeData.education.map((item) => (
              <article className="education-card reveal" key={item.title}>
                <span>{item.years}</span>
                <h3>{item.title}</h3>
                <p>{item.company}</p>
                <div>{item.mainTech.join(" · ")}</div>
              </article>
            ))}
          </div>
        </section>
        {vaultVisible && <Vault />}
        <section className="contact section" id="contact">
          <div className="contact-card reveal">
            <span>Let's build what's next.</span>
            <h2>
              Good ideas deserve
              <br />
              great execution.
            </h2>
            <p>
              Explore my work, connect with me, or start a conversation about
              technology and leadership.
            </p>
            <div className="socials">
              {basicData.basic_info.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.name} ↗
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <button
        className={`back-to-top-mobile${showBackToTop ? " is-visible" : ""}`}
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <span aria-hidden="true">↑</span>
        Top
      </button>
      <footer>
        <span className="footer-rights">
          © {new Date().getFullYear()} Parvathirajan Natarajan · All rights
          belong to me 😉
        </span>
        <a className="back-to-top-footer" href="#home">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}

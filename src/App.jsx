import { useEffect, useState } from "react";
import { basicData, resumeData } from "./components/Data";
import "./App.scss";

const nav = ["about", "work", "experience", "skills", "vault", "contact"];
const heroChips = ["Python", "AWS", "Data", "GenAI"];

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

function Vault() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem("his-vault") === "open"
  );
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  function unlock(event) {
    event.preventDefault();
    if (passcode === "00444") {
      sessionStorage.setItem("his-vault", "open");
      setUnlocked(true);
      setError("");
      return;
    }
    setError("That passcode doesn't match. Try again.");
    setPasscode("");
  }

  return (
    <section className="vault section" id="vault">
      <SectionTitle
        eyebrow="Private collection"
        title="His Vault."
        copy="Notes, useful references, and files from my personal knowledge archive."
      />
      {!unlocked ? (
        <form className="vault-lock" onSubmit={unlock}>
          <div className="lock-symbol" aria-hidden="true">
            ⌁
          </div>
          <h3>Unlock the archive</h3>
          <p>Enter the five-digit passcode to continue.</p>
          <label htmlFor="vault-passcode">Passcode</label>
          <div className="passcode-row">
            <input
              id="vault-passcode"
              value={passcode}
              onChange={(event) =>
                setPasscode(event.target.value.replace(/\D/g, "").slice(0, 5))
              }
              inputMode="numeric"
              autoComplete="off"
              placeholder="•••••"
              aria-describedby={error ? "vault-error" : undefined}
            />
            <button type="submit">
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

  return (
    <>
      <nav className="topbar" aria-label="Primary navigation">
        <a
          className="brand"
          href="#home"
          aria-label="Parvathirajan Natarajan, home"
        >
          PN
        </a>
        <div className="nav-links">
          {nav.map((item) => (
            <a key={item} href={`#${item}`}>
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
              Ideas engineered
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
                From hands-on engineering to technology leadership, I’ve stayed
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
        <Vault />
        <section className="contact section" id="contact">
          <div className="contact-card reveal">
            <span>Let’s build what’s next.</span>
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
      <footer>
        <span>© {new Date().getFullYear()} Parvathirajan Natarajan</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}

import { useEffect, useState } from "react";
import { basicData, resumeData } from "./components/Data";
import "./App.scss";

const nav = ["about", "work", "experience", "skills", "contact"];

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
      <div className="floating-chip chip-python">Python</div>
      <div className="floating-chip chip-aws">AWS</div>
      <div className="floating-chip chip-data">Data</div>
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
            <p className="eyebrow">Manager · Engineer · Builder</p>
            <h1>
              Ideas engineered
              <br />
              for <span>real impact.</span>
            </h1>
            <p className="hero-lead">
              I’m Parvathirajan Natarajan, a technology manager shaping cloud
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

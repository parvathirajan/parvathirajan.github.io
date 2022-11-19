import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";
import { resumeData, sectionNames } from "./Data";
import { Education } from "./Education";

export const Experience = () => {
  var work = resumeData.experience.map(function (work, i) {
    var mainTech = work.mainTech.map((technology, i) => {
      return (
        <Badge pill className="main-badge mr-2 mb-2" key={i}>
          {technology}
        </Badge>
      );
    });
    var tech = work.technologies.map((technology, i) => {
      return (
        <Badge pill className="experience-badge mr-2 mb-2" key={i}>
          {technology}
        </Badge>
      );
    });
    var responsibilities = work.responsibilities.map((responsibility, i) => {
      return <li>{responsibility}</li>;
    });
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={work.years}
        iconStyle={{
          background: "#994FAE",
          color: "#FFF",
          textAlign: "center",
        }}
        icon={<i className="fas fa-briefcase experience-icon"></i>}
        key={i}
      >
        <div style={{ textAlign: "left", marginBottom: "4px" }}>{mainTech}</div>

        <h3
          className="vertical-timeline-element-title"
          style={{ textAlign: "left" }}
        >
          {work.title}
        </h3>
        <h4
          className="vertical-timeline-element-subtitle"
          style={{ textAlign: "left" }}
        >
          {work.company}
        </h4>
        <p
          className="vertical-timeline-element-subtitle"
          style={{ textAlign: "left", fontSize: "120%" }}
        >
          {work.description}
        </p>
        <br />
        <b>Responsibilities:</b>
        <ul
          className="vertical-timeline-element-subtitle"
          style={{ textAlign: "left", fontSize: "120%" }}
        >
          {responsibilities}
        </ul>
        <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
      </VerticalTimelineElement>
    );
  });

  return (
    <section id="resume-experience" className="pb-5">
      <div className="col-md-12 mx-auto">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span className="text-black" style={{ textAlign: "center" }}>
              {sectionNames.experienceAndEducation}
            </span>
          </h1>
        </div>
      </div>
      <div style={{ overflow: "hidden", maxWidth: "100vw" }}>
        <div className="col-md-8 mx-auto">
          <VerticalTimeline>{work}</VerticalTimeline>
        </div>
      </div>
      <Education />
    </section>
  );
};

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";
import { resumeData } from "./Data";

export const Education = () => {
  var work = resumeData.education.map(function (work, i) {
    const technologies = work.technologies;
    const mainTechnologies = work.mainTech;

    var mainTech = mainTechnologies.map((technology, i) => {
      return (
        <Badge pill className="main-badge mr-2 mb-2" key={i}>
          {technology}
        </Badge>
      );
    });
    var tech = technologies.map((technology, i) => {
      return (
        <Badge pill className="experience-badge mr-2 mb-2" key={i}>
          {technology}
        </Badge>
      );
    });
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={work.years}
        iconStyle={{
          background: "#4FAEA9",
          color: "#FFF",
          textAlign: "center",
        }}
        icon={<i className="fas fa-graduation-cap experience-icon"></i>}
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
        <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
      </VerticalTimelineElement>
    );
  });

  return (
    <section id="resume-education" className="pb-4">
      <div style={{ overflow: "hidden", maxWidth: "100vw" }}>
        <div className="col-md-8 mx-auto">
          <VerticalTimeline>
            {work}
            <VerticalTimelineElement
              iconStyle={{
                background: "#AE944F",
                color: "#fff",
                textAlign: "center",
              }}
              icon={
                <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
              }
            />
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

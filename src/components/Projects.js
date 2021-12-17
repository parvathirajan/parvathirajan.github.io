import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { resumeData, sectionNames } from "./Data";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };
  }

  render() {
    const resumeProjects = resumeData.projects;
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });
    var projects = resumeProjects.map(function (projects) {
      return (
        <div
          className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center"
          key={projects.title}
          style={{ cursor: "pointer" }}
        >
          <span className="portfolio-item">
            <div className="foto" onClick={() => detailsModalShow(projects)}>
              <div>
                <img
                  src={projects.images[0]}
                  alt="projectImages"
                  style={{
                    marginBottom: 0,
                    paddingBottom: 0,
                    position: "relative",
                  }}
                />
                <span className="project-date">{projects.startDate}</span>
                <br />
                <p className="project-title-settings mt-3">{projects.title}</p>
              </div>
            </div>
          </span>
        </div>
      );
    });

    return (
      <section id="resume-portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionNames.projects}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;

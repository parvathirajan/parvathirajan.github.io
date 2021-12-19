import { Component } from "react";
import { Icon } from "@iconify/react";
import pythonIcon from "@iconify/icons-logos/python";
import awsIcon from "@iconify/icons-logos/aws";
import { basicData, resumeData, sectionNames } from "./Data";
import SimpleImageSlider from "react-simple-image-slider";

class About extends Component {
  render() {
    var profile_images = basicData.basic_info.images;
    var resumeBasicInfo = resumeData.basic_info;

    return (
      <section id="resume-about">
        <div className="col-md-12">
          <h1 style={{ color: "black" }}>
            <span>{sectionNames.about}</span>
          </h1>
          <div className="row center mx-auto mb-5">
            <div className="col-md-4 mb-5 center">
              <div className="polaroid">
                <span style={{ cursor: "auto" }}>
                  <SimpleImageSlider
                    width={200}
                    height={"260px"}
                    images={profile_images}
                    showBullets={true}
                    showNavs={true}
                    navMargin={-10}
                    autoPlay={true}
                  />
                  <Icon
                    icon={pythonIcon}
                    style={{ fontSize: "20px", margin: "9% 5% 0 5%" }}
                  />
                  <Icon
                    icon={awsIcon}
                    style={{ fontSize: "20px", margin: "9% 5% 0 5%" }}
                  />
                </span>
              </div>
            </div>

            <div className="col-md-8 center">
              <div className="col-md-10">
                <div className="card">
                  <div className="card-header">
                    <span
                      className="iconify"
                      data-icon="emojione:red-circle"
                      data-inline="false"
                    ></span>{" "}
                    &nbsp;{" "}
                    <span
                      className="iconify"
                      data-icon="twemoji:yellow-circle"
                      data-inline="false"
                    ></span>{" "}
                    &nbsp;{" "}
                    <span
                      className="iconify"
                      data-icon="twemoji:green-circle"
                      data-inline="false"
                    ></span>
                  </div>
                  <div
                    className="card-body font-trebuchet text-justify ml-3 mr-3"
                    style={{
                      height: "auto",
                      fontSize: "120%",
                      lineHeight: "200%",
                    }}
                  >
                    <br />
                    <span className="wave">{resumeBasicInfo.salutation}</span>
                    <br />
                    <br />
                    {resumeBasicInfo.description}
                    <br />
                    <br />
                    {resumeBasicInfo.philosophy}
                    <br />
                    <br />
                    {resumeBasicInfo.preference}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;

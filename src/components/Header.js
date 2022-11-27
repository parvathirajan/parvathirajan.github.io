import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";
import { basicData } from "./Data";
import "../css/menu.css";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    const basic_info = basicData.basic_info;
    var name = basic_info.name;
    this.titles = basic_info.titles.map((x) => [x.toUpperCase(), 1500]).flat();

    const HeaderTitleTypeAnimation = React.memo(
      () => {
        return (
          <Typical className="title-styles" steps={this.titles} loop={50} />
        );
      },
      (_props, _prevProp) => true
    );

    const resumeImg = "images/resume.png";

    return (
      <header
        id="home"
        style={{ height: window.innerHeight, display: "block" }}
      >
        <div id="container">
          <div>
            <menu className="menu">
              <ul style={{ listStyleType: "none" }}>
                <li className="menu-li">
                  <button className="menu-button">
                    <span className="menu-button-span">
                      <img
                        height="35px"
                        src={resumeImg}
                        alt="Avatar placeholder"
                        style={{ marginTop: "-7px", marginLeft: "7px" }}
                      />
                    </span>
                    <span className="menu-button-span">
                      <a
                        style={{ textDecoration: "none", color: "black" }}
                        href={basicData.basic_info.socialLink.myCV}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`fa fa-download`} aria-hidden="true"></i>
                        {"  "}
                        Get CV
                      </a>
                    </span>
                  </button>
                </li>
              </ul>
            </menu>
          </div>
        </div>
        <div id="switch-container">
          <div style={{ marginTop: "6px", marginRight: "20px" }}>
            <Switch
              checked={this.state.checked}
              onChange={this.onThemeSwitchChange}
              offColor="#808080"
              onColor="#848db8"
              className="react-switch mx-auto"
              width={70}
              height={30}
              uncheckedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:waxing-crescent-moon"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "15px",
                    color: "#353239",
                  }}
                ></span>
              }
              checkedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:sun-with-face"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "10px",
                    color: "#353239",
                  }}
                ></span>
              }
              id="icon-switch"
            />
          </div>
        </div>
        <div className="row aligner" style={{ height: "90%" }}>
          <div className="col-md-12">
            <div>
              <span
                className="iconify header-icon"
                data-icon="la:laptop-code"
                data-inline="false"
              ></span>
              <br />
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

import React, { Component } from "react";
import "../css/style.css";
import { basicData } from "./Data";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = { open: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const linksArray = [
      { name: "About", url: "#resume-about" },
      { name: "Skills", url: "#skills" },
      { name: "Resume", url: "#resume" },
      {
        name: "Download CV",
        url: basicData.basic_info.socialLink.myCV,
      },
    ];

    return (
      <div>
        <div
          className={
            this.state.open ? "menu-wrapper menu-open" : "menu-wrapper-2"
          }
        >
          <div
            className={
              this.state.open
                ? "links-wrapper"
                : "links-wrapper links-wrapper-closed"
            }
          >
            {" "}
            <ul className="link-list">
              {linksArray.map((link) => (
                <li className="link">
                  <a href={link.url} rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className={
            this.state.open ? "menu-toggle close-button" : "menu-toggle "
          }
          onClick={this.toggleMenu}
        >
          {" "}
          <i className="fa fa-plus"></i>
        </button>
      </div>
    );
  }
}

export default Sidebar;

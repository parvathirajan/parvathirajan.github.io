import Scroll from "react-scroll";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import SettingsIcon from "@material-ui/icons/SettingsApplications";
import ToysIcon from "@material-ui/icons/Toys";
import CodeIcon from "@material-ui/icons/Code";
import VerifiedUser from "@material-ui/icons/VerifiedUser";

import "../css/Navigation.css";

export const Link = (props) => {
  const { showLabel, ...rest } = props;
  return <Scroll.Link {...rest} />;
};

const buttons = [
  {
    label: "Home",
    name: "home",
    icon: <HomeIcon />,
  },
  {
    label: "About Me",
    name: "resume-about",
    icon: <FaceIcon />,
  },
  {
    label: "Projects",
    name: "resume-portfolio",
    icon: <CodeIcon />,
  },
  {
    label: "Skills",
    name: "resume-skills",
    icon: <SettingsIcon />,
  },
  {
    label: "Experience",
    name: "resume-experience",
    icon: <WorkIcon />,
  },
  {
    label: "Education",
    name: "resume-education",
    icon: <SchoolIcon />,
  },
  {
    label: "Expertise",
    name: "resume-expertise",
    icon: <VerifiedUser />,
  },
  {
    label: "Hobbies",
    name: "resume-hobbies",
    icon: <ToysIcon />,
  },
];

export const SimpleBottomNavigation = () => {
  return (
<div className="app">
    <BottomNavigation value="0" className="BottomNavigation">
      {buttons.map((button, j) => (
        <Link
          key={j} // eslint-disable-line react/no-array-index-key
          className="BottomNavigation-link"
          to={button.name}
          activeClass="active"
          spy={true}
          smooth={true}
          duration={500}
          style={{ textDecoration: "none" }}
        >
          {button.icon}
          {button.label}
        </Link>
      ))}
    </BottomNavigation> 
</div>
  );
};

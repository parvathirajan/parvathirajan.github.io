import Scroll from "react-scroll";
import BottomNavigation from "@mui/material/BottomNavigation";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import FaceIcon from "@mui/icons-material/Face";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/SettingsApplications";
import ToysIcon from "@mui/icons-material/Toys";
import CodeIcon from "@mui/icons-material/Code";
import VerifiedUser from "@mui/icons-material/VerifiedUser";

import "../css/Navigation.css";

export const Link = (props: any) => {
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
    <BottomNavigation value="0" className="BottomNavigation">
      {buttons.map((button, j) => (
        <Link
          key={j} // eslint-disable-line react/no-array-index-key
          className="BottomNavigation-link"
          to={button.name}
          href={`#${button.name}`}
          aria-label={button.label}
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
  );
};

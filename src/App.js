import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Expertise from "./components/Expertise";
import Hobbies from "./components/Hobbies";
import { Footer } from "./components/Footer";
import { SimpleBottomNavigation } from "./components/NavBar";
import { Broken } from "./components/Broken.js";

export const ResumePage = () => {
  return (
    <div>
      <Header />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Expertise />
      <Hobbies />
      <Footer />
      <SimpleBottomNavigation />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<ResumePage />} />
        <Route path="*" element={<Broken />} />
      </Routes>
    </BrowserRouter>
  );
};

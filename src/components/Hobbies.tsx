import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../css/hobbies.css";
import { basicData, sectionNames } from "./Data";

const hobbies = basicData.hobbies;

export const Hobbies = () => {
  return (
    <section id="resume-hobbies" className="resume-hobbies-block">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span>{sectionNames.interests}</span>
        </h1>
      </div>

      <div className="resume-hobbies-block-hobbies">
        {hobbies.map((hobby) => (
          <div
            key={hobby.name}
            className="resume-hobbies-block-hobby-container"
          >
            <div className="resume-hobbies-block-hobby">
              <Card
                style={{ background: "white", color: "black" }}
                className="resume-hobbies-block-hobby-front"
              >
                <CardContent>
                  <i
                    className={`fa fa-${hobby.icon} fa-2x`}
                    aria-hidden="true"
                  ></i>
                  <h4>{hobby.name}</h4>
                </CardContent>
              </Card>
              <Card
                key={hobby.name}
                style={{ background: "black", color: "#fff" }}
                className="resume-hobbies-block-hobby-back"
              >
                <CardContent>
                  {hobby.description && (
                    <div className="resume-hobbies-block-hobby-back-description">
                      {hobby.description}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

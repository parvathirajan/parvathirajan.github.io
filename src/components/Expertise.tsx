import { resumeData, sectionNames } from "./Data";

export const Expertise = () => {
  return (
    <section id="resume-expertise">
      <div className="col-md-12">
        <div className="col-md-12">
          <h1 className="section-title">
            <span className="text-white">{sectionNames.expertise}</span>
          </h1>
        </div>
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto" style={{ color: "white" }}>
            {resumeData.expertise.icons.map((expertise, i) => (
              <div className="col-md-6 text-center mx-auto">
                <h3 className="pt-5">{expertise.title}</h3>
                <p
                  className="text-center"
                  style={{
                    fontSize: "140%",
                    marginTop: "4px",
                    marginLeft: "50px",
                    marginRight: "50px",
                  }}
                >
                  {expertise.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

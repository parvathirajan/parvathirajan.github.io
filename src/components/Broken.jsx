import "../css/broken.scss";
import { TypeAnimation } from "react-type-animation";

const Four = () => {
  return <div className="number">4</div>;
};

const Zero = () => {
  return (
    <div className="illustration">
      <div className="circle" />
      <div className="clip">
        <div className="paper">
          <div className="face">
            <div className="eyes">
              <div className="eye eye-left" />
              <div className="eye eye-right" />
            </div>
            <div className="rosyCheeks rosyCheeks-left" />
            <div className="rosyCheeks rosyCheeks-right" />
            <div className="mouth" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Broken = () => {
  return (
    <>
      <div className="broken-center">
        <div className="error">
          <Four />
          <Zero />
          <Four />
        </div>

        <div>
          <TypeAnimation
            className="title-styles"
            sequence={[
              "Oh oh! Looks like you got lost.....",
              "Please go back to HOME Page !!!",
            ]}
            repeat={49}
          />
        </div>
        <a
          className="link"
          href="/"
          style={{
            textDecoration: "none",
            color: "white",
            width: "300px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          Back Home
        </a>
      </div>
    </>
  );
};

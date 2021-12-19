import "../css/broken.scss";
import Typical from "react-typical";

const Four = () => {
  return <div class="number">4</div>;
};

const Zero = () => {
  return (
    <div class="illustration">
      <div class="circle" />
      <div class="clip">
        <div class="paper">
          <div class="face">
            <div class="eyes">
              <div class="eye eye-left" />
              <div class="eye eye-right" />
            </div>
            <div class="rosyCheeks rosyCheeks-left" />
            <div class="rosyCheeks rosyCheeks-right" />
            <div class="mouth" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Broken = () => {
  return (
    <>
      <div class="broken-center">
        <div class="error">
          <Four />
          <Zero />
          <Four />
        </div>

        <div>
          <Typical
            className="title-styles"
            steps={[
              "Oh oh! Looks like you got lost.....",
              "Please go back to HOME Page !!!",
            ]}
            loop={50}
          />
        </div>
        <a
          class="link"
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

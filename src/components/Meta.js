import { Helmet } from "react-helmet";
import { basicData } from "./Data";

export const Meta = () => {
  return (
    <Helmet
      link={[{ rel: "canonical", href: basicData.basic_info.homePage }]}
      meta={[
        {
          name: "google-site-verification",
          content: "_vSHgjPfwgjL5OOrq0SVA2dD9gjlSYIFN2Bjmo8aeJg",
        },
        { property: "og:url", content: basicData.basic_info.homePage },
        {
          property: "og:image",
          content: `${basicData.basic_info.homePage}/logo.png`,
        },
      ]}
    />
  );
};

export default Meta;

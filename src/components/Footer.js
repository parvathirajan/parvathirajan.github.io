import { basicData } from "./Data";

export const Footer = () => {
  return (
    <>
      <footer style={{ height: 300 }}>
        <div className="col-md-12">
          <div className="social-links">
            {basicData.basic_info.social.map((network) => (
              <span key={network.name} className="m-4">
                <a href={network.url} target="_blank" rel="noopener noreferrer">
                  <i className={network.class}></i>
                </a>
              </span>
            ))}
          </div>

          <div className="copyright py-4 text-center">
            <div className="container">
              <small>
                &copy; {new Date().getFullYear()} All rights belong to me 😊 <br /> Made with <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                <a href={basicData.basic_info.socialLink.github} target="_blank" rel="noreferrer">
                  {basicData.basic_info.name}
                </a>
              </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <footer
      className="w-100 mt-auto text-dark p-4 align-center"
      style={{ backgroundColor: "#aad15f" }}
    >
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <button className="btn btn-dark mb-3" onClick={scrollToTop}>
          &#8679; Back to Top
        </button>
        <h4
          style={{
            fontSize: "20px",
            fontFamily: "Poppins",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#06052e",
          }}
        >
          &copy; {new Date().getFullYear()} - Feastbook
        </h4>
      </div>
    </footer>
  );
};

export default Footer;

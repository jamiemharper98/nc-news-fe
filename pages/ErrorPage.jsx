import { MdError } from "react-icons/md";
import ErrorMessage from "../components/ErrorMessage";
import {  useNavigate } from "react-router-dom";

export default function ErrorPage(props) {
  const navigate = useNavigate();
  return (
    <section className="error-page">
      <ErrorMessage err={props.err} />
      <MdError className="error-icon" />

      <button
        onClick={(e) => {
          if (e.target.innerText.includes("Articles")) {
            props.setIsLoading(true);
            props.setGetError(null);
            props.setQuery([]);
          }
          navigate(props.err === "query" ? "/articles" : "/");
        }}
      >
        Return to {props.err === "query" ? "Articles" : "Home"} Page
      </button>
    </section>
  );
}

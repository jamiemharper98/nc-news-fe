import { MdError } from "react-icons/md";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

export default function ErrorPage({ err }) {
  return (
    <section className="error-page">
      <ErrorMessage err={err} />
      <MdError className="error-icon" />
      <Link to="/" className="no-underline">
        <button>Return to Home Page</button>
      </Link>
    </section>
  );
}

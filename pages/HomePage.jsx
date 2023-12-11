import { Link } from "react-router-dom";
import rightArrow from "../assets/icons/arrow-right.svg";

export default function HomePage() {
  return (
    <main>
      <Link to="/articles" className="no-underline">
        <button className="button-rectangle">
          All Articles <img src={rightArrow} className="arrow" />
        </button>
      </Link>
      <p>topic</p>
      <p>topic</p>
      <p>topic</p>
    </main>
  );
}

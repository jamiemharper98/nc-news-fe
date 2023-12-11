import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import rightArrow from "../assets/icons/arrow-right.svg";

export default function HomePage() {
  const navigate = useNavigate();

  function selectTopic(e) {
    navigate("/articles", { state: { topic: e.target.innerText.toLowerCase() } });
  }

  return (
    <main>
      <Link to="/articles" className="no-underline">
        <button className="button-rectangle">
          All Articles <img src={rightArrow} className="arrow" />
        </button>
      </Link>

      <div onClick={selectTopic}>
        <p>Coding</p>
      </div>
      <div onClick={selectTopic}>
        <p>Cooking</p>
      </div>
      <div onClick={selectTopic}>
        <p>Football</p>
      </div>
    </main>
  );
}

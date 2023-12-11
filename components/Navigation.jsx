import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <header className="nav">
      <Link to="/" className="no-underline">
        <h1 className="logo">NC News</h1>
      </Link>

      <button>Create new article</button>
      <p>Profile</p>
    </header>
  );
}

import HomePage from "../pages/HomePage";
import Navigation from "../components/Navigation";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticlesPage from "../pages/ArticlesPage";

function App() {
  return (
    <div className="wrapper">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
      </Routes>
    </div>
  );
}

export default App;

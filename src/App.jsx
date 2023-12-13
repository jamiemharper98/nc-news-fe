import HomePage from "../pages/HomePage";
import Navigation from "../components/Navigation";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticlesPage from "../pages/ArticlesPage";
import SingleArticlePage from "../pages/SingleArticlePage";
import ErrorPage from "../pages/ErrorPage";

function App() {
  return (
    <div className="wrapper">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:topic" element={<ArticlesPage />} />
        <Route path="/articles/a/:article_id" element={<SingleArticlePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

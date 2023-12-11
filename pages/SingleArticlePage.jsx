import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArticleById } from "../api/api";
import SingleArticleCard from "../components/SingleArticleCard";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setCurrArticle(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) <h2>Loadin...</h2>;

  return (
    <>
      <SingleArticleCard currArticle={currArticle} />
    </>
  );
}

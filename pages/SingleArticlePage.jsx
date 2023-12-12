import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <SingleArticleCard currArticle={currArticle} setCurrArticle={setCurrArticle} />
    </>
  );
}

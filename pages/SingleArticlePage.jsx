import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../api/api";
import SingleArticleCard from "../components/SingleArticleCard";
import CommentCard from "../components/CommentCard";
import AddComment from "../components/AddComment";
import ErrorPage from "./ErrorPage";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [noArticle, setNoArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [deleteError, setDeleteError] = useState(false);
  const currentUser = "jessjelly";

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setCurrArticle(data);
        setNoArticle(false);
        return getCommentsByArticleId(article_id);
      })
      .then((commentData) => setComments(commentData))
      .catch((err) => setNoArticle(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  if (noArticle) return <ErrorPage err={noArticle} />;

  return (
    <section className="single-article-page">
      <SingleArticleCard currArticle={currArticle} setCurrArticle={setCurrArticle} />
      <h2>{!comments.length ? "No " : ""}Comments</h2>
      <AddComment article_id={article_id} setComments={setComments} currentUser={currentUser} />
      <p className={`${deleteError || "no-display"}`}>
        An Error has occured with the deleting of a comment! Please try again later!
      </p>
      {comments.map((comment, i) => {
        return (
          <CommentCard
            comment={comment}
            key={comment.comment_id}
            i={i}
            currentUser={currentUser}
            setComments={setComments}
            setDeleteError={setDeleteError}
          />
        );
      })}
    </section>
  );
}

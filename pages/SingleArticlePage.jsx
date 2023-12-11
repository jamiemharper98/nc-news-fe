import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../api/api";
import SingleArticleCard from "../components/SingleArticleCard";
import CommentCard from "../components/CommentCard";
import AddComment from "../components/AddComment";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(false);

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setCurrArticle(articleData);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((commentData) => {
      setComments(commentData);
    });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <SingleArticleCard currArticle={currArticle} />

      <h2>Comments</h2>
      <AddComment article_id={article_id} setComments={setComments} setNewComment={setNewComment}/>
      {comments.map((comment) => {
        return <CommentCard comment={comment} key={comment.comment_id} />;
      })}
    </>
  );
}

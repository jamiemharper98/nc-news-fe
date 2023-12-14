import { useState } from "react";
import { postCommentByArticleId } from "../api/api";

export default function AddComment(props) {
  const [newComment, setNewComment] = useState("");
  const [validation, setValidation] = useState(false);
  const [failedComment, setFailedComment] = useState(false);

  function createNewComment(e) {
    e.preventDefault();
    if (validation) {
      postCommentByArticleId(props.article_id, { username: props.currentUser, body: newComment })
        .then((commentData) => {
          setFailedComment(false);
          props.setComments((currComments) => [commentData, ...currComments.slice(1)]);
        })
        .catch(() => {
          setFailedComment(true);
          props.setComments((currComments) => [...currComments.slice(1)]);
        });
      props.setComments((currComments) => {
        const createComment = {
          author: props.currentUser,
          date: Date.now(),
          body: newComment,
          votes: 0,
          comment_id: Date.now(),
        };
        return [createComment, ...currComments];
      });
      setNewComment("");
      setValidation(false);
    }
  }

  function validateComment(e) {
    setValidation(e.target.value ? true : false);
    setNewComment(e.target.value);
  }

  return (
    <form onSubmit={createNewComment} className="new-comment">
      <h2 id="comment-title">{!props.comments.length ? "No " : ""}Comments</h2>
      <label htmlFor="new-comment">Add Comment </label>
      <textarea placeholder="A new comment..." id="new-comment" value={newComment} onChange={validateComment} />

      <button className={`button-rectangle ${validation || "disabled"}`}>Add</button>
      <p className={`${failedComment || "no-display"}`}>
        An error has occured! Your comment has not been posted, please try again later!
      </p>
    </form>
  );
}

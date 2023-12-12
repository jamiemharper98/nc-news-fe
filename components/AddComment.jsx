import { useState } from "react";
import { postCommentByArticleId } from "../api/api";

export default function AddComment(props) {
  const [newComment, setNewComment] = useState("");
  const [validation, setValidation] = useState(false);
  const username = "jessjelly";

  function createNewComment(e) {
    e.preventDefault();
    if (validation) {
      postCommentByArticleId(props.article_id, { username: username, body: newComment });
      props.setComments((currComments) => {
        const createComment = {
          author: username,
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
      <label htmlFor="new-comment">
        Add Comment{" "}
        <textarea placeholder="A new comment..." id="new-comment" value={newComment} onChange={validateComment} />
      </label>
      <button className={`button-rectangle ${validation || "disabled"}`}>Add</button>
    </form>
  );
}

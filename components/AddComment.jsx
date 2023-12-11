import { useState } from "react";
import { postCommentByArticleId } from "../api/api";

export default function AddComment(props) {
  const [newComment, setNewComment] = useState("");
  const username = "jessjelly";

  function createNewComment(e) {
    e.preventDefault();
    postCommentByArticleId(props.article_id, { username: username, body: newComment });
    props.setComments((currComments) => {
      const createComment = { author: username, date: Date.now(), body: newComment, votes: 0, comment_id: Date.now() };
      return [createComment, ...currComments];
    });
    setNewComment("");
  }

  return (
    <form onSubmit={createNewComment} className="new-comment">
      <label htmlFor="new-comment">
        Add Comment{" "}
        <input
          placeholder="A new comment..."
          id="new-comment"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
      </label>
      <button className="button-rectangle">Add</button>
    </form>
  );
}

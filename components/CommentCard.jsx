import upArrow from "../assets/icons/arrow-up.svg";
import downArrow from "../assets/icons/arrow-down.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiTwotoneDelete } from "react-icons/ai";
import { deleteCommentByCommentId } from "../api/api";
dayjs.extend(relativeTime);

export default function CommentCard({ comment, currentUser, setComments, i, setDeleteError }) {
  function deleteComment(comment_id) {
    deleteCommentByCommentId(comment_id)
      .then(() => {
        setDeleteError(false);
      })
      .catch(() => {
        setComments((currComments) => {
          setDeleteError(true);
          const updateComments = [];
          for (let index = 0; index < currComments.length; index++) {
            if (index === i) updateComments.push(comment);
            updateComments.push(currComments[index]);
          }
          return updateComments;
        });
      });
    setComments((currComments) => currComments.filter((com) => com.comment_id !== comment_id));
  }

  function formatDate(dateString) {
    if (dateString === "a few seconds ago") return "Now";
    if (dateString.includes("minutes")) return dateString.replace("minutes", "min.");
    if (dateString.includes("minute")) return dateString.replace("minutes", "min");
    return dateString;
  }

  return (
    <section className="comment-card">
      <p>{comment.author}</p>
      <p id="cc-date">{formatDate(dayjs().to(dayjs(comment.created_at)))}</p>
      <p id="cc-body">{comment.body}</p>

      <section className="single-votes">
        <button className="single-article-vote red" name="downvote">
          <img src={downArrow} className="arrow-down" name="downvote" alt="Downvote button" />
        </button>
        {comment.votes}
        <button className="single-article-vote" name="upvote">
          <img src={upArrow} className="arrow-up" name="upvote" alt="Upvote button" />
        </button>
      </section>
      {comment.author !== currentUser ? null : (
        <button
          className={`delete-button`}
          onClick={() => {
            deleteComment(comment.comment_id);
          }}
        >
          <AiTwotoneDelete alt="delete comment" />
        </button>
      )}
    </section>
  );
}

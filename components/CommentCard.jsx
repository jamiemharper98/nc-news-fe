import upArrow from "../assets/icons/arrow-up.svg";
import downArrow from "../assets/icons/arrow-down.svg";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
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

  return (
    <section className="comment-card">
      <p>{comment.author}</p>
      <p className="cc-date">{dayjs().to(dayjs(comment.created_at))}</p>
      <p className="cc-body">{comment.body}</p>
      <section className="single-votes">
        <button className="single-article-vote red" name="downvote">
          <img src={downArrow} className="arrow-down" name="downvote" />
        </button>
        {comment.votes}
        <button className="single-article-vote" name="upvote">
          <img src={upArrow} className="arrow-up" name="upvote" />
        </button>
        <button
          className={`delete-button ${comment.author !== currentUser && "no-display"}`}
          onClick={() => {
            deleteComment(comment.comment_id);
          }}
        >
          <AiTwotoneDelete />
        </button>
      </section>
    </section>
  );
}

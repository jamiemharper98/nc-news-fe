import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import upArrow from "../assets/icons/arrow-up.svg";
dayjs.extend(relativeTime);

export default function CommentCard({ comment }) {
  return (
    <section className="comment-card">
      <p className="cc-author">{comment.author}</p>
      <p className="cc-date">{dayjs().to(dayjs(comment.created_at))}</p>
      <p className="cc-body">{comment.body}</p>
      <p className="cc-votes">
        {comment.votes}
        <button className="button-circle">
          <img src={upArrow} className="arrow-up" />
        </button>
      </p>
    </section>
  );
}

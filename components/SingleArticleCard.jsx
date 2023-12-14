import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import upArrow from "../assets/icons/arrow-up.svg";
import downArrow from "../assets/icons/arrow-down.svg";
import { changeArticleVotes } from "../api/api";
import { useState } from "react";
import { Link } from "react-router-dom";
dayjs.extend(relativeTime);

export default function SingleArticleCard({ currArticle, setCurrArticle }) {
  const [failedVote, setFailedVote] = useState(false);

  function changeVotes(e) {
    const changeVotes = e.target.name === "downvote" ? -1 : 1;
    changeArticleVotes(currArticle.article_id, { inc_votes: changeVotes })
      .then(() => {
        setFailedVote(false);
      })
      .catch(() => {
        setFailedVote(true);
        setCurrArticle((currArticle) => {
          const updatedArticle = { ...currArticle };
          updatedArticle.votes -= changeVotes;
          return updatedArticle;
        });
      });
    setCurrArticle((currArticle) => {
      const updatedArticle = { ...currArticle };
      updatedArticle.votes += changeVotes;
      return updatedArticle;
    });
  }

  function formatDate(dateString) {
    if (dateString === "a few seconds ago") return "Now";
    if (dateString.includes("minutes")) return dateString.replace("minutes", "min.");
    if (dateString.includes("minute")) return dateString.replace("minutes", "min");
    return dateString;
  }

  return (
    <article className="single-card">
      <Link to={`/articles/${currArticle.topic}`}>
        <button className="topic-link underline">{currArticle.topic}</button>
      </Link>
      <p id="single-date">{formatDate(dayjs().to(dayjs(currArticle.created_at)))}</p>
      <h2 id="single-title">{currArticle.title}</h2>
      <p id="single-author">by {currArticle.author}</p>
      <p id="single-body">{currArticle.body}</p>
      <img src={currArticle.article_img_url} id="single-img" alt={currArticle.title} />
      <section className="single-votes">
        <button className="single-article-vote red" name="downvote" onClick={changeVotes}>
          <img src={downArrow} className="arrow-down" name="downvote" alt="Downvote button" />
        </button>
        {currArticle.votes}
        <button className="single-article-vote" name="upvote" onClick={changeVotes}>
          <img src={upArrow} className="arrow-up" name="upvote" alt="Upvote button" />
        </button>
        <p className={failedVote || "no-display"}>Your vote has not gone through!</p>
      </section>
    </article>
  );
}

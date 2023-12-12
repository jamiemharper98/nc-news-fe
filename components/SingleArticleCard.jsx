import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import upArrow from "../assets/icons/arrow-up.svg";
import downArrow from "../assets/icons/arrow-down.svg";
import { changeArticleVotes } from "../api/api";
import { useState } from "react";
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

  return (
    <article className="single-card">
      <p className="single-topic underline">{currArticle.topic}</p>
      <p className="single-date">{dayjs().to(dayjs(currArticle.created_at))}</p>
      <h2 className="single-title">{currArticle.title}</h2>
      <p className="single-author">by {currArticle.author}</p>
      <p className="single-body">{currArticle.body}</p>
      <img src={currArticle.article_img_url} className="single-img" />
      <p className="single-votes">
        <button className="single-article-vote red" name="downvote" onClick={changeVotes}>
          <img src={downArrow} className="arrow-down" name="downvote" />
        </button>
        {currArticle.votes}
        <button className="single-article-vote" name="upvote" onClick={changeVotes}>
          <img src={upArrow} className="arrow-up" name="upvote" />
        </button>
        <p className={failedVote || "no-display"}>Your vote has not gone through!</p>
      </p>
    </article>
  );
}

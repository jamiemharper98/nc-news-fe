import { Link } from "react-router-dom";
import rightArrow from "../assets/icons/arrow-right.svg";
import { useEffect, useState } from "react";
import { getTopics } from "../api/api";
import TopicCard from "../components/TopicCard";

export default function HomePage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    getTopics().then((topicData) => {
      setTopics(topicData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <main className="home-page">
      <Link to="/articles" className="no-underline">
        <button className="button-rectangle">
          All Articles <img src={rightArrow} className="arrow" />
        </button>
      </Link>

      {topics.map((topic) => {
        return <TopicCard topic={topic} key={topic.slug} />;
      })}
    </main>
  );
}

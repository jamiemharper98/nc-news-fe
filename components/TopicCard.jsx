import { Link } from "react-router-dom";

export default function TopicCard(props) {
  const topic = props.topic.slug;
  return (
    <Link to={`/articles/${topic}`} className="topic-card">
      <section id={topic}>
        <h2>{topic[0].toUpperCase() + topic.slice(1)}</h2>
        <h3>{props.topic.description}</h3>
      </section>
    </Link>
  );
}

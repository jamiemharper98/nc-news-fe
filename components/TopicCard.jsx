import { Link } from "react-router-dom";

export default function TopicCard(props) {
  return (
    <Link to={`/articles/${props.topic.slug}`}>
      <section className="topic-card" id={props.topic.slug}>
        <h2 id={props.topic.slug}>{props.topic.slug}</h2>
        <h3 id={props.topic.slug}>{props.topic.description}</h3>
      </section>
    </Link>
  );
}

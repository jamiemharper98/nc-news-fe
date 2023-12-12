import { useNavigate } from "react-router-dom";

export default function TopicCard(props) {
  const navigate = useNavigate();

  function selectTopic(e) {
    navigate("/articles", { state: { topic: e.target.id } });
  }

  return (
    <section className="topic-card" id={props.topic.slug} onClick={selectTopic}>
      <h2 id={props.topic.slug}>{props.topic.slug}</h2>
      <h3 id={props.topic.slug}>{props.topic.description}</h3>
    </section>
  );
}

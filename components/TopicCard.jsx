import { useNavigate } from "react-router-dom";

export default function TopicCard(props) {
  const navigate = useNavigate();

  function selectTopic(e) {
    console.log(e.target.innerText.toLowerCase());
    navigate("/articles", { state: { topic: e.target.innerText.toLowerCase() } });
  }

  return (
    <section className="topic-card" onClick={selectTopic}>
      <h2>{props.topic.slug}</h2>
      <h3>{props.topic.description}</h3>
    </section>
  );
}

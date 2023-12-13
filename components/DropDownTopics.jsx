import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, useParams } from "react-router-dom";

export default function DropDownTopics(props) {
  const navigate = useNavigate();
  const {topic} = useParams()

  function changeTopic(e) {
    const topic = e.target.id === "all" ? null : e.target.id;
    props.setQuery((currQuery) => {
      return { ...currQuery, topic: topic };
    });
    if (!topic) navigate("/articles");
    else navigate(`/articles/${e.target.id}`);
  }
  return (
    <label>
      <DropdownButton id="dropdown-basic-button" title="Choose a topic" className="dropdown-topic">
        <Dropdown.Item id="all" onClick={changeTopic}>
          All Topics
        </Dropdown.Item>

        {props.topics.map((topic) => {
          return (
            <Dropdown.Item key={topic} id={topic} onClick={changeTopic}>
              {topic[0].toUpperCase() + topic.slice(1)}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <p>{topic ? topic[0].toUpperCase() + topic.slice(1) : 'All Articles'}</p>
    </label>
  );
}

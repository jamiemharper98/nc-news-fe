import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";

export default function DropDownTopics(props) {
  const navigate = useNavigate();

  function changeTopic(e) {
    const topic = e.target.id === "all" ? null : e.target.id;
    props.setQuery((currQuery) => {
      return { ...currQuery, topic: topic };
    });
    if (!topic) navigate("/articles");
    else navigate(`/articles/${e.target.id}`);
  }
  return (
    <DropdownButton id="dropdown-basic-button" title="Choose a topic" className="dropdown-topic">
      <Dropdown.Item id="all" onClick={changeTopic}>
        All Topics
      </Dropdown.Item>

      {props.topics.map((topic) => {
        return (
          <Dropdown.Item key={topic} id={topic} onClick={changeTopic}>
            {topic}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}

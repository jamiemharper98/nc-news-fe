import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function DropDownTopics(props) {
  

  function changeTopic(e) {
    props.setQuery((currQuery) => {
      const updatedQuery = { ...currQuery };
      updatedQuery.topic = e.target.id === "all" ? null : e.target.id;
      return updatedQuery;
    });
  }

  return (
    <DropdownButton id="dropdown-basic-button" title="Choose a topic" className="dropdown-topic" >
      <Dropdown.Item onClick={changeTopic} id="all">
        All Topics
      </Dropdown.Item>
      {props.topics.map((topic) => {
        return (
          <Dropdown.Item onClick={changeTopic} id={topic} key={topic}>
            {topic}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}

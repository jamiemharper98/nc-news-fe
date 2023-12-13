import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const SortCriteria = [
  { id: "all", text: "Show All" },
  { id: "created_at", text: "Date of publish" },
  { id: "votes", text: "Votes" },
  { id: "comment_count", text: "Comment Count" },
];

export default function DropDownSort(props) {
  function changeSort(e) {
    const sort = e.target.id === "all" ? null : e.target.id;
    props.setQuery((currQuery) => {
      return { ...currQuery, sort_by: sort };
    });
  }
  return (
    <DropdownButton id="dropdown-basic-button" title="Choose sort criteria" className="dropdown-topic">
      {SortCriteria.map((sort) => {
        return (
          <Dropdown.Item id={sort.id} key={sort.id} onClick={changeSort}>
            {sort.text}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}

export default function ErrorMessage(props) {
  const errMsg = props.err
    ? "Your search query has been unsuccessful! Please try again with the options provided"
    : "The page you have requested has not been found. Please try again!";
  return <h2>{errMsg}</h2>;
}

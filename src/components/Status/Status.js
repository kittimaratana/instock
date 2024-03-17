import "./Status.scss";

// for displaying a status badge
function Status({ text }) {
  // Convert the text to lowercase for consistent class naming
  const lowerCasedText = typeof text === "string" ? text.toLowerCase() : "";

  return (
    <div className="status">
      <div className={`status__badge status__badge--${lowerCasedText.replaceAll(" ", "-")}`}>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Status;

import "./Status.scss";

function Status({ text }) {
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

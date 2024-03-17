import "./AttributeLink.scss";
import iconAttribute from "../../assets/images/chevron_right-24px.svg";

//styling for field/attribute that links to page that provides more details about the item
function AttributeLink({attribute, device}) {
  return (
    <>
    {attribute}
    <img className={`attribute-link__${device}`} src={iconAttribute} alt="link"/>
    </>
  );
}

export default AttributeLink;

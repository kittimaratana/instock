import "../../assets/images/delete_outline-24px.svg";
import "./SearchInput.scss";

//search bar component 
function SearchInput() {
  return (
    <form className="search">
      <input
        type="text"
        id="search-bar"
        name="searchBar"
        placeholder="Search..."
        className="search__field"
      />
    </form>
  );
}

export default SearchInput;

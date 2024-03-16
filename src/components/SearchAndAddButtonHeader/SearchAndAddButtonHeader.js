import AddButton from "../AddButton/AddButton";
import SearchInput from "../SearchInput/SearchInput";
import "./SearchAndAddButtonHeader.scss";

export function SearchAndAddButtonHeader({ title, button_text }) {
  return (
    <>
      <section className="search_and_add_button_header">
        <h1 className="search_and_add_button_header__title">{title}</h1>
        <div className="search_and_add_button_header__actions">
          <SearchInput />
          <AddButton
            className="search_and_add_button_header__add-button"
            message={button_text}
          />
        </div>
      </section>
    </>
  );
}

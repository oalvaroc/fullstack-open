const Search = (props) => {
  const { searchText, setSearchText } = props;

  return (
    <div>
      Search for name containing: <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
    </div>
  );
}

export default Search;

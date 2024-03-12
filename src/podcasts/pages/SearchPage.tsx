

export const SearchPage = () => {
  return (
    <div className="search">
      <div className="search__filter">
        <div className="search__num-podcasts">100</div>
        <form className="search__form">
          <input
            type="text"
            placeholder="Filter podcasts ..."
            className="search__input"
            name="searchText"
          />
        </form>
      </div>
    </div>
  )
}
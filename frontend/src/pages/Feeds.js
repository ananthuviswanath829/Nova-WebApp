import { useContext } from "react";

import SearchContext from "../context/SearchContext";

import TopBar from "../component/layout/TopBar";

const FeedsPage = () => {
  const { searchTerm, setSearchTerm, getSearchResult, } = useContext(SearchContext);

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />
    </div>
  )
};

export default FeedsPage;
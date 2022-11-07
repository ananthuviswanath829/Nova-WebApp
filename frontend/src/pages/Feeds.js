import { useContext } from "react";

import SearchContext from "../context/SearchContext";

import TopBar from "../component/layout/TopBar";

const FeedsPage = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  )
};

export default FeedsPage;
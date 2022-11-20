import { useContext, useState } from "react";

import SearchContext from "../context/SearchContext";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import TopBar from "../component/layout/TopBar";

const FeedsPage = () => {
  const { searchTerm, setSearchTerm, getSearchResult, } = useContext(SearchContext);

  const [value, setValue] = useState(new Date());

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />

      <div style={{width: '100%'}}>
       <Calendar onChange={setValue} value={value} />
      </div>
    </div>
  )
};

export default FeedsPage;
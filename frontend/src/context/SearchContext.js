import { createContext, useState } from 'react';

import useAxios from '../utils/useAxios';

const SearchContext = createContext();

export default SearchContext;

export const SearchProvider = ({ children }) => {
  const api = useAxios();

  const [searchTerm, setSearchTerm] = useState('');
  
  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);
  const [values, setValues] = useState([]);

  const getSearchResult = async () => {
    try {
      const response = await api.get('/api/search/result/get', {
        params: {search_term: searchTerm}
      });

      if (response.status === 200) {
        setValues(response.data);
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Search result get successfully',
        });
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Profile Get',
      });
    }
  };

  const contextData = {
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    getSearchResult: getSearchResult,
    values: values,
    apiRes: apiRes,
    setApiRes: setApiRes,
  };

  return (
    <SearchContext.Provider value={contextData}>
      {children}
    </SearchContext.Provider>
  );
};
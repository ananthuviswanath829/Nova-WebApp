import { createContext, useState } from 'react';

const SearchContext = createContext();

export default SearchContext;

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const contextData = {
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
  };

  return (
    <SearchContext.Provider value={contextData}>
      {children}
    </SearchContext.Provider>
  );
};
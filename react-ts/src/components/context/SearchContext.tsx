import React, { ReactNode, createContext, useContext, useState } from 'react';

const SearchContext = createContext<{
  searchValue: string;
  setSearchValue: (value: string) => void;
} | null>(null);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

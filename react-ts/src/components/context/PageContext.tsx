import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageContext = createContext<{
  currentPage: number;
  setCurrentPage: (page: number) => void;
} | null>(null);

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === null) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const frontPageParam = urlParams.get('front-page');
  const [oldPageValue, setOldPageValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(() => {
    let pageParam = Number(urlParams.get('page'));
    if (!pageParam && location.state) {
      pageParam = location.state.page;
    }
    if (pageParam) {
      setOldPageValue(pageParam);
      return pageParam;
    } else if (frontPageParam) {
      return oldPageValue;
    } else {
      return 1;
    }
  });

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

// SidebarContext.js
import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  // Define initialState with your initial values
  const initialState = 0;
  const [sidebarState, setSidebarState] = useState(initialState);

  const updateSidebarState = (newState) => {
    setSidebarState(newState);
  };

  return (
    <SidebarContext.Provider value={{ sidebarState, updateSidebarState }}>
      {children}
    </SidebarContext.Provider>
  );
};

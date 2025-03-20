import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ checked, setChecked, hovered, setHovered }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
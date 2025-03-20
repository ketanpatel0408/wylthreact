import React, { createContext, useContext, useState } from "react";
import { initialData, toggleAll, toggleNode, updateActiveStatus } from "./menuHelpers";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuData, setMenuData] = useState(initialData);

    const handleToggle = (id, currentState) => {
        const newActive = !currentState;
        setMenuData(prevData => {
            const toggledData = toggleNode(prevData, id, newActive);
            return updateActiveStatus(toggledData);
        });
    };

    const handleSelectAll = (event) => {
        const newActive = event.target.checked;
        setMenuData(prevData => {
            const toggledData = toggleAll(prevData, newActive);
            return updateActiveStatus(toggledData);
        });
    };

    const areAllSelected = (data) => {
        return data.every(item => {
            if (!item.active) return false;
            if (item.children) return areAllSelected(item.children);
            return true;
        });
    };

    return (
        <MenuContext.Provider
            value={{
                menuData,
                handleToggle,
                handleSelectAll,
                areAllSelected,
                setMenuData
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
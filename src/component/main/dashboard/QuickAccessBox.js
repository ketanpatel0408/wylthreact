import React, { useState } from "react";
import { Menu, MenuItem, Badge, IconButton, Button } from "@mui/material";
import { CapitalGainSvg } from "../../svg";

const menuItems = [
    { id: "client", icon: <i className="fas fa-user text-blue-500 text-[14px]"></i>, label: "Client", dropdown: ["Search Client Accounts", "Add New Client Account"] },
    { id: "transactions", icon: <i className="fas fa-money-bill text-blue-500 text-[14px]"></i>, label: "MF Transactions", dropdown: ["Purchase", "SIP", "Top-Up SIP (NSE)", "Switch", "STP", "Redeem", "SWP", "Bulk Transaction", "Order Drafts"] },
    { id: "import", icon: <i className="fas fa-upload text-blue-500 text-[14px]"></i>, label: "Import CAS", dropdown: [] },
    { id: "holding", icon: <i className="fas fa-coins text-blue-500 text-[14px]"></i>, label: "MF Holding", dropdown: [] },
    { id: "capital", icon: <CapitalGainSvg className="w-[16.577px] h-[17.498px] text-blue-500" width="16.577" height="17.498" fill="currentColor" viewBox="0 0 16.577 17.498" />, label: "Capital Gain", dropdown: [] },
    { id: "multiasset", icon: <CapitalGainSvg className="w-[16.577px] h-[17.498px] text-blue-500" width="16.577" height="17.498" fill="currentColor" viewBox="0 0 16.577 17.498" />, label: "Multi-Asset CAS", dropdown: [] },
    { id: "amcsoa", icon: <i className="fas fa-coins text-blue-500 text-[14px]"></i>, label: "AMC SOA", dropdown: [] },
    { id: "others", icon: <i className="fas fa-money-bill text-blue-500 text-[14px]"></i>, label: "Others", dropdown: ["Executive Summary", "Corpus Report", "Performance Report", "Corporate Actions", "Periodic Holding Report"] },
    { id: "pending", icon: <i className="fas fa-exclamation-triangle text-blue-500 text-[14px]"></i>, label: "Pending Requests", badge: 712, dropdown: [] }
];

const QuickAccessBox = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuType, setMenuType] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const handleMenuOpen = (event, type) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuType(null);
    };

    return (
        <div>
            <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 lg:flex lg:flex-wrap lg:items-center lg:space-x-4 bg-white py-2 px-4 shadow-md rounded-md ${showAll ? '' : 'overflow-hidden h-16'}`}>
                {menuItems.map((item) => (
                    <div key={item.id} className={`text-center relative ${item.badge ? "lg:pl-[30px] lg:border-l-2 lg:border-gray-300 lg:!ml-auto" : ""}`}>
                        <IconButton 
                            onClick={(e) => item.dropdown.length > 0 && handleMenuOpen(e, item.id)} 
                            className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full mx-auto relative"
                        >
                            {item.badge ? (
                                <Badge badgeContent={item.badge} color="error">
                                    {item.icon}
                                </Badge>
                            ) : (
                                item.icon
                            )}
                            {item.dropdown.length > 0 && (
                                menuType === item.id ? <i className="fas fa-angle-up arrow text-blue-500 text-[14px] absolute top-1/2 right-[-10px] -translate-y-1/2 text-[10px]"></i> : <i className="fas fa-angle-down arrow text-blue-500 text-[14px] absolute top-1/2 right-[-10px] -translate-y-1/2 text-[10px]"></i>
                            )}
                        </IconButton>
                        <span className="text-xs text-blue-500 block mt-1 font-medium">{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="text-right block sm:hidden">
                <Button onClick={() => setShowAll(!showAll)} className="text-xs text-blue-500">
                    {showAll ? "View Less" : "View More"}
                </Button>
            </div>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {menuType && menuItems.find(item => item.id === menuType)?.dropdown.map((option, index) => (
                    <MenuItem className="!font-normal !text-[14px]" key={index} onClick={handleMenuClose}>{option}</MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default QuickAccessBox;

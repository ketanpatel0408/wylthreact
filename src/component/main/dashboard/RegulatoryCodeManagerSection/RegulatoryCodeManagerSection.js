import React from "react";
import MultiLevelRMSelect from "../../MultiLevelRMSelect";
import AlertProvider from "../../alert/AlertProvider";
import ARNRIACode from "../../ArnRiaCode";
import LastTransactionUpdated from "./LastTransactionUpdated";
import { useMenu } from "../../MenuManagement/MenuContext";

const RegulatoryCodeManagerSection = () => {
    const { menuData } = useMenu();

    const findMenuItem = (name, data) => {
        for (let item of data) {
            if (item.name === name) return item;
            if (item.children) {
                const found = findMenuItem(name, item.children);
                if (found) return found;
            }
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-2 gap-4 p-[20px] bg-gray-100 border-b-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${findMenuItem("Code (ARN/RIA)", menuData)?.active ? "block" : "hidden"}`}>
                    <AlertProvider>
                        <ARNRIACode />
                    </AlertProvider>
                </div>

                <div className={`${findMenuItem("Relationship Manager", menuData)?.active ? "block" : "hidden"}`}>
                    <AlertProvider>
                        <MultiLevelRMSelect />
                    </AlertProvider>
                </div>
            </div>

            <div className={`${findMenuItem("Last Transaction Updated On", menuData)?.active ? "block" : "hidden"}`}>
                <LastTransactionUpdated />
            </div>
        </div>
    )
}

export default RegulatoryCodeManagerSection;
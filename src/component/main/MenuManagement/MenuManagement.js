import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch } from '@mui/material';
import { useMenu } from './MenuContext';

const NestedTable = ({ data, depth = 0 }) => {
    const { handleToggle } = useMenu();

    return (
        <TableContainer className="border rounded-lg">
            <Table size="small" className="w-full">
                {!depth === 0 && (
                    <TableHead className="bg-gray-100">
                        <TableRow>
                            <TableCell>Menu Items</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                )}
                <TableBody>
                    {data.map((row) => {
                        const hasChildren = row.children?.length > 0;
                        return (
                            <React.Fragment key={row.id}>
                                <TableRow className={`${depth % 2 === 0 ? `${depth === 0 ? "bg-blue-500" : "bg-white"}` : "bg-gray-100"} `}>
                                    <TableCell style={{ paddingLeft: `${16 + depth * 1}px` }}>
                                        <div className={`flex items-center ${depth === 0 && "text-[16px] font-semibold text-white"}`}>{row.name}</div>
                                    </TableCell>
                                    <TableCell align="right">
                                        {!row.disable &&
                                            <Switch
                                                color="primary"
                                                checked={row.active || false}
                                                onChange={() => handleToggle(row.id, row.active)}
                                            />
                                        }
                                    </TableCell>
                                </TableRow>
                                {hasChildren && (
                                    <TableRow>
                                        <TableCell colSpan={2} className="p-0 border-b-0">
                                            <NestedTable data={row.children} depth={depth + 1} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const MenuManagement = () => {
    const { menuData, handleToggle, handleSelectAll, areAllSelected } = useMenu();
    if (!menuData || !Array.isArray(menuData)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
            <div className="mb-4 flex justify-end items-center">
                <div className="flex items-center">
                    <span className="ml-2">Select All</span>
                    <Switch
                        color="primary"
                        checked={areAllSelected(menuData)}
                        onChange={handleSelectAll}
                    />
                </div>
            </div>
            <NestedTable data={menuData} onToggle={handleToggle} />
        </div>
    );
}

export default MenuManagement;
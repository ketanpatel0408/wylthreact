export const initialData = [
    {
        id: '1',
        name: 'Dashboard',
        active: true,
        disable: true,
        children: [
            {
                id: '1-1',
                name: 'Code Relationship Manager Section',
                active: true,
                children: [
                    {
                        id: '1-1-1',
                        name: 'Code (ARN/RIA)',
                        active: true,
                    },
                    {
                        id: '1-1-2',
                        name: 'Relationship Manager',
                        active: true,
                    },
                    {
                        id: '1-1-3',
                        name: 'Last Transaction Updated On',
                        active: true,
                    }
                ]
            }, {
                id: '1-2',
                name: 'Quick Access Section',
                active: true,
                children: [
                    {
                        id: '1-2-1',
                        name: 'Client',
                        active: true,
                        children: [
                            {
                                id: '1-2-1-1',
                                name: 'Search Client Accounts',
                                active: true,
                            },
                            {
                                id: '1-2-1-2',
                                name: 'Add New Client Account',
                                active: true,
                            },
                        ]
                    },
                    {
                        id: '1-2-2',
                        name: 'MF Transactions',
                        active: true,
                        children: [
                            {
                                id: "1-2-2-1",
                                name: "Purchase",
                                active: true,
                            },
                            {
                                id: "1-2-2-2",
                                name: "SIP",
                                active: true,
                            },
                            {
                                id: "1-2-2-3",
                                name: "Top-Up SIP (NSE)",
                                active: true,
                            },
                            {
                                id: "1-2-2-4",
                                name: "Switch",
                                active: true,
                            },
                            {
                                id: "1-2-2-5",
                                name: "STP",
                                active: true,
                            },
                            {
                                id: "1-2-2-6",
                                name: "Redeem",
                                active: true,
                            },
                            {
                                id: "1-2-2-7",
                                name: "SWP",
                                active: true,
                            },
                            {
                                id: "1-2-2-8",
                                name: "Bulk Transaction",
                                active: true,
                            },
                            {
                                id: "1-2-2-9",
                                name: "Order Drafts",
                                active: true,
                            },
                        ],
                    },
                    {
                        id: '1-2-3',
                        name: 'Import CAS',
                        active: true,
                    },
                    {
                        id: '1-2-4',
                        name: 'MF Holding',
                        active: true,
                    },
                    {
                        id: '1-2-5',
                        name: 'Capital Gain',
                        active: true,
                    },
                    {
                        id: '1-2-6',
                        name: 'Multi-Asset CAS',
                        active: true,
                    },
                    {
                        id: '1-2-7',
                        name: 'AMC SOA',
                        active: true,
                    },
                    {
                        id: '1-2-8',
                        name: 'Others',
                        active: true,
                        children: [
                            {
                                id: "1-2-8-1",
                                name: "Executive Summary",
                                active: true,
                            },
                            {
                                id: "1-2-8-2",
                                name: "Corpus Report",
                                active: true,
                            },
                            {
                                id: "1-2-8-3",
                                name: "Performance Report",
                                active: true,
                            },
                            {
                                id: "1-2-8-4",
                                name: "Corporate Actions",
                                active: true,
                            },
                            {
                                id: "1-2-8-5",
                                name: "Periodic Holding Report",
                                active: true,
                            },
                        ],
                    },
                    {
                        id: '1-2-9',
                        name: 'Pending Requests',
                        active: true,
                    },
                ]
            }, {
                id: '1-3',
                name: 'Performance Section',
                active: true,
                children: [
                    {
                        id: '1-3-1',
                        name: 'MF Txn. Summary',
                        active: true
                    }, {
                        id: '1-3-2',
                        name: 'Curr. FY Earnings',
                        active: true
                    }, {
                        id: '1-3-3',
                        name: 'Performance',
                        active: true
                    }, {
                        id: '1-3-4',
                        name: 'SIP Reg. & Active',
                        active: true
                    }, {
                        id: '1-3-5',
                        name: 'MF Readiness',
                        active: true
                    }
                ]
            }, {
                id: '1-4',
                name: 'MF Chart Section',
                active: true,
                children: [
                    {
                        id: '1-4-1',
                        name: 'MF AUM Growth',
                        active: true
                    }, {
                        id: '1-4-2',
                        name: 'Total AUM',
                        active: true
                    }, {
                        id: '1-4-3',
                        name: 'MF SIP Book',
                        active: true
                    }, {
                        id: '1-4-4',
                        name: 'Total Active SIP',
                        active: true
                    },
                ]
            }
        ],
    },
];

export const toggleAll = (data, newActive) => {
    return data.map(item => ({
        ...item,
        active: newActive,
        children: item.children ? toggleAll(item.children, newActive) : item.children,
    }));
};

export const toggleNode = (data, id, newActive) => {
    return updateActiveStatus(
        data.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    active: newActive,
                    children: item.children ? toggleAll(item.children, newActive) : item.children,
                };
            } else if (item.children) {
                return {
                    ...item,
                    children: toggleNode(item.children, id, newActive),
                };
            }
            return item;
        })
    );
};

export const updateActiveStatus = (nodes) => {
    return nodes.map(node => {
        if (node.children && node.children.length > 0) {
            const updatedChildren = updateActiveStatus(node.children);
            // const allChildrenActive = updatedChildren.every(child => child.active);
            const anyChildActive = updatedChildren.some(child => child.active);

            return {
                ...node,
                children: updatedChildren,
                active: anyChildActive, // Parent is ON if at least one child is ON
            };
        } else {
            return node;
        }
    });
};
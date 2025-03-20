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
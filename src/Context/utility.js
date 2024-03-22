export const sortOrderKeys = {
    ASCENDING: 'ascending',
    DESCENDING: 'descending',
};


export const sortItems = (items, sortOrder) => {
    return items.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
};


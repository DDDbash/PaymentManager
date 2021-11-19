export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

export const paymentFilter = (paymentFilter) => ({
    type: 'PAYMENT_FILTER',
    paymentFilter
});

export const sortUsers = (sortAttribute) => ({
    type: 'SORT_USERS',
    sortAttribute
});

export const filterUsers = (userFilterAttribute) => ({
    type: 'FILTER_USERS',
    userFilterAttribute
});
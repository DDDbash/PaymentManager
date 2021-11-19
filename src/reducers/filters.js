const filtersReducerDefaultState = {
    text: '',
    paymentStatus: 'all',
    sortAttribute: 'default',
    userFilterAttribute: 'all'
}

export default ((state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'PAYMENT_FILTER':
            return {
                ...state,
                paymentStatus: action.paymentFilter
            };
        case 'SORT_USERS':
            return {
                ...state,
                sortAttribute: action.sortAttribute
            };
        case 'FILTER_USERS':
            return {
                ...state,
                userFilterAttribute: action.userFilterAttribute
            }
        default:
            return state;
    }
})
import data from '../data.json';
const accountsReducerDefaultState = data;

export default (state = accountsReducerDefaultState, action) => {
    switch (action.type) {
        case 'DELETE_ACCOUNT':
            return state.filter(account => account.id !== action.id);
        case 'DELETE_ALL_ACCOUNT':
            return state.filter(() => false);
        case 'UPDATE_PAYMENT_STATUS_DYNAMICALLY':
            return state.map((account) => {
                if (account.id === action.id) {
                    return {
                        ...account,
                        payment_status: action.paymentStatus
                    }
                } else {
                    return account
                }
            })
        case 'CHANGE_USER_STATUS':
            return state.map(account => {
                const newUserStatus = action.userStatus === 'activate' ? 'active' : 'inactive'
                action.submitData.forEach(mData => {
                    if (account.id === mData.id) {
                        account.user_status = newUserStatus
                    } else {
                        return account
                    }
                })
                return account
            });
        case 'UPDATE_ACCOUNT':
            return state.map(account => {
                action.accounts.forEach(mData => {
                    if (account.id === mData.id) {
                        account.payment_status = mData.payment_status;
                        account.paid_date = mData.paid_date;
                        account.amount = mData.amount;
                    } else {
                        return account
                    }
                });
                return account
            })
        default:
            return state;
    }
};
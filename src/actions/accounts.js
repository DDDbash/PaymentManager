export const updateAccounts = (accounts) => ({
    type: 'UPDATE_ACCOUNT',
    accounts
});

export const updatePaymentStatusDynamically = (id, paymentStatus) => ({
    type: 'UPDATE_PAYMENT_STATUS_DYNAMICALLY',
    id,
    paymentStatus
})

export const changeUserStatus = (submitData, userStatus) => ({
    type: 'CHANGE_USER_STATUS',
    submitData,
    userStatus
})

export const deleteAccount = (id) => ({
    type: 'DELETE_ACCOUNT',
    id
})

export const deleteAllAccount = () => ({
    type: 'DELETE_ALL_ACCOUNT',
})

// export const startUpdateAccounts = (accounts) => {
//     return (dispatch) => {
//         const account = [];
//         accounts.forEach((data) => {
//             account.push({ ...data });
//         });
//         dispatch(updateAccounts(account))
//     }
// };


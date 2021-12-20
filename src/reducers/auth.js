export default (state = { authData: null, loggedin: false }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data, loggedin: true }));
            return { ...state, authData: action?.data, loggedin: true };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null, loggedin: false };
        default:
            return state;
    }
}
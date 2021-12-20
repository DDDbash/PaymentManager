import * as api from '../api/index'

export const signin = (formData, navigate, setErr) => async (dispatch) => {
    try {
        setErr(false);

        const { data } = await api.signIn(formData);

        dispatch({ type: 'AUTH', data });

        navigate('/');
    } catch (error) {
        setErr(true);
        console.log(error);
    }
}

export const signup = (formData, navigate, setErr) => async (dispatch) => {
    try {
        setErr(false);

        const { data } = await api.signUp(formData);

        dispatch({ type: 'AUTH', data });

        navigate('/auth');
        window.location.reload(false);
    } catch (error) {
        setErr(true);
        console.log(error);
    }
}
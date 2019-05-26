import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/signup', user)
            .then(res => history.push('/about'))
            .catch(err => {
               console.log("eroare in front din back");
	console.log(err);		 
dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user, history) => dispatch => {
        console.log("intru aici");
    axios.post('/login', user)
            .then(res => {
                console.log(res.data+ " in login");
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                history.push('/');

            })
            .catch(err => {
                console.log(JSON.stringify(err));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    console.log("logoutuser");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/about');
}

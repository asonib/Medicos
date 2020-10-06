import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    GET_PROFILE
} from './type'


//get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    try {
        const res = await axios.get('/api/users/teammates');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//get all Doctors profiles
export const getDoctors = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    try {
        const res = await axios.get('/api/users/doctors');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_REMEDY
} from './type'

//Post Data 
export const getRemedy = (formData, history) => async dispatch => {
    console.log(formData)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/getremedy', formData, config);
        dispatch({
            type: GET_REMEDY,
            payload: res.data
        });
        history.push('/dashboard');

        dispatch(setAlert('Check Report Section for Remedy', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GET_REMEDY,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};
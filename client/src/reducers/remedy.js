import {
    GET_REMEDY
} from '../actions/type';

const initialState = {
    loading: true,
    remedy: null,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_REMEDY:
            return{
                ...state,
                remedy: payload,
                loading: false,
                error: null
            }
        default:
            return state
    }
}
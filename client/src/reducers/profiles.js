import {
    CLEAR_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    GET_PROFILE
} from '../actions/type';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false,
                error: null
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                error: {}
            }
        default:
            return state
    }
}
import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import profiles from './profiles'
import remedy from './remedy'

export default combineReducers({
    alert,
    auth,
    profiles,
    remedy
});
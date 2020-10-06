import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['authorization-token'] = token;
    }else{
        delete axios.defaults.headers.common['authorization-token'];
    }
};

export default setAuthToken;
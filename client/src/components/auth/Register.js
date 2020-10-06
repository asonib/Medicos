import React, { Fragment, useState } from 'react';
import  {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';


const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setformData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        username: '',
        password: '',
        confirm: ''
      });
      const { name, email, address, phone, username, password, confirm } = formData;
      const onChange = e => setformData({ ...formData, [e.target.name]: e.target.value });

      const onSubmit = async(e) =>{
        e.preventDefault();
        if(password !== confirm){
          setAlert('Password do not match', 'danger')
        }else{
          register({name, email, address, phone, username, password, confirm})
        }
      }

      //redirect if logged in
      if(isAuthenticated){
        return <Redirect to='/dashboard' />
      }
      
    return <Fragment>
        <h1 class="large text-primary">Sign Up</h1>
      <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}  required/>
        </div>
        <div class="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
          <small class="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div class="form-group">
          <input type="text" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} required/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Phone Number" name="phone" value={phone} maxLength="10" minLength="10" onChange={e => onChange(e)} required/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Address" name="address" value={address} onChange={e => onChange(e)} required/>
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="5"
            value={password} onChange={e => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            minLength="5"
            value={confirm} onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </Fragment>
    
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProp = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProp, {setAlert, register})(Register);
import React from 'react'
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
      return <Redirect to='/dashboard' />
    }
    return (
        <section class="landing">Link
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">Medicos</h1>
          <p class="lead">
            Not feeling well in this Pandemic and afraid to go out not worry Medicos is here to help!
          </p>
          <div class="buttons">
            <Link to="/register" class="btn btn-primary">Sign Up</Link>
            <Link to="/login" class="btn btn-light">Login</Link>
          </div>
          
        </div>
      </div>
    </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);

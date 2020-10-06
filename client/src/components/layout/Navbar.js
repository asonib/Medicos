import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading}, logout }) => {
  const authLinks = (
    <ul>
      <li><Link to="/users/doctors"><i className="fas fa-users"></i><span className="hide-sm"> Doctors </span></Link></li>
      <li><Link to="/dashboard"><i className="fas fa-user"></i><span className="hide-sm"> Dashboard</span></Link></li>
      <li><Link onClick={logout} to="/"><i className="fas fa-sign-out-alt"></i><span className="hide-sm"> Logout</span></Link></li>
    </ul>
  );
  const basicLinks = (
    <ul>
      <li><Link to="/register"><i className="fas fa-registered"></i><span className="hide-sm"> Register</span></Link></li>
      <li><Link to="/login"><i className="fas fa-sign-in-alt"></i><span className="hide-sm"> Login</span></Link></li>
      <li><Link to="/aboutus"><i className="fas fa-info"></i><span className="hide-sm">  AboutUs</span></Link></li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i></i> Medicos</Link>
            </h1>

    { !loading && (<Fragment>{isAuthenticated ? authLinks: basicLinks}</Fragment>)}
        </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
}
const mapStateToProp = state => ({
  auth: state.auth
});
export default connect(mapStateToProp, { logout })(Navbar);
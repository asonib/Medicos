import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profiles';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import RemedyDisplay from '../remedy/RemedyDisplay';


const Dashboard = ({ getCurrentProfile, profiles: { loading, profile }, remedy: { remedy } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome {profile && profile.name}
        </p>
        <table className="table">
            <thead>
                <tr>
                    <th className="hide-sm">Name</th>
                    <th>{profile.name}</th>
                </tr>
                <tr>
                    <th className="hide-sm">Email</th>
                    <th>{profile.email}</th>
                </tr>
                <tr>
                    <th className="hide-sm">Address</th>
                    <th>{profile.address}</th>
                    <td className="btn btn-danger hide-sm">Update</td>
                </tr>
                <tr>
                    <th className="hide-sm">Phone Number</th>
                    <th>+91 {profile.phone}</th>
                    <td className="btn btn-danger hide-sm">Update</td>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <section class="container alert alert-secondary">
            <h1 class="large">
                Not Feeling Well !
        </h1>
            <p class="lead">
                <i class="fas fa-code-medical"></i> Enter Syptoms and we will take care of you.
        </p>
            <Link to="/remedy" class="btn btn-success my-1" value="Get Remedy">Get Remedy</Link>

        </section>

        <section class="container alert alert-secondary">
            <h1 class="medium">
                Medicos Report.
            </h1>
            <div class="profile-exp bg-white p-2 my-1">
                <p>Some additional symptoms may be added with the provided ones to map with the correct problem and remedy.</p>
                {remedy == null ? (
                    <Fragment>
                        <h4>No Reports avaliable</h4>
                    </Fragment>
                ) : (<Fragment>
                    {remedy.profiles.map((rem) => (
                        <RemedyDisplay key={rem._id} remedy={rem} />
                    ))}
                </Fragment>)}
            </div>
            <Link to="/users/doctors" class="btn btn-success my-1" value="Get Remedy">Consult a Doctor directly !</Link>

        </section>


    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
    remedy: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profiles: state.profiles,
    remedy: state.remedy
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)

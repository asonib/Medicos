import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getDoctors } from '../../actions/profiles';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

const Profiles = ({getDoctors, profiles: {profiles, loading}}) => {
    useEffect(() => {
        getDoctors();
    }, [getDoctors])
    return <Fragment>
        { loading ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Contact Doctors</h1>
            <p className="lead"><i className="fas fa-phone"></i> Call at your convenience and get help from professionals.</p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => <ProfileItem key={profile._id} profile={profile}/>)
                ) : <h4>No Profiles Found...</h4>}
            </div> 
        </Fragment>}
    </Fragment>
}

Profiles.propTypes = {
    profiles: PropTypes.object.isRequired,
    getDoctors: PropTypes.func.isRequired
}

const mapPropsToState = state => ({
    profiles: state.profiles
})

export default connect(mapPropsToState, { getDoctors })(Profiles)

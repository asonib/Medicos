import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: {
    name,
    email,
    phone,
    address,
    designation,
    avatar
} }) => {
    return (
        <div className="profile bg-light my-1">
            <img src={avatar} className="round-img" />
            <div>
                <p>Name : <b>{name}</b></p>
                Email : <b></b>{email}<br/>
                Phone Number : +91 <b></b>{phone}<br/>
                Address : <b></b>{address}<br/>
                Field Of Experience : <b></b>{designation}<br/>
                {/* <p className="">{status} {company && <span>at {company}</span>}</p>
                <p className="">{location && <span>at {location}</span>}</p> */}
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem

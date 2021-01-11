import React from 'react'
import { Link } from 'react-router-dom'
import ASB from '../../img/ASB.jpg'
import SK from '../../img/SK.jpg'
import AN from '../../img/AN.jpg'
import SH from '../../img/SH.jpg'
import RP from '../../img/RP.jpg'

const About = () => {
    return (
        <div>
            
            <div className="profile-top bg-dark p-2">
                <img
                    className="round-img my-1"
                    src={ASB}
                    alt=""
                />
                <h3 className="large">Aryan Soni Burman</h3>
                <p className="lead">Student at CHRIST University</p>
                <p>Bangalore, INDIA</p>
                <div class="icons my-1">
                    <Link to='' target='_blank' rel='noopener noreferrer'>
                        <i className='fas fa-globe fa-2x' />
                    </Link>
                    <Link to='' target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </Link>
                    <Link to='' target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </Link>
                    <Link to='' target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </Link>
                    <Link to='' target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </Link>
                </div>
            </div>
            
        </div>

    )
}

export default About;

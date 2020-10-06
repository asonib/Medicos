import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const RemedyDisplay = ({remedy: {
    disease,
    symptoms,
    remedy
}}) => {
    return (
        <div class="constainer alert alert-secondary">
            <h3 class="text-dark alert alert-warning"><strong>Symptoms : </strong>{symptoms.map((symp, index) => (
                    <div key={index}>
                     {'\u00A0'}{'\u00A0'}- {symp}
                    </div>
                ))}</h3>
            <h3 class="text-dark alert alert-success"><strong>Remedy : </strong>{remedy.map((rem, index) => (
                    <div key={index} className='constainer'>
                        {'\u00A0'}{'\u00A0'}<i className='fas fa-check' /> {rem}
                    </div>
                ))}</h3>
            
            <h3 class="text-dark alert alert-danger">Possible Problem : {disease}</h3>
        </div>
        
    )
}

export default RemedyDisplay

import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect }from 'react-redux';
import { getRemedy }from '../../actions/remedy';
import { Link } from 'react-router-dom';

const Remedy = ({getRemedy, history}) => {

    const [formData, setFormData] = useState({
        symptoms:'',
        info:'',
        location:'',
        from:'',
        to:'',
        description:''
    });

    const {
        symptoms,
        info,
        location,
        from,
        to,
        description
    } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        getRemedy(formData, history);
    }

    return <Fragment>
        <p class="lead">
            <i class="fas fa-code-medical"></i> Enter Syptoms and we will take care of you.
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={e => onSubmit(e)}>
            <div class="form-group">
            <input type="text" placeholder="* Enter comma seperated symptoms" name="symptoms" value={symptoms} onChange={e => onChange(e)} required />
            </div>
            <div class="form-group">
            <input type="text" placeholder="Any Additional Information" name="info" value={info} onChange={e => onChange(e)}/>
            </div>
            <div class="form-group">
            <input type="text" placeholder="* Location" name="location"  value={location} onChange={e => onChange(e)} required />
            </div>
            <div class="form-group">
            <h4>From Date</h4>
            <input type="date" name="from"  value={from} onChange={e => onChange(e)}/>
            </div>
            
            <div class="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={to} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
            <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Any allergies or current Medication?"
                onChange={e => onChange(e)}
                value={description}
            ></textarea>
            </div>
            <input type="submit" class="btn btn-success my-1" value="Medify"/>
        </form>
    </Fragment>
}

Remedy.propTypes = {
    getRemedy: PropTypes.func.isRequired
}

export default connect(null, { getRemedy })(Remedy);

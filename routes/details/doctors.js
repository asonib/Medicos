const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const mongoose = require('mongoose');
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const { check, validationResult } = require('express-validator');

require('../../models/Doctors')
const Doctors = mongoose.model('doctor');

/*
    method: GET
    visibility: private
    response: profile of all registered user - JSON
*/
router.get('/users/doctors',  async(req, res) => {
    try {
        let profiles = await Doctors.find()
        if(profiles.length != 0){
            return res.json(profiles)
        }
        return res.json({'msg': 'No Doctors'})
    } catch (err) {
        console.error('Server Error')
        return res.json(res.status(400).json(err.message))
    }    
});

router.post('/users/doctors', [
    check('name', 'Name is required'),
    check('phone', 'Phone Number is required').isLength({min: 10}),
    check('email', 'Email is required').isEmail(),
    check('address', 'Address is required').isString(),
    check('designation', 'Designation is required').isString(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const check_email = await Doctors.findOne({email: req.body.email})
    if(check_email){
        return res.status(422).json({errors: [{'msg': 'Email Already Exist'}]})
    }

    const check_phone = await Doctors.findOne({phone: req.body.phone})
    if(check_phone){
        return res.status(422).json({errors: [{'msg': 'Phone Number Already Exist'}]})
    }
    let avatar='';
    if(req.body.avatar){
        avatar = req.body.avatar;
    }else{
        avatar = normalize(gravatar.url(req.body.email, { s: "200", d: "mm", r: "pg" }), { forceHttps: true });
    }
    
    const new_doctor = new Doctors({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        designation: req.body.designation,
        avatar: avatar
    })
    
    try {
        await new_doctor.save()
        return res.json({msg: 'Doctors Details Saved!'})
    } catch (err) {
        return res.json({errors: [{'msg': 'error saving details'}]})
    }
})

module.exports = router;
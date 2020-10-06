const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');

require('../../models/Users')
const Users = mongoose.model('user');

/*
    method: GET
    visibility: private
    response: profile of all registered user - JSON
*/
router.get('/users/teammates',  async(req, res) => {
    try {
        let profiles = await Users.find()
        return res.json(profiles)
    } catch (err) {
        console.error('Server Error')
        return res.json(res.status(400).json(err.message))
    }    
})

router.get('/me', auth, async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.user }).select('-password');

        if (!user) {
            return res.status(401).json({ msg: 'No Profile found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.log('Server Error');
        res.status(401).json({ err });
    }


});

module.exports = router;
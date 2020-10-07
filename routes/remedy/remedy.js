const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

require('../../models/Remedy')
const Remedy = mongoose.model('remedy');

/*
    method: POST
    visibility: public
    response: remedy to given symptoms - JSON
*/

router.post('/addremedy', [
    check('symptoms', 'symptoms is required'),
    check('disease', 'disease is required'),
    check('remedy', 'remedy is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    const new_data = new Remedy({
        symptoms: req.body.symptoms,
        disease: req.body.disease,
        remedy: req.body.remedy
    })

    try {
        await new_data.save()
        return res.json({msg: 'Details Saved!'})
    } catch (err) {
        return res.json({errors: [{'msg': 'error saving details'}]})
    }
})

router.post('/getremedy', [
    check('symptoms', 'symptoms is required').isString(),
    check('location', 'location is required').isString(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    //Logic

    let data = req.body.symptoms.split(",")
    for (var i = 0; i < data.length; i++) {
        data[i] = data[i].trim().toLowerCase()
    }
    console.log(data)
    let profiles = await Remedy.find({"symptoms": {$all: data}})

    if(profiles.length == 0){
        profiles = await Remedy.find({"symptoms": {$in: data}})
    }
    
    
    return res.json({profiles})
    
    
    // try {
    //     await new_doctor.save()
    //     return res.json({msg: 'Doctors Details Saved!'})
    // } catch (err) {
    //     return res.json({errors: [{'msg': 'error saving details'}]})
    // }
})

module.exports = router;
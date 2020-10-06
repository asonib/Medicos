const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//loading all environment variables
require('dotenv').config();

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('MongoDB Connected')
}).catch((err) => {
    console.error(`Error Connecting to DB ${err}`)
})

app.use('/api', require('./routes/auth/register'));
app.use('/api', require('./routes/auth/login'));
app.use('/api', require('./routes/details/teammates'));
app.use('/api', require('./routes/details/doctors'));
app.use('/api', require('./routes/remedy/remedy'));

if(process.env.NODE_ENV === 'production'){
    //set static path
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server started at port ${port}`)
});
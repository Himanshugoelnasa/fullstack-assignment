const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

mongoose.connect('mongodb+srv://hiyaan:1234_abcd@cluster0.wbwip.mongodb.net/usersdb?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('db connected');
})
.catch((err) => {
    console.log(err);
})

const User = mongoose.model('user', {
    fname: String,
    lname: String,
    email: String,
    phone: Number,
    country: String,
    about: String,
});

function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
}


app.get('/api/list', async (req, res) => {

    const users = await User.find();
    if (!users) {
        return res.status(404).json({ message: 'Users not found' });
    } else {
        return res.status(201).json({users});
    }
    
})

app.post('/api/add', async (req, res) => {
    if(req.body.fname == '' || req.body.lname == '' || req.body.email == '') {
        return res.status(400).json({ error:true, message: 'Fields with * are required to fill' });
    } 

    if(!ValidateEmail(req.body.email)) {
        return res.status(400).json({ error:true, message: 'Email id not valid.' });
    }

    const user =  await User.create(
        {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            country: req.body.country,
            phone: req.body.phone,
            about: req.body.about,
        }
    );
    if (!user) {
        return res.status(404).json({ error:true, message: 'Users not found' });
    } else {
        return res.status(201).json({user, status: 201, error:false,});
    }
})

app.get('/api/edit/:id', async(req, res) => {
    const user =  await User.findOne({_id: req.params.id});
    if (!user) {
        return res.status(404).json({ message: 'Users not found' });
    } else {
        return res.status(201).json({user});
    }
})

app.post('/api/update/:id', async (req, res) => {
    if(req.body.fname == '' || req.body.lname == '' || req.body.email == '') {
        return res.status(400).json({ error:true, message: 'Fields with * are required to fill' });
    } 

    if(!ValidateEmail(req.body.email)) {
        return res.status(400).json({ error:true, message: 'Email id not valid.' });
    }

    const user =  await User.findOne({_id: req.params.id});
    const updatedUser = await User.findByIdAndUpdate(user._id, {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        country: req.body.country,
        phone: req.body.phone,
        about: req.body.about,
    }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: 'Users not found' });
    } else {
        return res.status(201).json({user, status: 201});
    }
})


app.listen(5000, () => {
    console.log("server is running on port 5000");
})
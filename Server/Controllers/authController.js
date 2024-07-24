const {User} = require('../Models/index.js');
const bcrypt = require('bcrypt');

exports.SignUp = async(req, res, next) => {
    const {username, email, role, password} = req.body;
    if (!username || !password || !role || !email) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    //validate username
    const name_not_taken = await User.findOne({ 
        where: { 
        username,
    }
    });
    if (name_not_taken) {
        return res.status(400).json({message: `username is already not taken`});
    }
    //validate email
    const email_not_taken = await User.findOne({ 
        where: {
        email,
    }
    });
    if(email_not_taken) {
        return res.status(400).json({message: `you already have an account try logging in`});
    }
    //hash the password
    const password_hash = await bcrypt.hash(password, 12);
    //create the new user and save to the database
    try {
       const user = await User.create({username, 
        password_hash, 
        email, 
        role, 
    });
       return res.status(201).json({id: user.id});
    } catch(err) {
        return res.status(500).json({
        message: `${err.message}`
        });
    }
}
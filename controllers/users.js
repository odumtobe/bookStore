const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const passport = require("passport")

//Signup function
const signup = async (req, res) => {
    try {
        const { email, password, username, phone} = req.body;
        //check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(409).json({message: 'User already exist'});
        }

    // create new user with username
    const user= new userModel({email, password, username, phone});
    await user.save();
    //Generate JWT
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res.status(201).json({user, token});
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Server error'})
    }
};

//Login function
const login = async (req, res, next) => {
    passport.authentication('local', {session: false}, (err, user, info) => {
        if (err){
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }
        // Generate JWT
        const token = jwt.sign({ userID: user._id}, process.env.JWT_SECRET);
        res.json({user, token});
    })(req, res, next);
};

const getUsers = (req, res) => {
    userModel.find()

    .then(users => {
        res.json(users)
    })

    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

const getUserById = (req,res) => {
    const id = req.params.id

userModel.findById(id)

.then(user => {
    res.status(200).json(user)
}).catch(err => {
    console.log(err)
    res.status(404).send(err)
})

}

const postUsers = (req,res) => {
    const user = req.body 

    user.createAt = new Date()

    userModel.create(user)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

const updateUserById = (req, res) => {

    const id = req.params.id

    const user = req.body

    user.lastUpdateAt = new Date()

    userModel.findByIdAndUpdate(id, user, {new: true})

    .then (newUser => {
        res.status(200).send(newUser)
    })
    .catch (eer => {
        console.log(err)
        res.status(500).send(err)
    })
}

const deleteUserById = (req, res) => {

    const id = req.params.id
    userModel.findByIdAndRemove(id)
    .then(user => {
        res.status(200).send("user deleted successfully")
    })
    .catch(err => {

        console.log(err)
        res.status(500).send(err)
    })
}

module.exports = {
    getUsers, 
    getUserById,
    updateUserById ,
    deleteUserById,
    postUsers,
    login,
    signup
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

// Login user and return token
exports.loginUser = async (req, res) => {
    const {username, password} = req.body;

    // Find user
    const user = await User.findOne({username})

    // Compare password
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    // If user or password are incorrect, return error
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    // Create token payload
    const payload = {
        username: user.username,
        id: user._id
    }

    const SECRET = process.env.SECRET

    // Create token
    const token = jwt.sign(
        payload,            // Payload (username and id)
        SECRET,             // Secret key
        {expiresIn: 60*60}  // Expiration time in seconds
    )

    // Return token
    res.json(
        {
            username: user.username,
            userId: user._id,
            token
        }
    )
}

// Register user
exports.registerUser = async (req, res) => {
    const {username, password} = req.body;

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user object
    const user = new User({
        username,
        passwordHash
    })

    // Save user in DB
    const savedUser = 
        await user.save()
        .catch((error) => {
            res.status(400).json({
                error: error.message
            })
        }
    )

    // Return saved user (without passwordHash)
    res.json(savedUser.username)
}

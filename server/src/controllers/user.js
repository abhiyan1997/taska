import User from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const getAllUsers = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user)
}

const loginUser = async (req, res) => {
    // Step 1: If Email Matches
    const existEmail = await User.exists({ email: req.body.email })
    // no: return "Email doesnt exist"
    if (!existEmail) {
        return res.json({ message: "User doesnt exists" })
    }
    // yes: step 2

    // Step 2: If Password Matches
    const existingUser = await User.findOne({ email: req.body.email })
    const pwCheck = await bcrypt.compare(req.body.password, existingUser.password)
    // no: return "Password doesnt matches"
    if (!pwCheck) {
        return res.json({ message: "Password doesnt match" })
    }
    // yes: step 3

    // Step 3: Generate a JWT token
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_KEY)
    // return a message and token
    return res.json({message: "You logged in successfully", token, isLoggedIn: true, user: existingUser})
}

const registerUser = async (req, res) => {
    // Step 1: Check email already exist
    const existUser = await User.exists({ email: req.body.email })
    // yes: return "Email already exists"
    if (existUser) {
        return res.status(400).json({ message: "User already exists." })
    }
    // no: Step 2

    // Step 2 : Encrypt password using bcrypt
    req.body.password = await bcrypt.hash(req.body.password, 10)

    // Step 3 : Create user in DB
    await User.create(req.body)
    return res.json({ message: "User Created Successfully." })
}

const getUserData= async (req,res)=>{
    const userData= User.findOne({email: req.body.email});
    
}

export { getAllUsers, registerUser, loginUser }
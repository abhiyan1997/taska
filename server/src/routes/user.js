import express from "express"
import { getAllUsers, loginUser, registerUser, updateProfile } from "../controllers/user.js"

const router= express.Router()

router.get('/users', getAllUsers)
router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/updateprofile', updateProfile)

export default router
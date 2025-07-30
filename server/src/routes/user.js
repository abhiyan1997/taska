import express from "express"
import { getAllUsers, registerUser } from "../controllers/user.js"

const router= express.Router()

router.get('/users', getAllUsers)

router.post('/register', registerUser)

export default router
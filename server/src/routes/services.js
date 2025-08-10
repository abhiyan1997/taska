import express from 'express'
import addServices from '../controllers/services.js'
const router= express.Router()

router.post('/addservices', addServices)

export default router


import express from 'express'
import {addServices, getServices} from '../controllers/services.js'
const router= express.Router()

router.post('/addservices', addServices)
router.get('/getservices', getServices)

export default router


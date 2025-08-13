import express from 'express'
import {addServices, getServices, getServiceById} from '../controllers/services.js'
const router= express.Router()

router.post('/addservices', addServices)
router.get('/getservices', getServices)
router.get('/getservicesbyid/:id', getServiceById)


export default router


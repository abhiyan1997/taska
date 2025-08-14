import express from 'express'
import {addAppointments, getAppointments} from '../controllers/appointments.js'
const router= express.Router()

router.post('/addappointments', addAppointments)
router.get('/getappointments', getAppointments)

export default router


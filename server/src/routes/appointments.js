import express from 'express'
import {addAppointments, completeAppointments, getAppointments} from '../controllers/appointments.js'
const router= express.Router()

router.post('/addappointments', addAppointments)
router.get('/getappointments/:id', getAppointments)
router.post('/completeappointments', completeAppointments)

export default router


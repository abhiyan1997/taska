import express from 'express'
import {addAppointments, completeAppointments, countAppointments, countHistory, getAppointments, getHistory} from '../controllers/appointments.js'
const router= express.Router()

router.post('/addappointments', addAppointments)
router.get('/getappointments/:id', getAppointments)
router.post('/completeappointments', completeAppointments)
router.get('/countappointments/:id',countAppointments)
router.get('/gethistory/:id',getHistory)
router.get('/counthistory/:id', countHistory)

export default router


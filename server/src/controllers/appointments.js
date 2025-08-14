import Appointments from "../model/appointments.js";

const addAppointments= async (req,res)=>{
    const data= await Appointments.create(req.body)
    res.status(200).json({message: "Appointment booked successfully."})
}

const getAppointments = async (req,res)=>{
    const data= await Appointments.find()
    res.status(200).json({message: data})
}

export {addAppointments, getAppointments}
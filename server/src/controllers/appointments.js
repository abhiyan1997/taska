import Appointments from "../model/appointments.js";

const addAppointments= async (req,res)=>{
    const data= await Appointments.create(req.body)
    res.status(200).json({message: "Appointment booked successfully."})
}

const getAppointments = async (req,res)=>{
    const providerId= req.params.id
    const data= await Appointments.find({providerId: providerId, isActive:true})
    res.status(200).json({message: data})
}

const completeAppointments= async (req,res)=>{
    const {id}= req.body
    await Appointments.findByIdAndUpdate(id, {isActive: false})
    res.status(200).json({message: "Appointment Completed Successfully!"})
}

const countAppointments= async(req,res)=>{
    const id= req.params.id
    const data= await Appointments.countDocuments({providerId:id, isActive:true})
    res.status(200).json({message:data})
}

const getHistory = async(req,res)=>{
    const id= req.params.id
    const data= await Appointments.find({providerId:id, isActive:false})
    res.status(200).json({message:data})
}

const countHistory= async(req,res)=>{
    const id= req.params.id
    const data= await Appointments.countDocuments({providerId:id, isActive:false})
    res.status(200).json({message:data})
}

export {addAppointments, getAppointments, completeAppointments, countAppointments, getHistory, countHistory}
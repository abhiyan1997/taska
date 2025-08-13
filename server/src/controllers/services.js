import Services from "../model/services.js";

const addServices= async (req,res)=>{
    const addData= await Services.create(req.body)
    res.status(200).json({message: "Service added successfully!!"})
}

const getServices = async(req,res)=>{
    const getData= await Services.find()
    res.status(200).json({message: getData})
}

const getServiceById = async(req,res)=>{
    const {id}= req.params
    const getData= await Services.findById(id)
    res.status(200).json({message: getData})
}



export {addServices, getServices, getServiceById}
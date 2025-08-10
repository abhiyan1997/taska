import Services from "../model/services.js";

const addServices= async (req,res)=>{
    const addData= await Services.create(req.body)
    res.status(200).json({message: "Service added successfully!!"})
}

export default addServices
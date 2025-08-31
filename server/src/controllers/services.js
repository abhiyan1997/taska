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

const searchServices = async (req,res)=>{
    const searchQuery= req.query.query
    const pageCount= req.query.page
    const data= await Services.find({title: {$regex: searchQuery, $options:'i'}}).limit(10).skip((pageCount-1)*10)
    const count = await Services.countDocuments({title: {$regex: searchQuery, $options:'i'}})
    res.status(200).json({message: data, count:count})
}

export {addServices, getServices, getServiceById, searchServices}
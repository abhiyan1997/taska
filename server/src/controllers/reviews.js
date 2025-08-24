import Reviews from "../model/reviews.js"

const submitReviews= async (req,res)=>{
    await Reviews.create(req.body)
}

const getReviews = async(req,res)=>{
    const providerId= req.params.id
    const data= await Reviews.find({providerId: providerId})
    res.status(200).json({message:data})
}
export {submitReviews, getReviews}
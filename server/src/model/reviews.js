import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewsSchema = new Schema({
    name: String,
    rating: String,
    comment:String,
    date: {
        type: Date,
        default: Date.now,
    },
    verified:{
        type: Boolean,
        default:true
    },
    providerId: String
});

const Reviews= mongoose.model('Reviews', reviewsSchema)

export default Reviews
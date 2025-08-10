import mongoose from 'mongoose';
const { Schema } = mongoose;

const servicesSchema = new Schema({
    title: String,
    description: String,
    Price: Number,
    By: String
});

const Services= mongoose.model('Services', servicesSchema)

export default Services
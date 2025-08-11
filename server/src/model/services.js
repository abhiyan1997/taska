import mongoose from 'mongoose';
const { Schema } = mongoose;

const servicesSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    by: String,
});

const Services= mongoose.model('Services', servicesSchema)

export default Services
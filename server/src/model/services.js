import mongoose from 'mongoose';
const { Schema } = mongoose;

const servicesSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    by: String,
    providerId: String,
    startDate: String,
    endDate: String,
    timeSlots: Array
});

const Services= mongoose.model('Services', servicesSchema)

export default Services
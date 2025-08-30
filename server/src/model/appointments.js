import mongoose from 'mongoose';
const { Schema } = mongoose;

const appointmentsSchema = new Schema({
    service: String,
    phonenumber: String,
    location: String,
    price: Number,
    customername: String,
    customeremail: String,
    date: Date,
    timing: String,
    providerId: String,
    isActive: {
        type: Boolean, 
        default: true
    },
});

const Appointments= mongoose.model('Appointments', appointmentsSchema)

export default Appointments
import mongoose from 'mongoose';
const { Schema } = mongoose;

const appointmentsSchema = new Schema({
    service: String,
    phonenumber: String,
    location: String,
    price: Number,
    customername: String,
    date: Date,
    timing: String,
});

const Appointments= mongoose.model('Appointments', appointmentsSchema)

export default Appointments
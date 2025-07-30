import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  location:
  {
    type: String,
    enum: ['Kathmandu'],
  },
  role:{
    type: String,
    enum: ['Customer', 'Service Provider']
  }
});

const User= mongoose.model('User', userSchema)

export default User
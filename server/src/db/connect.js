import mongoose from "mongoose"

async function connect(){
const res= await mongoose.connect('mongodb://127.0.0.1:27017/taskadb');
if(res) {
    console.log("Connected to DB")
}
}

export default connect;
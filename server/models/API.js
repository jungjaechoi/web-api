import mongoose from "mongoose";

const APISchema = new mongoose.Schema({
    apiKey: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}
})

const API = mongoose.model('API', APISchema);
export default API; 
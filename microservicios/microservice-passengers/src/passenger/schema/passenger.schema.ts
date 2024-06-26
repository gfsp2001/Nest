import * as mongoose from "mongoose";
export const PassengerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
},
    { timestamps: true }
)
PassengerSchema.index({ email: 1 }, { unique: true })
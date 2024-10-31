import { Schema, model } from "mongoose";

const transationSchema = new Schema({
    userFrom:{
        type: Schema.ObjectId,
        ref: "users"
    },
    userTo:{
        type: Schema.ObjectId,
        ref: "users"
    },
    amount:{
        type: Schema.Types.Number,
        required: true
    },
    type:{
        type: Schema.Types.String,
        enum:["TRANSFER", "DEPOSIT", "WITHDRAW"],
        required: true
    },
    status:{
        type: Schema.Types.String,
        enum:["COMPLETED", "FAILED", "PENDING"],
        required: true
    },
    currency: {
        type: Schema.Types.String,
        enum: ["BRL", "USD", "BTC"],
        required: true
    },
    details:{
        type: Schema.Types.String,
    }
},
{
    timestamps: true
});

const Transation = model("transations", transationSchema);

export default Transation;
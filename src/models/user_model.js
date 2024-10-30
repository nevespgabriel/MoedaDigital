import { Schema, model } from "mongoose";

const walletSchema = new walletSchema({
    balance:{
        type: Schema.Types.Number,
        default: 0
    },
    currency: {
        type: Schema.Types.String,
        enum: ["BRL", "USD", "BTC"]
    }
},
{
    timestamps: true
});

const userSchema = new userSchema({
    name:{
        type: Schema.Types.String,
        required: true
    },
    email:{
        type: Schema.Types.String,
        required: true,
        unique: true,
        validate:{
            validator(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            }
        }
    },
    password:{
        type: Schema.Types.String,
        required: true,
        validate:{
            validator(v){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            }
        }
    },
    walletId: walletSchema,
    role:{
        type: Schema.Types.String,
        enum: ["USER", "ADMIN"],
        required: true
    },
    isActive:{
        type: Schema.Types.Boolean,
        default: true
    },
    transations:{
        type: [Schema.ObjectId],
        ref: "transations"
    }
},
{
    timestamps: true
});

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = model("users", userSchema);

export default User;
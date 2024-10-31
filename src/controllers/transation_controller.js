import Transation from "../models/transation_model.js";
import User from "../models/user_model.js";

const storeTransfer = async(req, res) => {
    try{
        const content = req.body;
        content.userFrom = req.user._id;
        const userFrom = await User.findById(content.userFrom).exec();
        const userTo = await User.findById(content.userTo).exec();
        content.type = "TRANSFER";
        if(req.body.amount <= userFrom.walletId.balance){
            userFrom.walletId.balance += req.body.amount;
            userTo.walletId.balance += req.body.amount;
            content.status = "COMPLETED";
            const transation = await Transation.create(content);
            userFrom.transations.push(transation._id);
            userTo.transations.push(transation._id);
            save();
            res.status(201).json(transation);
        } else{
            content.status = "FAILED";
        }    
        await Transation.create(content); 
        res.status(400).sendMessage("Invalid amount.");   
    } catch(error){
        res.status(500).json(error.message);
    }
}

const storeDeposit = async(req, res) => {
    try{
        const content = req.body
        content.userFrom = req.user._id;
        content.userTo = undefined;
        userFrom = await User.findById(req.user._id);
        content.type = "DEPOSIT";
        userFrom.walletId.balance += req.body.amount;
        content.status = "COMPLETED";
        const transation = await Transation.create(content);
        userFrom.transations.push(transation._id);
        save();
        res.status(201).json(transation);
    } catch(error){
        res.status(500).json(error.message);
    }
}

const storeWithdraw = async(req, res) => {
    try{
        const content = req.body;
        content.userFrom = req.user._id;
        content.userTo = undefined;
        userFrom = await User.findById(req.user._id);
        content.type = "WITHDRAW";
        if(userFrom.walletId.balance >= content.amount){
            userFrom.walletId.balance -= req.body.amount;
            content.status = "COMPLETED";
        } else{
            content.status = "FAILED";
        }
        const transation = await Transation.create(content);
        userFrom.transations.push(transation._id);
        save();
        res.status(201).json(transation);
    } catch(error){
        res.status(500).json(error.message);
    }
}

export default{
    storeTransfer,
    storeDeposit,
    storeWithdraw
}
import Transacao from "../models/transation_model.js";

const storeTransfer = async(req, res) => {
    try{
        const content = {
            userFrom: req.body.userFrom,
            userTo: req.body.userTo,
            amount: req.body.amount, 
            type: "TRANSFER",
            currency: req.body.currency
        }
        if(req.body.amount <= userTo.walletId.balance){
            content.status = "COMPLETED";
        }
        
    } catch(error){
        res.status(500).json(error.message);
    }
}
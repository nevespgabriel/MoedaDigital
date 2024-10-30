import User from "../models/user_model.js";
import jwtService from "../services/jwt_service.js"

const signup = async(req, res) => {
    try{
        const create = User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            walletId: {
                currency: req.body.walletId.currency
            }
        });
        const token = jwtService.generateAccessToken(user);
        res.status(201).json(token);
    } catch(error){
        res.sendStatus(400).json(error.message);
    }
}

const login = async(req, res) => {
    try{
        const user = User.findOne({
            email: req.body.email,
            isStatus: true
        }).exec();
        if(user && await User.isValidPassword(req.body.password)){
            const token = jwtService.generateAccessToken(user);
            res.json(token);
        } else{
            res.status(404).json({
                error: "Email or password incorrect"
            });
        }
    } catch(error){
        res.sendStatus(400).json(error.message);
    }
}

const store = async (req, res) => {
    try{
        const content = await User.create(req.body);
        res.status(201).json(content);
    } catch(error){
        res.status(500).send(error.message);
    }
}

const index = async (req, res) => {
    try {
        const content = await User.find().exec();
        res.status(200).json(content);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const showCash = async (req, res) => {
    try{
        const content = req.user.walletId;
        res.json(content);
    } catch(error){
        res.status(500).send(error.message);
    }
}

const update = async (req, res) => {
    try{
        const content = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            walletId: {
                currency: req.body.walletId.currency,
                balance: this.balance
            }
        });
        res.status(200).json(content);
    } catch(error){
        res.status(500).send(error.message);
    }
}

const inactivateAccount = async(req, res) => {
    try{
        if(req.user){
            req.user.isActive = false;
            req.user.walletId.balance -= req.user.walletId.balance
        }
    } catch(error){
        res.status(500).send(error.message);
    }
}

const destroy = async (req, res) => {
    try{
        User.findByIdAndDelete(req.params.id);
    } catch(error){
        res.status(500).send(error.message);
    }
}

export default{
    signup, 
    login,
    store,
    index,
    showCash,
    update,
    inactivateAccount,
    destroy
}
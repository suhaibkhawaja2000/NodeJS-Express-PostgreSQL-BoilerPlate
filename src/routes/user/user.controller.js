import crypto from "crypto";
import models from "../../database/models";
import { templates } from "../../services/apiResponses";
import * as authorization from "../../services/authorization"

export const register = async (req, res) => {
    try {
        let {name,email,phone_number,age,gender,password,role}=req.body;
        //define role according to requirements
        if(!name || !email || !phone_number || !age || !gender || !password){
            return res.status(400).json({message:templates.INVALID_PARAMS})
        }
        let user = await models.User.create(
            {
                name,
                email: email.toLowerCase().trim(),
                phone_number,
                age,
                gender,
                password
            }
        )
        console.log(user)
        res.status(200).json({ message: "User created" })

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({message:templates.INTERNAL_SERVER_ERROR})
    }
}
export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        email = email.toLowerCase().trim()
        let user = await models.User.findOne({
            where: {
                email,
                password: crypto.createHash("sha256").update(password).digest("base64")
            }
        })
        if (user) {
            user = user.toJSON()
            let expiresIn = "7d"
            let jwtToken = authorization.generateToken({ id: user.id }, { expiresIn: expiresIn })
            user['token'] = jwtToken
            return res.status(200).json(user)
        }
        else {
            return res.status(404).json({ message: templates.NO_USER_FOUND })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({message:templates.INTERNAL_SERVER_ERROR})
    }
}
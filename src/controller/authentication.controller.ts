import { Request, Response } from "express";
import { registerUser, singinUserService } from "../service/authentication.service";


export const singupController = async (req: Request, res: Response) => {
    try {
        const dataInfo = req.body;
        const data  = await registerUser(dataInfo)
        if (!data) {
            return res.status(500).json({ success: false, message:'data is not coming from service' })

        }
        return res.status(201).json({success: true, message: 'User registered successfully', data})

    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })

    }

}

export const loginController = async (req: Request, res: Response) =>{
    try{
         const dataInfo = req.body;
          const data = await singinUserService(dataInfo)
        if (!data) {
            return res.status(500).json({ success: false, message:'data is not coming from service' })

        }
        return res.status(201).json({success: true, message: 'Login successful', data})


    }catch(err: any){
       return res.status(500).json({ success: false, message: err.message }) 
    }
}
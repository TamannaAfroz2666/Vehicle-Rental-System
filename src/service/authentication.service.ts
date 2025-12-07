import { error } from "console";
import { comparePassword, hashPassword, tokonGenerate } from "../handlers/hashPassword";
import { createUser, findUserByEmail } from "../model/authentication.model";
import { IUserWithToken } from "../types/user.types";


export const registerUser = async (dataInfo: any) => {
    try {
        const { name, phone, email, password, role } = dataInfo;

        const isExitsEmail = await findUserByEmail(email);
        const hash_pass = await hashPassword(password)
        if (isExitsEmail) {
            return new Error('Email already exits')
        }
        const data = await createUser({
            name,
            phone,
            email,
            hash_pass,
            role
        })
        return data
    } catch (err: any) {
        console.log('data is not entered in service', err.message)
    }
}
export const singinUserService = async (dataInfo: { email: string; password: string }):Promise<IUserWithToken | null> =>{
    try {
        const { email, password } = dataInfo;
         const user = await findUserByEmail(email);
           if(!user){
            console.log('email is already exit')
            return null
        }
         const hash_pass = await hashPassword(password)
        const viewComparePassword = await comparePassword(password, hash_pass);
        if(!viewComparePassword){
            console.log('password not stored')
            return null
        }
        const token = await tokonGenerate(user);
        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token
        }

        
    } catch (err: any) {
        console.log('data is not entered in service', err.message)
        return null;
    }
}
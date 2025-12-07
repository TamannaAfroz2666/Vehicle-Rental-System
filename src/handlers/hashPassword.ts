
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt);
    return hashPass;

}
 export async function comparePassword(password: string, hashPassword: string) {
    const compare = await bcrypt.compare(password, hashPassword)
    return compare;

}
export async function tokonGenerate(user :any) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const TOKEN_EXPIRE_IN = '1h';
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRE_IN }
    )
    return token;
}
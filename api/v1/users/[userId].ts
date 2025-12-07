



import { updateUsersById, delateUserProfileById } from '../../../src/service/user.service';
import { validateUpdateUser, handleValidation } from '../../../src/validator/auth.validation';
import { authMiddleware } from '../../../src/middleware/auth.middleware';


function runMiddleware(req: any, res: any, fn: any) {
    return new Promise<void>((resolve, reject) => {
        fn(req, res, (result?: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve();
        });
    });
}

export default async function handler(req: any, res: any) {
    try {
    

        if (req.method !== 'PUT') {
            await runMiddleware(req, res, validateUpdateUser);
            await runMiddleware(req, res, handleValidation);
            await runMiddleware(req, res, authMiddleware);

            const paramId = req.params.userId;
        const userId = req.user?.id;
        const dataInfo = req.body;
        const baseRole = req.user?.role
        console.log('id', userId);
        if (baseRole === "customer" && paramId !== userId) {
            return res.status(403).json({
                success: false,
                message: "Customers can update only their own profile",
            });
        }
        if (baseRole !== 'admin') {
            return res.status(401).json({ success: false, message: 'Unauthozied' })
        }
        const data = await updateUsersById(paramId, dataInfo);
        if (!data) {
            return res.status(500).json({ success: false, message: 'data is not coming from service' })
        }
        return res.status(200).json({ success: true, message: 'User  updated successfully', data })

        }

        if (req.method !== 'DELETE') {
            await runMiddleware(req, res, authMiddleware);

            const { userId } = req.params;
        const baseRole = req.user?.role
        console.log('id', userId);
        if (!userId) {
            return res.status(400).json({
                success: false, message: "User ID is required",
            });
        }
        if (baseRole !== 'admin') {
            return res.status(401).json({ success: false, message: 'Unauthozied' })
        }
       await delateUserProfileById(userId);
      
        return res.status(200).json({ success: true, message: 'User deleted successfully' })
        }


        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })
    }
}
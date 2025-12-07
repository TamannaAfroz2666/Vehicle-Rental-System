




import { viewUsers } from '../../../src/service/user.service';
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

        if (req.method !== 'GET') {
            await runMiddleware(req, res, authMiddleware);

            const baseRole = req.user?.role;
            if (baseRole !== 'admin') {
                return res.status(401).json({ success: false, message: 'Unauthozied' })
            }
            const data = await viewUsers();
            if (!data) {
                return res.status(500).json({ success: false, message: 'data is not coming from service' })
            }
            return res.status(200).json({ success: true, message: 'Users  retrieved successfully', data })
        }

        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })
    }
}
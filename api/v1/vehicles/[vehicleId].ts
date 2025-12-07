



import { updateVicilesById, viewVicilesWithId, delateVicilesById } from '../../../src/service/vihicles';
import { validateVehicles, handleValidation } from '../../../src/validator/auth.validation';
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
            const { vehicleId } = req.params;
            console.log('id', vehicleId)
            const data = await viewVicilesWithId(vehicleId);
            if (!data) {
                return res.status(500).json({ success: false, message: 'data is not coming from service' })
            }
            return res.status(200).json({ success: true, message: 'Vehicles retrieved successfully', data })

        }


        if (req.method !== 'PUT') {
            await runMiddleware(req, res, validateVehicles);
            await runMiddleware(req, res, handleValidation);
            await runMiddleware(req, res, authMiddleware);

            const { vehicleId } = req.params;
            const dataInfo = req.body;
            const baseRole = req.user?.role
            console.log('id', vehicleId);
            if (baseRole !== 'admin') {
                return res.status(401).json({ success: false, message: 'Unauthozied' })
            }
            const data = await updateVicilesById(vehicleId, dataInfo);
            if (!data) {
                return res.status(500).json({ success: false, message: 'data is not coming from service' })
            }
            return res.status(200).json({ success: true, message: 'Vehicle updated successfully', data })
        }

        if (req.method !== 'DELETE') {
            await runMiddleware(req, res, authMiddleware);

            const { vehicleId } = req.params;
            const baseRole = req.user?.role
            console.log('id', vehicleId);
            if (baseRole !== 'admin') {
                return res.status(401).json({ success: false, message: 'Unauthozied' })
            }
            const data = await delateVicilesById(vehicleId);
            if (!data) {
                return res.status(500).json({ success: false, message: 'data is not coming from service' })
            }
            return res.status(200).json({ success: true, message: 'Vehicle deleted successfully' })
        }


        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })
    }
}
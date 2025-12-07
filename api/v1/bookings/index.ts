




import { createBookingService } from '../../../src/service/bookings';
import { validateBooking, handleValidation } from '../../../src/validator/auth.validation';
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

        if (req.method !== 'POST') {
            await runMiddleware(req, res, validateBooking);
            await runMiddleware(req, res, handleValidation);
            await runMiddleware(req, res, authMiddleware);

           const baseRole = req.user?.role;
        const userId = req.user?.id;
        if (baseRole !== 'admin' && baseRole !== 'customer') {
            return res.status(401).json({ success: false, message: 'Unauthozied' })
        }
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid token: user id missing",
            });
        }
        const { vehicle_id, rent_start_date, rent_end_date, status } = req.body;
        const dataInfo = {
            customer_id: userId,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            status
        };

        const data = await createBookingService(dataInfo)
        if (!data) {
            return res.status(500).json({ success: false, message: 'data is not coming from service' })
        }
        return res.status(201).json({ success: true, message: 'Vehicle created successfully', data })

        }

        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })
    }
}
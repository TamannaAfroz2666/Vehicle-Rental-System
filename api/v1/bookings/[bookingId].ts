



import { viewBooking, updateBookingStatusService } from '../../../src/service/bookings';
import { validateUpdateBooking, handleValidation } from '../../../src/validator/auth.validation';
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
            const data = await viewBooking();
            if (!data) {
                return res.status(500).json({ success: false, message: 'data is not coming from service' })
            }
            return res.status(200).json({ success: true, message: 'Users  retrieved successfully', data })

        }

        if (req.method !== 'PUT') {
            await runMiddleware(req, res, validateUpdateBooking);
            await runMiddleware(req, res, handleValidation);
            await runMiddleware(req, res, authMiddleware);

            const bookingId = req.params.bookingId;
        const baseRole = req.user?.role;
        const userId = req.user?.id;
        const { status } = req.body;
        if (!userId || !baseRole) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        const data = await updateBookingStatusService(bookingId, status, {
            id: userId,
            role: baseRole,
        });
        let message = "Booking updated successfully";

        if (status === "cancelled") {
            message = "Booking cancelled successfully";
        } else if (status === "returned") {
            message = "Booking marked as returned. Vehicle is now available";
        }
        return res.status(200).json({ success: true, message, data })
        }


        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })
    }
}
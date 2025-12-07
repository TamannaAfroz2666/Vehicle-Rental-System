
import { Request, Response } from "express";
import { AuthRequest } from "../types/user.types";
import { createVihiclesService } from "../service/vihicles";
import { createBookingService, updateBookingStatusService, viewBooking } from "../service/bookings";

export const createBookingController = async (req: AuthRequest, res: Response) => {
    try {
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
    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })

    }
}

export const viewBookController = async (req: AuthRequest, res: Response) => {
    try {
        const baseRole = req.user?.role;
        if (baseRole !== 'admin') {
            return res.status(401).json({ success: false, message: 'Unauthozied' })
        }
        const data = await viewBooking();
        if (!data) {
            return res.status(500).json({ success: false, message: 'data is not coming from service' })
        }
        return res.status(200).json({ success: true, message: 'Users  retrieved successfully', data })

    } catch (eer: any) {
        return res.status(500).json({ success: false, message: eer.message })
    }

}

export const updateBookingById = async (req: AuthRequest, res: Response) => {
    try {
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

    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })

    }
};


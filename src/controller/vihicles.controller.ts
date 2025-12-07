import { Request, Response } from "express";
import { createVihiclesService, delateVicilesById, updateVicilesById, viewViciles, viewVicilesWithId } from "../service/vihicles";
import { AuthRequest, IAuthUser, IVehicle } from "../types/user.types";
export const createVihiclesController = async (req: AuthRequest, res: Response) => {
    try {
        const dataInfo = req.body;
        const baseRole = req.user?.role;
        if (baseRole !== 'admin') {
            return res.status(401).json({ success: false, message: 'Unauthozied' })
        }
        const data = await createVihiclesService(dataInfo)
        if (!data) {
            return res.status(500).json({ success: false, message: 'data is not coming from service' })
        }
        return res.status(201).json({ success: true, message: 'Vehicle created successfully', data })
    } catch (err: any) {
        return res.status(500).json({ success: false, message: err.message })

    }
}
export const viewVihiclesController = async (req: Request, res: Response) => {
    try {
        const data = await viewViciles();
        if (!data) {
            return res.status(500).json({ success: false, message: 'data is not coming from service' })
        }
        return res.status(200).json({ success: true, message: 'Vehicles retrieved successfully', data })

    } catch (eer: any) {
        return res.status(500).json({ success: false, message: eer.message })
    }

}

export const viewVihiclesWithId = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        console.log('id', vehicleId)
        const data = await viewVicilesWithId(vehicleId);
        if (!data) {
            return res.status(500).json({ success: false, message: 'data is not coming from service' })
        }
        return res.status(200).json({ success: true, message: 'Vehicles retrieved successfully', data })

    } catch (eer: any) {
        return res.status(500).json({ success: false, message: eer.message })
    }

}

export const updateVihiclesWithId = async (req: AuthRequest, res: Response) => {
    try {
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

    } catch (eer: any) {
        return res.status(500).json({ success: false, message: eer.message })
    }

} 


export const deleteVihiclesById = async (req: AuthRequest, res: Response) => {
    try {
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

    } catch (eer: any) {
        return res.status(500).json({ success: false, message: eer.message })
    }

} 
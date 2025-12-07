import { Request, Response } from "express";
import { AuthRequest } from "../types/user.types";
import { delateUserProfileById, updateUsersById, viewUsers } from "../service/user.service";

export const viewUsersController = async (req: AuthRequest, res: Response) => {
    try {
        const baseRole = req.user?.role;
        if (baseRole !== 'admin') {
            return res.status(401).json({ success: false, message: 'Unauthozied' })
        }
        const data = await viewUsers();
        if (!data) {
            return res.status(500).json({ success: false, message: 'data is not coming from service' })
        }
        return res.status(200).json({ success: true, message: 'Users  retrieved successfully', data })

    } catch (eer: any) {
        return res.status(500).json({ success: false, message: eer.message })
    }

}


export const updateUserById = async (req: AuthRequest, res: Response) => {
    try {
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

    } catch (eer: any) {
        return res.status(500).json({ success: false, message: eer.message })
    }

}


export const deleteUserById = async (req: AuthRequest, res: Response) => {
    try {
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

    } catch (eer: any) {
        return res.status(500).json({ success: false, message: eer.message })
    }

} 
import { findUserByEmail } from "../model/authentication.model";
import { deleteUserByIdModel, getUsers, updateUserIdModel, userHasActiveBookings } from "../model/users.model";
import { getVihicles } from "../model/vihicles.model";
import { ICreateVehicleInput, IUser } from "../types/user.types";

export const viewUsers = async () => {
    try {
        const data = await getUsers();
        if (!data) {
            console.log('data is not entered from db', data)

        }
        return data;
    } catch (err: any) {
        console.log('data is not entered in service', err.message)

    }
}


export const updateUsersById = async (id: string, dataInfo: IUser) => {
    try {

        const { name, phone, email, role } = dataInfo;
        const isExitsEmail = await findUserByEmail(email);
        if (isExitsEmail) {
            throw new Error("Email is  already exists");
        }

        const data = await updateUserIdModel({
            name,
            email,
            phone,
            role,

        }, id);
        if (!data) {
            console.log('data is not entered from db', data)

        }
        return data;
    } catch (err: any) {
        console.log('data is not entered in service', err.message)

    }
}

export const delateUserProfileById = async (userId: string) => {
    try {
        const hasActive = await userHasActiveBookings(userId);
        if (hasActive) {
            throw new Error("User cannot be deleted while having active bookings");
        }
        const deleteData = await deleteUserByIdModel(userId)
        if (!deleteData) {
            console.log('data is not entered from db', deleteData)

        }
        return deleteData;
    } catch (er: any) {
        console.log('data is not entered in service', er.message)

    }
}

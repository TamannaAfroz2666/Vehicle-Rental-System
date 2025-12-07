import { createVihicles, deleteVihiclesById, findRegistrationNumber, getVihicles, getVihiclesWithId, updateVihiclesWithId } from "../model/vihicles.model";
import { ICreateVehicleInput, IVehicle, } from "../types/user.types";

export const createVihiclesService = async (dataInfo: ICreateVehicleInput) => {
    try {
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status = 'available' } = dataInfo;

        const isExitsRSnumber = await findRegistrationNumber(registration_number);
        if (isExitsRSnumber) {
            throw new Error("Registration number already exists");
        }
        const vehicle = await createVihicles({
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status
        });
        return vehicle;
    } catch (err: any) {
        console.log('data is not entered in service', err.message)
    }
}

export const viewViciles = async () => {
    try {
        const data = await getVihicles();
        if (!data) {
            console.log('data is not entered from db', data)

        }
        return data;
    } catch (err: any) {
        console.log('data is not entered in service', err.message)

    }
}

export const viewVicilesWithId = async (id: string) => {
    try {
        const data = await getVihiclesWithId(id);
        if (!data) {
            console.log('data is not entered from db', data)

        }
        return data;
    } catch (err: any) {
        console.log('data is not entered in service', err.message)

    }
}

export const updateVicilesById = async (id: string, dataInfo: ICreateVehicleInput) => {
    try {

        const { vehicle_name, type, registration_number, daily_rent_price, availability_status = 'available' } = dataInfo;
        const isExitsRSnumber = await findRegistrationNumber(registration_number);
        if (isExitsRSnumber) {
            throw new Error("Registration number already exists");
        }

        const data = await updateVihiclesWithId({
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status

        }, id);
        if (!data) {
            console.log('data is not entered from db', data)

        }
        return data;
    } catch (err: any) {
        console.log('data is not entered in service', err.message)

    }
}

export const delateVicilesById = async (vehicleId: string)=> {
    try {
        const deleteData = await deleteVihiclesById(vehicleId)
        if (!deleteData) {
            console.log('data is not entered from db', deleteData)

        }
        return deleteData;
    } catch (er: any) {
        console.log('data is not entered in service', er.message)

    }
}
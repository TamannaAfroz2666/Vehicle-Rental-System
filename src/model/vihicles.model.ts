import { promises } from "dns";
import { pool } from "../config/db";
import { ICreateVehicleInput, IVehicle } from "../types/user.types";

export async function createVihicles({
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status
}: ICreateVehicleInput): Promise<IVehicle> {
    const query = `
    INSERT INTO vehicles (vehicle_name,type, registration_number, daily_rent_price, availability_status)
    VALUES ($1, $2,$3, $4, $5)
     RETURNING *;
    `;
    const values = [vehicle_name, type, registration_number, daily_rent_price, availability_status];
    const { rows } = await pool.query(query, values);
    return rows[0]

}

export async function findRegistrationNumber(registration_number: string) {
    const selectQuery = `SELECT registration_number FROM vehicles WHERE registration_number= $1`;
    const { rows } = await pool.query(selectQuery, [registration_number]);
    return rows[0]

}
export async function getVihicles(): Promise<IVehicle[]> {
    const selectAll = `SELECT * FROM vehicles`
    const { rows } = await pool.query(selectAll)
    return rows;

}
export async function getVihiclesWithId(id: string): Promise<IVehicle[]> {
    const selectAll = `SELECT * FROM vehicles WHERE id = $1`

    const { rows } = await pool.query(selectAll, [id])
    return rows;

}
export async function updateVihiclesWithId({ vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status

}: ICreateVehicleInput, id: string,): Promise<IVehicle[]> {
    const updateAll = `UPDATE  vehicles 
    SET 
    vehicle_name =$1,
    type= $2,
    registration_number= $3,
    daily_rent_price=$4,
    availability_status=$5
    
    WHERE id = $6
    RETURNING *
    `
    const values = [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]

    const { rows } = await pool.query(updateAll, values)
    return rows[0];

}
export async function deleteVihiclesById(vehicleId: string){
    try {
        const deleteRow = `DELETE FROM vehicles WHERE id =$1::uuid
`
        const delateRow = await pool.query(deleteRow, [vehicleId])
        return delateRow.rowCount;


    } catch (err: any) {
        console.log('data is not entered in model', err.message)
        

    }

}
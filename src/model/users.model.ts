import { pool } from "../config/db";
import { ICreateIUserInput, IUser, IVehicle } from "../types/user.types";

export async function getUsers(): Promise<IUser[]> {
    const selectAll = `SELECT * FROM users`
    const { rows } = await pool.query(selectAll)
    return rows;

}

export async function updateUserIdModel({ 
    name,
    email,
    phone,
    role,

}: ICreateIUserInput, id: string,): Promise<IUser[]> {
    const updateAll = `UPDATE  users 
    SET 
    name =$1,
    email= $2,
    phone= $3,
    role=$4
    WHERE id = $5
    RETURNING *
    `
    const values = [name, email, phone, role, id]

    const { rows } = await pool.query(updateAll, values)
    return rows[0];

}

export async function userHasActiveBookings(userId: string): Promise<boolean> {
  const query = `
    SELECT COUNT(*)::int AS count
    FROM bookings
    WHERE customer_id = $1::uuid
      AND status = 'active';
  `;

  const { rows } = await pool.query(query, [userId]);
  const count = rows[0]?.count ?? 0;
  return count > 0;
}

export async function deleteUserByIdModel(userId: string) {
  const query = `
    DELETE FROM users
    WHERE id = $1::uuid;
  `;
  const result = await pool.query(query, [userId]);
  return result.rowCount; 
}
import { pool } from "../config/db";

export async function findUserByEmail(email: string) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0]

}
export interface CreateUserInput {
  name: string;
  phone: string;
  email: string;
  hash_pass: string;   
  role: "customer"| "admin";  
}
export async function createUser({
    name,
    phone,
    email,
    hash_pass,
    role
}: CreateUserInput) {
    const query = `
    INSERT INTO users (name,phone, email, password, role)
    VALUES ($1, $2,$3, $4, $5)
     RETURNING *;
    `;
    const values = [name, phone,  email, hash_pass, role];
    const { rows } = await pool.query(query, values);
    return rows[0]

}


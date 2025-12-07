import { pool } from "../config/db";
import { IBooking, ICreateBookingDBInput, ICreateBookingInput, StatusBookingType } from "../types/user.types";

// 🆕 NEW — get vehicle info for booking
export async function findVehicleForBooking(
    vehicleId: string
) {
    const query = `
    SELECT *
    FROM vehicles
    WHERE id = $1::uuid
      AND availability_status = 'available'
  `;

    const { rows } = await pool.query(query, [vehicleId]);
    return rows[0] || null;
}

// 🆕 NEW — update vehicle status


export async function markVehicleAsBooked(vehicleId: string): Promise<void> {
    const query = `
    UPDATE vehicles
    SET availability_status = 'booked'
    WHERE id = $1::uuid
  `;
    await pool.query(query, [vehicleId]);
}


export async function createBooking({
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status
}: ICreateBookingDBInput): Promise<IBooking> {
    const query = `
    INSERT INTO bookings (  customer_id, vehicle_id,rent_start_date, rent_end_date, total_price, status)
    VALUES ($1, $2,$3, $4, $5, $6)
     RETURNING *;
    `;
    const values = [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status];
    const { rows } = await pool.query(query, values);
    return rows[0]

}

export async function getBookingInfo(): Promise<IBooking[]> {
    const selectAll = `SELECT * FROM bookings`
    const { rows } = await pool.query(selectAll)
    return rows;

}
export async function findBookingById(bookingId: string): Promise<IBooking | null> {
  const query = `
    SELECT *
    FROM bookings
    WHERE id = $1::uuid
  `;
  const { rows } = await pool.query(query, [bookingId]);
  return rows[0] || null;
}

export async function updateBookingStatusModel(
  bookingId: string,
  status: StatusBookingType
): Promise<IBooking | null> {
  const query = `
    UPDATE bookings
    SET status = $1,
        updated_at = NOW()
    WHERE id = $2::uuid
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [status, bookingId]);
  return rows[0] || null;
}

export async function markVehicleAsAvailable(vehicleId: string): Promise<void> {
  const query = `
    UPDATE vehicles
    SET availability_status = 'available'
    WHERE id = $1::uuid
  `;
  await pool.query(query, [vehicleId]);
}
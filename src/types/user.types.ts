import { Request } from "express";
export type UserRole = 'customer' | 'admin';
export type VehicleAvailability = "available" | "booked";
export type VehicleType = "car" | "bike" | "van" | "SUV";
export type StatusBookingType = "active" | "cancelled" | "returned";
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  created_at: Date;
}
export interface ICreateIUserInput {
  name: string;
  email: string;
  phone: string;
  role: UserRole;


}

////
export interface IVehicle {
  id: string;
  vehicle_name: string;
  type: VehicleType;
  registration_number: string;
  daily_rent_price: number;
  availability_status: VehicleAvailability;
  created_at: Date;
  updated_at: Date;
}
export interface ICreateVehicleInput {
  vehicle_name: string;
  type: VehicleType;
  registration_number: string;
  daily_rent_price: number;
  availability_status?: VehicleAvailability;
}

//
export interface IBooking {
  id: string;
  customer_id: string,
  vehicle_id: string,
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  status: StatusBookingType,
  created_at: Date;
  updated_at: Date;
}
export interface ICreateBookingInput {
  customer_id: string;
  vehicle_id: string;
  rent_start_date: string;
  rent_end_date: string;
  status: StatusBookingType,
}
export interface ICreateBookingDBInput {
  customer_id: string;
  vehicle_id: string;
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  status: StatusBookingType;
}

export interface IBookingWithVehicle extends IBooking {
  vehicle: {
    vehicle_name: string;
    daily_rent_price: number;
  };
}
///

export interface IUserWithToken {
  id: string;
  email: string;
  phone: string;
  role: string;
  token: string;
}
export interface IAuthUser {
  id: string;
  email: string;
  phone: string;
  role: string;
}
export interface AuthRequest extends Request {
  user?: IAuthUser;
}
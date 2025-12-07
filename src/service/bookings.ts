import { createBooking, findBookingById, findVehicleForBooking, getBookingInfo, markVehicleAsAvailable, markVehicleAsBooked, updateBookingStatusModel } from "../model/bookings.model";
import { IBookingWithVehicle, ICreateBookingInput, ICreateVehicleInput, StatusBookingType } from "../types/user.types";


export const createBookingService = async (dataInfo: ICreateBookingInput): Promise<IBookingWithVehicle> => {
    try {
        const { customer_id, vehicle_id, rent_start_date, rent_end_date, status = 'active' } = dataInfo;

        const vehicle = await findVehicleForBooking(vehicle_id);

        console.log('vihicle is herr', vehicle)
        if (!vehicle) {
            throw new Error("Vehicle not found or not available");
        }
        const start = new Date(rent_start_date);
        const end = new Date(rent_end_date);

        if (end <= start) {
            throw new Error("Rent end date greater than start date");
        }
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffDays = Math.ceil((end.getTime() - start.getTime()) / msPerDay);
        const total_price = Number(
            (diffDays * vehicle.daily_rent_price).toFixed(2)
        );
        const booking = await createBooking({
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            total_price,
            status
        });
        await markVehicleAsBooked(vehicle_id);

        const bookingWithVehicle: IBookingWithVehicle = {
            ...booking,
            vehicle: {
                vehicle_name: vehicle.vehicle_name,
                daily_rent_price: vehicle.daily_rent_price,
            },
        };
        return bookingWithVehicle;

    } catch (err: any) {
        console.log('data is not entered in service', err.message)
        throw err
    }
}

export const viewBooking = async () => {
    try {
        const data = await getBookingInfo();
        if (!data) {
            console.log('data is not entered from db', data)

        }
        return data;
    } catch (err: any) {
        console.log('data is not entered in service', err.message)

    }
}



export const updateBookingStatusService = async ( bookingId: string, status: StatusBookingType, currentUser: { id: string; role: string }
): Promise<any> => {
  try {
    const booking = await findBookingById(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    const now = new Date();

    if (currentUser.role === "customer") {
      if (booking.customer_id !== currentUser.id) {
        throw new Error("Customers can cancel only their own bookings");
      }

      if (status !== "cancelled") {
        throw new Error('Customers can only set status to "cancelled"');
      }

      if (new Date(booking.rent_start_date) <= now) {
        throw new Error("You can cancel only before the rent start date");
      }

      if (booking.status !== "active") {
        throw new Error("Only active bookings can be cancelled");
      }

      const updated = await updateBookingStatusModel(bookingId, "cancelled");
      return {
        message: "Booking cancelled successfully",
        data: updated,
      };
    }
    if (currentUser.role === "admin") {
      if (status !== "returned") {
        throw new Error('Admin can only set status to "returned" here');
      }

      if (booking.status === "returned") {
        throw new Error("Booking is already marked as returned");
      }

      const updated = await updateBookingStatusModel(bookingId, "returned");
      await markVehicleAsAvailable(booking.vehicle_id);

      return {
          ...updated,
          vehicle: {
            availability_status: "available",
          },
      };
    }
    throw new Error("Unauthorized role for updating booking status");
  } catch (err: any) {
    console.log("data is not entered in service", err?.message);
    throw err;
  }
};
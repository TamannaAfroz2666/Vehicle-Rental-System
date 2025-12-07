import  express  from "express";
import { handleValidation, validateBooking, validateRegistration, validateUpdateBooking, validateUpdateUser, validateVehicles } from "../validator/auth.validation";
import { createVihiclesController, deleteVihiclesById, updateVihiclesWithId, viewVihiclesController, viewVihiclesWithId } from "../controller/vihicles.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { deleteUserById, updateUserById, viewUsersController } from "../controller/users.controller";
import { createBookingController, updateBookingById, viewBookController } from "../controller/bookings.controller";

export const route = express.Router();
route.post('/vehicles', validateVehicles, handleValidation, authMiddleware, createVihiclesController)
route.get('/vehicles', viewVihiclesController)
route.get('/vehicles/:vehicleId', viewVihiclesWithId);
route.put('/vehicles/:vehicleId', validateVehicles, handleValidation,authMiddleware, updateVihiclesWithId);
route.delete('/vehicles/:vehicleId',authMiddleware, deleteVihiclesById);

route.get('/users', authMiddleware, viewUsersController)
route.put('/users/:userId', validateUpdateUser, handleValidation,authMiddleware, updateUserById);
route.delete('/users/:userId',authMiddleware, deleteUserById);

route.post('/bookings', validateBooking, handleValidation, authMiddleware, createBookingController);
route.get('/bookings', authMiddleware, viewBookController);

route.put('/bookings/:bookingId', validateUpdateBooking, handleValidation, authMiddleware, updateBookingById);

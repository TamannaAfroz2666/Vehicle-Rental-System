import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { JwtPayload } from "jsonwebtoken";

export const validateRegistration = [
    body('name')
        .trim()
        .notEmpty().withMessage('name is required')
        .isLength({ min: 1, max: 100 })
        .withMessage(' Name must be between 1 and 100 characters '),
    body('phone')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .matches(/^[0-9]{10,20}$/)
        .withMessage('Mobile number must contain only digits (10–20 numbers)'),

    body('email')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 100 })
        .withMessage('Password must be between 6 and 100 characters'),

    body('role')
        .optional()
        .isIn(['customer', 'admin'])
        .withMessage('Role must be one of: customer, admin'),


];

export const validateUpdateUser = [
    body('name')
        .trim()
        .notEmpty().withMessage('name is required')
        .isLength({ min: 1, max: 100 })
        .withMessage(' Name must be between 1 and 100 characters '),
    body('phone')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .matches(/^[0-9]{10,20}$/)
        .withMessage('Mobile number must contain only digits (10–20 numbers)'),

    body('email')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),


    body('role')
        .optional()
        .isIn(['customer', 'admin'])
        .withMessage('Role must be one of: customer, admin'),


];




export const valdateLogin = [
    body('email')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 100 })
        .withMessage('Password must be between 6 and 100 characters'),
]

export const validateVehicles = [

    body("vehicle_name")
        .trim()
        .notEmpty()
        .withMessage("Vehicle name is required")
        .isLength({ min: 1, max: 100 })
        .withMessage("Vehicle name must be between 1 and 100 characters"),
    body("type")
        .trim()
        .notEmpty()
        .withMessage("Vehicle type is required")
        .isIn(["car", "bike", "van", "SUV"])
        .withMessage("Vehicle type must be one of: car, bike, van, SUV"),
    body("registration_number")
        .trim()
        .notEmpty()
        .withMessage("Registration number is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Registration number must be between 3 and 50 characters")
        .matches(/^[A-Za-z0-9\- ]+$/)
        .withMessage("Registration number letters, numbers, spaces and dashes only"),
    body("daily_rent_price")
        .notEmpty()
        .withMessage("Daily rent price is required")
        .isFloat({ gt: 0 })
        .withMessage("Daily rent price must be a positive number"),
    body("availability_status")
        .optional()
        .isIn(["available", "booked"])
        .withMessage("Availability status must be one of: available, booked"),
];

export const validateBooking = [
    body("rent_start_date")
        .notEmpty()
        .withMessage("Rent start date is required")
        .isISO8601()
        .withMessage("Rent start date must be a valid date (YYYY-MM-DD)"),
    
    body("rent_end_date")
        .notEmpty()
        .withMessage("Rent end date is required")
        .isISO8601()
        .withMessage("Rent end date must be a valid date (YYYY-MM-DD)"),
    body("status")
        .optional()
        .isIn(["active", "cancelled", "returned"])
        .withMessage("Status must be one of: active, cancelled, returned"),
];

export const validateUpdateBooking = [
    body("status")
        .optional()
        .isIn(["active", "cancelled", "returned"])
        .withMessage("Status must be one of: active, cancelled, returned"),
];



export const handleValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log('see errr', errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(arr => ({
                field: (arr as any).path ?? (arr as any).param,
                message: arr.msg
            }))
        })
    }
    next()

}
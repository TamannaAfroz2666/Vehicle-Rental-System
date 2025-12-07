Vehicle Rental System
------------------------------
Project Overview
This is a backend API for a vehicle rental service built with Node.js, Express, TypeScript and PostgreSQL.  
It provides secure, role-based access for Admins and Customers to manage vehicles, customers and bookings.

Vehicles:Admin manages vehicle inventory; system auto-updates availability when booked/returned.
Customers: Users manage their own profile; admins manage all customers; cannot delete users with active bookings.
Bookings: Customers rent vehicles; system auto-calculates total price and updates booking status (`active`, `cancelled`, `returned`).
Authentication: JWT-based login with role-based access control (Admin & Customer).


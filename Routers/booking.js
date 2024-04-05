import express from "express";
import {authenticate,restrict } from "../auth/verifyToken.js";
import { createBooking, getAllBookings,updatIsApproved} from "../Controllers/bookingController.js";


const router = express.Router();

router.get("/",getAllBookings)
router.post("/checkout-session/:doctorId",authenticate,restrict(['patient']),createBooking);
router.put("/:id",authenticate,updatIsApproved);


export default router
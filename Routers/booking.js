import express from "express";
import {authenticate,restrict } from "../auth/verifyToken.js";
import { createBooking, deleteBooking, getAllBookings,getOneBookings,updatIsApproved} from "../Controllers/bookingController.js";


const router = express.Router();

router.get("/getAllBookings",getAllBookings)
router.get("/:bookingId",getOneBookings)
router.delete("/:id",deleteBooking)
router.post("/checkout-session/:doctorId",authenticate,restrict(['patient']),createBooking);
router.put("/:id",authenticate,updatIsApproved);


export default router
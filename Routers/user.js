import express from "express";

import {updateUser, deleteUser, getSingleUser, getAllUser,getUserProfile,getMyAppointments } from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/",authenticate,restrict(['admin']) ,getAllUser);
router.get("/:id",authenticate,restrict(['patient','admin']) ,getSingleUser);
router.delete("/:id",authenticate,restrict(['patient','admin']) ,deleteUser);
router.put("/:id",authenticate,restrict(['patient','admin']) ,updateUser);
router.get("/profile/me",authenticate,restrict(['patient','admin']) ,getUserProfile);
router.get("/appointments/my-appointments",authenticate,restrict(['patient','admin']) ,getMyAppointments);


export default router;
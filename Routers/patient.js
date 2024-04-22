import express from "express";
import {authenticate,restrict } from "../auth/verifyToken.js";
import { createPatient, getPatient} from "../Controllers/patientController.js";


const router = express.Router();

router.get("/getPatient/:userId",getPatient)
router.post("/:userId",authenticate,restrict(['doctor']),createPatient);
// router.put("/:id",authenticate,updatIsApproved);


export default router
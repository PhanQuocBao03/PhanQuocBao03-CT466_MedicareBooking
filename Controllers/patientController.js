import Patient from "../models/PatientSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const getPatient = async (req, res) => {
    try {
        const userId = req.params.userId; // Lấy ID của bệnh nhân từ params
        const patient = await Patient.findOne({ user: userId }).populate('user').populate('doctor','name specialization').select('-password');;
        
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({ success: true, message: "Patient found", data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
export const createPatient = async (req, res) => {
    try {
        const {userId} = req.params;
        const { doctorId, dateOfExamination, symptoms, diagnosis, medications, additionalInstructions, notes } = req.body;

        // Tạo một bệnh án mới với thông tin được cung cấp
        const medicalRecord = await Patient.create({
            doctor: doctorId,
            user: userId,
            dateOfExamination,
            symptoms,
            diagnosis,
            medications,
            additionalInstructions,
            notes
        });

        return res.status(201).json({ success: true, message: 'Medical record created successfully', data: medicalRecord });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to create medical record', error: error.message });
    }
};
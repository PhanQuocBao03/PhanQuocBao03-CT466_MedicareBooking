import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
          required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
        dateOfExamination: {
          type: Date,
          required: true
        },
        symptoms: {
          type: String,
          required: true
        },
        diagnosis: {
          type: String,
          required: true
        },
        medications: [String],
        additionalInstructions: String,
        notes: String
      },
      { timestamps: true }
);
patientSchema.pre(/^find/,function(next){
  this.populate('user').populate({
    path:'doctor',
    select:'name'
  });
  next();
})
export default mongoose.model("Patient", patientSchema);

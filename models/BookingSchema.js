import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
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
    // appointmentDate: {
    //     type: Date,
    //     required: true
    // },
    selectedDate: {
        type: Date, // Thêm trường selectedDate kiểu Date
        required: true
    },
    selectedTime: {
      type: String, // Trường này có thể được lưu dưới dạng chuỗi với định dạng thời gian mong muốn, chẳng hạn '09:00 AM'
      required: true
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },

  { timestamps: true }
);
bookingSchema.pre(/^find/,function(next){
  this.populate('user').populate({
    path:'doctor',
    select:'name'
  });
  next();
})
export default mongoose.model("Booking", bookingSchema);

// Import Booking model
import Booking from "../models/BookingSchema.js";

// Controller to handle booking creation
export const createBooking = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { userId, selectedDate, selectedTime } = req.body;
        
        // Kiểm tra xem đã có lịch hẹn cho ngày và thời gian đã chọn chưa
        const existingBooking = await Booking.findOne({user:userId, doctor: doctorId, selectedDate });
        if (existingBooking) {
            return res.status(400).json({ success: false, message: 'Booking already exists for this date and time' });
        }

        // Tạo một bản ghi lịch hẹn mới trong cơ sở dữ liệu
        const booking = new Booking({
            doctor: doctorId,
            user: userId,
            selectedDate: selectedDate,
            selectedTime: selectedTime
        });
        await booking.save();
        

        // Trả về thông báo thành công và thông tin lịch hẹn
        res.status(201).json({ success: true, message: 'Booking successfully created',data: booking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ success: false, message: 'An error occurred while creating booking' });
    }
};

// Controller to get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching bookings' });
    }
};


export const getOneBookings = async (req, res) => {
    try {
        const bookingId = req.params.bookingId; // Assuming the parameter is named bookingId
        const booking = await Booking.findOne({ _id: bookingId });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching booking' });
    }
};
export const deleteBooking = async (req,res)=>{
    const id = req.params.id;

    try {
        const deleteBooking = await Booking.findByIdAndDelete(
            id,
        ).select('-password');
        res.status(200).json({success:true,message:"Successfully deleted",data: deleteBooking});
    } catch (error) {
        res.status(500).json({success:false,message:"Failed delete"});
        
    }
};
export const updatIsApproved = async (req,res)=>{
    const id = req.params.id;

    try {
        const updateBooking = await Booking.findByIdAndUpdate(
            id,{$set: req.body},{new:true}
        ).select('-password');
        res.status(200).json({success:true,message:"Successfully updated",data: updateBooking});
    } catch (error) {
        res.status(500).json({success:false,message:"Failed updated"});
        
    }
};


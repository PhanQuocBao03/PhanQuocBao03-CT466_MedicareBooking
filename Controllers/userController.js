import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js"
import Doctor from "../models/DoctorSchema.js"

// import express from "express";

export const updateUser = async (req,res)=>{
    const id = req.params.id;

    try {
        const updateUser = await User.findByIdAndUpdate(
            id,{$set: req.body},{new:true}
        ).select('-password');
        res.status(200).json({success:true,message:"Successfully updated",data: updateUser});
    } catch (error) {
        res.status(500).json({success:false,message:"Failed updated"});
        
    }
};
export const deleteUser = async (req,res)=>{
    const id = req.params.id;

    try {
        const deleteUser = await User.findByIdAndDelete(
            id,
        ).select('-password');
        res.status(200).json({success:true,message:"Successfully deleted",data: deleteUser});
    } catch (error) {
        res.status(500).json({success:false,message:"Failed delete"});
        
    }
};
export const getSingleUser = async (req,res)=>{
    const id = req.params.id;

    try {
        const user = await User.findById(
            id
        ).select('-password');
        res.status(200).json({success:true,message:"User found",data: user});
    } catch (error) {
        res.status(404).json({success:false,message:"No user found"});
        
    }
};
export const getAllUser = async (req,res)=>{
    // const id = req.params.id;

    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({success:true,message:"Users found",data: users});
    } catch (error) {
        res.status(404).json({success:false,message:"Not found"});
        
    }
};

export const getUserProfile = async(req, res)=>{
    const userId = req.userId;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({success: false, message:"User not found"});
        };

        const {password, ... rest} =user._doc;

        res.status(200).json({success: true, message: "Profile info is getting", data:{...rest}})
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong, cannot get"});
        
    }
};

export const getMyAppointments = async(req,res)=>{
    try {
        const bookings = await Booking.find({user: req.userId});

        const doctorId = await bookings.map(el=>el.doctor.id);

        const doctors = await Doctor.find({_id: {$in:doctorId}}).select('-password');

        res.status(200).json({success: true, message: "Appointment info is getting", data:{bookings,doctors}})

        
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong, cannot get"});
        
    }
};
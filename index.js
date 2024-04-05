import express  from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from './Routers/auth.js';
import userRoute from './Routers/user.js';
import doctorRoute from './Routers/doctor.js';
import reviewRoute from './Routers/review.js';
import bookingRoute from "./Routers/booking.js"


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
};

app.get("/", (req, res) => {
    res.send("API đang hoạt động");
});
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Kết nối cơ sở dữ liệu MongoDB thành công");
    } catch (error) {
        console.error("Kết nối cơ sở dữ liệu MongoDB thất bại:");
        // process.exit(1); // Thoát ứng dụng nếu không thể kết nối với MongoDB
    }
};

// connectDB(); // Gọi hàm connectDB để thiết lập kết nối với MongoDB

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings',bookingRoute);


app.listen(port, () => {
    connectDB();
    console.log("Server đang chạy trên cổng " + port);
});

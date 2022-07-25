const express =  require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const hotelRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
dotenv.config();




const connect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB ga ulandi")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected");
})
mongoose.connection.on("connected", ()=> {
    console.log("mongoDB connected");
})

//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json());

//routes
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-CSRF-Token');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Что то не так...";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});


app.listen (5015, () => {
    connect()
    console.log("Backend ishga tushdi, 5015 Port ulandi... ");
})
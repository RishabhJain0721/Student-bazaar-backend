import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
// import cron from "node-cron";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 5000;
const PASSWORD = process.env.PASS;

// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://studentbazaar.in');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

app.use("/", routes);

// Schedule the cleanup task to run every minute
// cron.schedule("* * * * *", async () => {
//   const fiveMinutesAgo = new Date();
//   fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

//   // Find unverified user records created more than 5 minutes ago
//   const unverifiedUsers = await User.find({
//     isVerified: false,
//     createdAt: { $lt: fiveMinutesAgo },
//   });

//   console.log("Users going to be deleted : ", unverifiedUsers);
//   // Delete unverified user records
//   await User.deleteMany({
//     _id: { $in: unverifiedUsers.map((user) => user._id) },
//   });

//   console.log("Cleanup task completed.");
// });

mongoose
  .connect(
    // `mongodb+srv://rishujain0721:${PASSWORD}@cluster0.diqnynf.mongodb.net/ecommerce`
    `mongodb+srv://rishujain0721:${PASSWORD}@cluster0.ablq41v.mongodb.net/studentBazaar`
  )
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

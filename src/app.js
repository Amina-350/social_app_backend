const express = require("express");
const dbconnection = require("./Utilty/dbconnection");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const UserRoute = require("./Routes/UserRoute");
const vedioRoute=require('./Routes/VedioRoute');

dotenv.config();

app.use((req, res, next) => {
  // Only parse body for methods that can have one
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});


app.use(express.urlencoded({ extended: true }));

// Passport config
require("./Auth/google");

// Middleware
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

dbconnection();

// Routes
app.use("/api/user", UserRoute);
app.use("/api/vedio", vedioRoute);

// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Google login successful",
      user: req.user,
    });
  }
);

// Test routes
app.get("/api/usera", (req, res) => {
  res.send("hello");
});

// app.post("/test", (req, res) => {
//   try {
//     const data = req.body;

//     if (!data || Object.keys(data).length === 0) {
//       throw new Error("Request body is empty");
//     }

//     res.status(201).json({
//       message: "POST request received successfully",
//       receivedData: data,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Something went wrong",
//     });
//   }
// });

module.exports = app;

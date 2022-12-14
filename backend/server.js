// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import colors from "colors";
// import path from "path";

// import noteRoutes from "./routes/noteRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// dotenv.config();

// connectDB();

// const app = express(); // main thing

// app.use(express.json()); // to accept json data

// app.use("/api/notes", noteRoutes);
// app.use("/api/users", userRoutes);

// // --------------------------deployment------------------------------
// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }
// // --------------------------deployment------------------------------

// // Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
//       .bold
//   )
// );

const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get('/',(req,res) => {
    res.send("API is running...")
});

// This was a get function for all of the notes
app.get('/api/notes',(req,res) => {
    res.json(notes)
})

// Now we try to create api for a single note

app.get('/api/notes/:id',(req,res)=>{
    const note=notes.find((n)=>n._id===req.params.id);
    // The way we can fetch the Id from our URL is by the use of Params, req.Params brings all of the paramters that we have inside of our ID.
   // console.log(req.params);

    res.send(note);
});

// Dotenv - contains all the secret information related to our application , for eg - API key, database userid and password.
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

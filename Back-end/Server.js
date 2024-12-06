const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors()); 
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/notesdb")
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("db not connected");
  });

const NotesRoute = require("./Routes/Note.route");
app.use("/notes", NotesRoute);

app.listen(5000, () => {
  console.log("server started");
});

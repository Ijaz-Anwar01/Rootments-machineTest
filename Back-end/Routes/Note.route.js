const express = require("express");
const router = express.Router();
const Note = require("../Models/notes.model");

router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        res.send(notes);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.send(note);
    } catch (error) {
        console.log(error);
    }
});




router.put("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        note.title = req.body.title;
        note.notes = req.body.notes;
        await note.save();
        res.send(note);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        res.send(note);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;

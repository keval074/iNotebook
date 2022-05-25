const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
// const { json } = require("express");

//ROUTE 1 : Get all the notes :GEt"/auth/notes/fetchAllNotes"  login required
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error!!");
  }
});
//ROUTE 2 : Add a new note using  : POSt "/auth/notes/addnote"  login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if theree are error provide bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error!!");
    }
  }
);

//ROUTE 3 : Update an existing note  : put "/notes/updatenote"  login requir
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //creating a new note object

  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //fina a note to be updated
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
    note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  )
  res.json({ note });
});


//ROUTE 4 : Delete an existing note  : DELETE "/notes/deletenote"  login requir
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
  //fina a note to be deleted
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  //Allowed deldetion only if users owns these note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
    note = await Note.findByIdAndDelete(
    req.params.id
  )
  res.json({ "Success" : "Note has been deleted!" });
});
module.exports = router;

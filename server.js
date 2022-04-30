const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static("public"))

//routes
//HTML
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

//API
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
        if(err) throw err;

        const notes = JSON.parse(data)

        res.json(notes)
    })
})

app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
        if(err) throw err;

        const notes = JSON.parse(data);
        const newNote = req.body;

        const newID = Math.floor(Math.random() * 60000000000);
        newNote.id = newID
        
        notes.push(newNote)

        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), (err) => {
            if(err) throw err;

            res.json("added a new note")
        })
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, () => {
    console.log("alive")
})
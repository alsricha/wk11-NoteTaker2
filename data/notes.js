// Dependencies
// =============================================================
const util = require("util")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const readFileSync = util.promisify(fs.readFile)
const writeFileSync = util.promisify(fs.writeFile)


class Notes{
    read(){
        return readFileSync("db/db.json", "utf8")
    }
    write(note){
        return writeFileSync("db/db.json", JSON.stringify(note))
    }
    getAllNotes(){
        return this.read().then(notes => {
            let viewedNotes;

            try {
                viewedNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                viewedNotes = [];
            }
            return viewedNotes;
        })
    }
    addNote(note){
        const { title, text } = note;

        if (!title || !text) {
            throw new error("Note can not be blank")
        }
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        return this.getAllNotes().then(notes => [...notes, newNote]).then(updatedNotes => this.write(updatedNotes)).then(() => newNote)
    }
    removeNote(id) {
        return this.getAllNotes().then(notes => notes.filter((note) => note.id !== id)).then(filterNotes => this.write(filterNotes))
    }

}
module.exports = new Notes();
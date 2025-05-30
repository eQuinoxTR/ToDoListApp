import "./styles.css";

(function() {
    const root = document.querySelector("html")
    let pages = document.querySelectorAll(".container-of-notes");
    // area for improvement, random dom
    let theNoteIsSaved = false;
    let savedNote;

    pages.forEach((page) => page.addEventListener("click", (e) => {
        let clickedNote = detectTheNote(e.target, e.target.parentNode, e.target.classList); 
        if (clickedNote === undefined) {return};
        let page = clickedNote.parentNode;
        manageClicks(clickedNote, clickedNote.classList, page);
    }))

    function manageClicks(note, classOfNote, page) {
        if (theNoteIsSaved === true) {
            const filteredSavedNote = determineNoteColor(savedNote, page.id); // when switching pages, changes the color
            page.insertBefore(filteredSavedNote, note); // insert the copy before the clicked note
            stopAnimation();
        } else if (classOfNote == "new") {
            createNewNote(page);
        } else if (note) {
            savedNote = saveNote(note);
            startSaveAnimation();
        } 
    }

    function detectTheNote(clickedItem, parent, classOfClickedItem) {
        if (classOfClickedItem == "note" || classOfClickedItem == "new") {
            return clickedItem;
        } else if (parent.classList == "txt-container") {
            return clickedItem.parentNode.parentNode;
        } else if (parent.id == "deadline") {
            return clickedItem.parentNode.parentNode.parentNode;
        }
    }

    function createNewNote(page) {
        // area for improvement, why put DOM inside here? 
        const note = document.createElement("div");
        note.classList.add("note");
        const input = document.createElement("input");
        input.placeholder = "Type a new task...";
        note.appendChild(input);
        const btn = page.querySelector(".new");
        // area for improvement, why put DOM inside here? 
        const coloredNote = determineNoteColor(note, page.id);
        page.insertBefore(coloredNote, btn); // insert new note before the "Create new note" button
        addTxtIfFocusOutOrEnter(input);
    }

    function saveNote(note) {
        let copy = note.cloneNode(true)
        note.remove();
        return copy;
    }

    function startSaveAnimation() {
        theNoteIsSaved = true;
        root.style.setProperty('--hover', 'rgb(137, 180, 250)');
    }

    function stopAnimation() {
        theNoteIsSaved = false; // reset
        root.style.setProperty('--hover', 'none');
    }

    function determineNoteColor(copy, page) {
        let coloredNote = copy;
        switch (page) {
            case "container-green":  coloredNote.id = "green"; break;
            case "container-red":    coloredNote.id = "red"; break;
            case "container-yellow": coloredNote.id = "yellow"; break;
            case "container-blue":   coloredNote.id = "blue"; break;
            // css will change the note color based on the Id
        }
        return coloredNote;
    }

    function addTxtIfFocusOutOrEnter(input) {
        input.addEventListener("blur", () => addTxt(input));
        input.addEventListener("keydown", (e) => {if(e.key == "Enter"){addTxt(input)}});
    }

    function addTxt(input) {
        input.parentNode.textContent = `${input.value}`;
    }
})()


// class GetTags {
//     constructor(subject, deadline) {
//         this.subject = subject;
//         this.deadline = deadline;
//     }
// }

// let tag = new GetTags("mathematics", "in a few days")
// console.log(tag);
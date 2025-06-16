import {root, getCardDom, addPopOver} from "./dom.js";
let theNoteIsSaved = false;
let savedNote;

export function detectTheNote(clickedItem, parent, classOfClickedItem) {
    if (classOfClickedItem == "note" || classOfClickedItem == "new") {
        return clickedItem;
    } else if (classOfClickedItem == "header-txt") {
        return clickedItem.parentNode; // return the note
    } else if (parent.classList == "txt-container") {
        return clickedItem.parentNode.parentNode; // return the note
    } else if (parent.id == "deadline") {
        return clickedItem.parentNode.parentNode.parentNode; // return the note
    }
}

export function detectTheIcon(id, icon) {
    if (id == "doneIcon" || id == "options") {
        return icon;
    }
}

export function manageNoteClick(note, classOfNote, page) {
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

export function manageIconClick(icon) {
    if (icon.id == "doneIcon") {
        deleteNote(icon.parentNode);
    } else if (icon.id == "options") {
        addPopOver();
    } 
}

function createNewNote(page) {
    let dom = getCardDom(page);
    const coloredNote = determineNoteColor(dom.note, page.id);
    page.insertBefore(coloredNote, dom.btn); // insert new note before the "Create new note" button
    addTxtIfFocusOutOrEnter(dom.input);
}

function saveNote(note) {
    let copy = note.cloneNode(true);
    deleteNote(note);
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

function deleteNote(note) {
    note.remove();
}
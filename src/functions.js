import {root, getCardDom, createPopover, createInput} from "./dom.js";
let theNoteIsSaved = false, savedNote, popoverActive;

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
    if (id == "doneIcon" || id == "options" || id == "close") {
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
    let parent = icon.parentNode;
    if (icon.id == "doneIcon") {
        deleteNote(parent);
    } else if (icon.id == "options" && popoverActive != true) {
        let popover = createPopover(parent, popoverActive);
        popoverActive = true;
        popover.addEventListener("change", (e) => radioLogic(parent, e.target))
    } else if (icon.id == "close") {
        deleteNote(parent);
        popoverActive = false;
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

function addTxtIfFocusOutOrEnter(input, dueDate) {
    input.addEventListener("blur", () => addTxt(input, dueDate));
    input.addEventListener("keydown", (e) => {if(e.key == "Enter"){addTxt(input, dueDate)}});
}

function addTxt(input, dueDate) {
    if (input.parentNode.htmlFor == "checkbox-one") {
        dueDate.textContent = `in ${input.value}`; 
        determineDueDateId("specific date", dueDate);
    } else if (input.value != "") {
        input.parentNode.textContent = `${input.value}`;
    }
}

function radioLogic(parent, radio) {
    let dueDate = parent.querySelector(".deadlineTxt");
    let label = radio.nextElementSibling;

    if (radio.checked == true && radio.id == "checkbox-one") {
        let input = createInput(label, radio);
        addTxtIfFocusOutOrEnter(input, dueDate);
    } else if (radio.checked == true) {
        dueDate.textContent = label.textContent; 
        determineDueDateId(label.textContent, dueDate);
    }    
}

function determineDueDateId(text, dueDate) {
    switch (text) {
        case "In a few days": dueDate.id = "txt-red"; break;
        case "In a few weeks": dueDate.id = "txt-blue"; break;
        case "In a few months": dueDate.id = "txt-green"; break;
        case "specific date": dueDate.id = "txt-none"; break;
    }
}

function deleteNote(note) {
    note.remove();
}
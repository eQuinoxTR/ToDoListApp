import "./styles.css";
import {pages} from "./dom.js";
import {manageNoteClick, manageIconClick, detectTheNote, detectTheIcon} from "./functions.js";
(function() {
    pages.forEach((page) => page.addEventListener("click", (e) => {
        let clickedNote = detectTheNote(e.target, e.target.parentNode, e.target.classList); 
        let clickedIcon = detectTheIcon(e.target.id, e.target);
        if (clickedNote != undefined) {
            manageNoteClick(clickedNote, clickedNote.classList, clickedNote.parentNode);
        } else if (clickedIcon != undefined) {
            manageIconClick(clickedIcon)
        }
    }))
})()
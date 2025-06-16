export const root = document.querySelector("html")
export let pages = document.querySelectorAll(".container-of-notes");

export function getCardDom(page) {
    const note = document.createElement("div");
    note.classList.add("note");

    const headerTxt = document.createElement("div");
    headerTxt.classList.add("header-txt")

    const saveSvg = document.createElement("div");
    saveSvg.id = "doneIcon";

    const optionsSvg = document.createElement("div");
    optionsSvg.id = "options";

    const input = document.createElement("input");
    input.placeholder = "Type a new task...";

    note.appendChild(saveSvg);
    note.appendChild(optionsSvg);
    headerTxt.appendChild(input);
    note.appendChild(headerTxt);

    const btn = page.querySelector(".new");
    return {note, input, btn}
} 



export function addPopOver(page) {
    console.log("adding")
} 
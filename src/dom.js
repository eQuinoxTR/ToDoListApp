export const root = document.querySelector("html")
export let pages = document.querySelectorAll(".container-of-notes");

export function getCardDom(page) {
    const note = document.createElement("div");
    note.classList.add("note");
    const input = document.createElement("input");
    input.placeholder = "Type a new task...";
    note.appendChild(input);
    const btn = page.querySelector(".new");
    return {note, input, btn}
} 

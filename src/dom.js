export const root = document.querySelector("html");
export let flex = document.querySelector(".flex");

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

export function addPopOver(note, thePopoverIsActive) {
    if (thePopoverIsActive == true) {
        return;
    } else {
        createPopover(note)
    }
} 

function createPopover(note) {
    const headerTxt = note.querySelector(".header-txt").textContent;
    const flex = document.querySelector(".flex");

    const popover = document.createElement("div");
    popover.classList.add("popover");

    const img = document.createElement("div");
    img.id = "close";

    const headOne = document.createElement("h1");
    headOne.textContent = headerTxt;

    const headFive = document.createElement("h5");
    headFive.textContent = "Due Date";

    const textarea = document.createElement("textarea");
    textarea.id = "add-description";
    textarea.placeholder = "Type here to add a description";

    flex.appendChild(popover);
    popover.appendChild(img);
    popover.appendChild(headOne);
    popover.appendChild(headFive);

    for (let i = 0; i < 4; i++) { // repetitive stuff
        const line = document.createElement("div");
        line.id = "line";

        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "radio";

        const label = document.createElement("label");

        let id, text;
        switch(i) {
            case 0: id = "checkbox-one"; text = "Type a specific date"; break;
            case 1: id = "checkbox-two"; text = "In a few days"; break;
            case 2: id = "checkbox-three"; text = "In a few weeks"; break;
            case 3: id = "checkbox-four"; text = "In a few months"; break;
        }

        radioInput.id = id;
        label.htmlFor = id;
        label.textContent = text

        line.appendChild(radioInput);
        line.appendChild(label);
        popover.appendChild(line);
    }
    popover.appendChild(textarea);
}
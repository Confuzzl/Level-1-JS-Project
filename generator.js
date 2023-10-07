const { secureHeapUsed } = require("crypto");
const { create } = require("domain");
const fs = require("fs");

fs.writeFile(
    `${__dirname}\\index.html`,
    /* html*/ `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Code Breaker</title>
        <link rel="stylesheet" href="style.css" />
        <script src="script.js" defer></script>
    </head>
    <body >
        <header></header>
        <main>
            <div class="display">
                <div class="circle_display" style="grid-column-start: 1; grid-column-end: 2; grid-row-start: 1; grid-row-end: 4;">
                    <button id="dial_head" onclick="clickDial()">
                        <div id="dial_inset">
                            <div id="dial_handle"></div>
                        </div>
                    </button>
                </div>
                ${createButtons("increment")}
                <div class="digit" id="digit_1" style="--value: -1;">-1</div>
                <div class="digit" id="digit_2" style="--value: -1;">-1</div>
                <div class="digit" id="digit_3" style="--value: -1;">-1</div>
                ${createButtons("decrement")}
                <div class="circle_display" style="grid-column-start: 5; grid-column-end: 6; grid-row-start: 1; grid-row-end: 4;">
                    <div id="mistakes">
                        <div id="mistake_display">
                            ${createMistakeSectors()}
                        </div>
                    </div>
                </div>
                <div
                    class="computer"
                    style="grid-column-start: 1; grid-column-end: 4;"
                >
                    AAAAAAAAAAAAa
                </div>
            </div>
        </main>
        <footer></footer>
    </body>
</html>
`,
    (err) => {
        if (err) return console.log("error");
    }
);

function createButtons(crement) {
    let buttons = ``;
    for (let i = 0; i < 3; i++) {
        buttons += /*html*/ `
        <div class="crement">
            <button onclick="crement(${i}, '${crement}')">
                <div class="${crement}"></div>
            </button>
        </div>
        `;
    }
    return buttons;
}

function createMistakeSectors() {
    let sectors = ``;
    let sectorCount = 7;
    for (let i = 0; i < sectorCount; i++) {
        sectors += /*html*/ `
        <div class="mistake_sector" style="--size: ${sectorCount};--index: ${i};">
            <div class="mistake_sector_display" id="mistake_sector_display_${i}" off></div>
        </div>
        `;
    }
    return sectors;
}

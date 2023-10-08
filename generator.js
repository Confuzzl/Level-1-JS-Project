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
        <link href="https://fonts.cdnfonts.com/css/cascadia-code" rel="stylesheet">
    </head>
    <body onload="initialize()">
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
                ${createButtons("in")}
                ${createDigits()}
                ${createButtons("de")}
                <div class="circle_display" style="grid-column-start: 5; grid-column-end: 6; grid-row-start: 1; grid-row-end: 4;">
                    <div id="mistakes">
                        <div id="mistake_display">
                            ${createMistakeSectors()}
                        </div>
                        <button id="reset_wrapper" style="display: none;" onclick="initialize()">
                            <div id="reset">
                                <div id="reset_arrow_wrapper">
                                    <div id="reset_arrow"></div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div
                    id="computer"
                    style="grid-column-start: 2; grid-column-end: 5;"
                >
                    <div id="response"></div>
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
                <div class="${crement} crement_arrow"></div>
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

function createSegments() {
    let segments = ``;
    for (let i = 0; i < 7; i++) {
        let direction = i % 3 == 0 ? "x" : "y";
        segments += /*html*/ `
        <div class="segment_${direction} segment_${i}">
            <div class="segment_a" off></div>
            <div class="segment_b" off></div>
        </div>
        `;
    }
    return segments;
}

function createDigits() {
    let digits = ``;
    for (let i = 0; i < 3; i++) {
        digits += /*html*/ `
        <div class="digit_display" id="digit_${i + 1}" style="--value: -1;">
            <div class="digit">
                ${createSegments()}
            </div>
        </div>
        `;
    }
    return digits;
}

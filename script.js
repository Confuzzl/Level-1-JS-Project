function random() {
    return Math.floor(Math.random() * 10);
}

let failCount;
const digits = [
    document.getElementById("digit_1"),
    document.getElementById("digit_2"),
    document.getElementById("digit_3"),
];
let correctDigits;
let correctValue;

function initDigits() {
    for (let i = 0; i < 3; i++) {
        let value = random();
        while (value === correctDigits[i]) value = random();

        setDigit(i, value);
    }
    updateDigits();
}

function setDigit(index, value) {
    let digit = digits[index];
    digit.style = `--value: ${value};`;
}

function valueAtIndex(index) {
    return valueAt(digits[index]);
}
function valueAt(digit) {
    return parseInt(digit.style.getPropertyValue("--value"));
}

function isCorrect(index) {
    return valueAtIndex(index) === correctDigits[index];
}

function digitsValue() {
    return valueAtIndex(0) * 100 + valueAtIndex(1) * 10 + valueAtIndex(2);
}

function clickDial() {
    let dialHandle = document.getElementById("dial_handle");
    if (isCorrect(0) && isCorrect(1) && isCorrect(2)) {
        handleSuccess();
    } else {
        dialHandle.style = "transform: rotate(10deg);";
        setTimeout(() => {
            dialHandle.style = "";
        }, 100);
        document.getElementById("response").innerHTML =
            digitsValue() > correctValue ? "TOO HIGH" : "TOO LOW";
        let display = document.getElementById(
            `mistake_sector_display_${failCount++}`
        );
        display.removeAttribute("off");
        display.setAttribute("on", "");
    }
    if (failCount == 7) handleFail();
}

function crement(index, crement) {
    let i = crement === "in" ? 1 : -1;
    let newvalue = valueAtIndex(index) + i;
    let normalizedValue = ((newvalue % 10) + 10) % 10;
    setDigit(index, normalizedValue);
    updateDigits();
}

const numberMaps = [
    0b0111111, 0b0000110, 0b1011011, 0b1001111, 0b1100110, 0b1101101, 0b1111101,
    0b0000111, 0b1111111, 0b1101111,
];
const errMap = [0b1111001, 0b1010000, 0b1010000];
const modeColors = {
    normal: "red",
    complete: "lime",
    locked: "red",
};

function updateDigits(mode = "normal") {
    for (const [index, digit] of digits.entries()) {
        let value = valueAt(digit);
        for (let s = 0; s < 7; s++) {
            const condition =
                mode === "locked"
                    ? (errMap[index] & (1 << s)) > 0
                    : (numberMaps[value] & (1 << s)) > 0;

            updateSegment(
                digit.getElementsByClassName("digit")[0].children[s],
                condition
            );
        }
    }
}

function updateSegment(segment, status) {
    const add = status ? "on" : "off";
    const remove = status ? "off" : "on";
    const a = segment.getElementsByClassName("segment_a")[0];
    const b = segment.getElementsByClassName("segment_b")[0];
    a.setAttribute(add, "");
    b.setAttribute(add, "");
    a.removeAttribute(remove, "");
    b.removeAttribute(remove, "");
}

function handleSuccess() {
    handleEnd();
    document.getElementById("dial_handle").style = "transform: rotate(45deg);";
    updateDigits("complete");
    console.log("WIN");
    document.documentElement.style.setProperty("--light_on", "lime");
    document.documentElement.style.setProperty("--light_off", "#030");
    document.getElementById("response").innerHTML = "USER AUTHENTICATED";
}

function handleFail() {
    handleEnd();
    updateDigits("locked");
    document.getElementById("response").innerHTML = "TOO MANY FAILED ATTEMPTS";
}

function handleEnd() {
    for (const crement of document.getElementsByClassName("crement"))
        crement.getElementsByTagName("button")[0].setAttribute("disabled", "");
    document.getElementById("dial_head").setAttribute("disabled", "");
    document.getElementById("reset_wrapper").style = "display: flex";
}

function initialize() {
    failCount = 0;
    correctDigits = [random(), random(), random()];
    correctValue =
        correctDigits[0] * 100 + correctDigits[1] * 10 + correctDigits[2];
    console.log(correctDigits);

    initDigits();

    for (const crement of document.getElementsByClassName("crement"))
        crement.getElementsByTagName("button")[0].removeAttribute("disabled");
    document.getElementById("dial_head").removeAttribute("disabled");
    document.getElementById("reset_wrapper").style = "display: none";

    for (const display of document.getElementsByClassName(
        "mistake_sector_display"
    )) {
        display.removeAttribute("on");
        display.setAttribute("off", "");
    }

    document.getElementById("dial_handle").style = "transform: none;";
    document.getElementById("response").innerHTML = "&nbsp;";

    document.documentElement.style.setProperty("--light_on", "red");
    document.documentElement.style.setProperty("--light_off", "#300");
}

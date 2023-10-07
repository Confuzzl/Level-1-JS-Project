function random() {
    return Math.floor(Math.random() * 10);
}

let correctDigits = [random(), random(), random()];
let correctValue =
    correctDigits[0] * 100 + correctDigits[1] * 10 + correctDigits[2];
console.log(correctDigits);
let digits = [
    document.getElementById("digit_1"),
    document.getElementById("digit_2"),
    document.getElementById("digit_3"),
];

for (let i = 0; i < 3; i++) {
    let value = random();
    while (value === correctDigits[i]) value = random();

    setDigit(i, value);
}

function setDigit(index, value) {
    let digit = digits[index];
    digit.innerHTML = value;
    digit.style = `--value: ${value};`;
}

function valueAt(index) {
    return parseInt(digits[index].innerHTML);
}

function isCorrect(index) {
    return valueAt(index) === correctDigits[index];
}

function digitsValue() {
    return valueAt(0) * 100 + valueAt(1) * 10 + valueAt(2);
}

let failCount = 0;

function clickDial() {
    if (failCount >= 7) return;

    let dialHandle = document.getElementById("dial_handle");
    if (isCorrect(0) && isCorrect(1) && isCorrect(2)) {
        dialHandle.style = "transform: rotate(45deg);";
        console.log("WIN");
        for (const display of document.getElementsByClassName(
            "mistake_sector_display"
        )) {
            display.removeAttribute("off");
            display.removeAttribute("on");
            display.setAttribute("disarmed", "");
        }
    } else {
        dialHandle.style = "transform: rotate(10deg);";
        setTimeout(() => {
            dialHandle.style = "";
        }, 100);
        console.log(digitsValue() > correctValue ? "TOO HIGH" : "TOO LOW");
        let display = document.getElementById(
            `mistake_sector_display_${failCount++}`
        );
        display.removeAttribute("off");
        display.setAttribute("on", "");
    }
}

function crement(index, crement) {
    let i = crement === "increment" ? 1 : -1;
    let newvalue = valueAt(index) + i;
    let normalizedValue = ((newvalue % 10) + 10) % 10;
    setDigit(index, normalizedValue);
}

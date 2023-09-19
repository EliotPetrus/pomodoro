let timer = false;
let work = false;
let cmpt = 1;

const timerElement = document.getElementById("timer");
const startElement = document.getElementById("start");
const stateElement = document.getElementById("state");

const timeWorkForm = document.getElementById("timeWorkForm");
const timeBreakForm = document.getElementById("timeBreakForm");
const timeLongBreakForm = document.getElementById("timeLongBreakForm");

const textWork = document.getElementById('textWork');
const textBreak = document.getElementById('textBreak');
const textLongBreak = document.getElementById('textLongBreak');

const cycle = document.getElementById('cycle');
cycle.innerText=cmpt;

startElement.innerHTML = '<i class="fa-solid fa-play"></i>';

let timeWork;
let timeBreak;
let timeLongBreak;

if (localStorage.getItem("travail") != null) {
    timeWork = localStorage.getItem("travail");
    textWork.innerText = timeWork;
    timeWorkForm.value = timeWork;
} else {
    timeWork = 10;
}
if (localStorage.getItem("pause") != null) {
    timeBreak = localStorage.getItem("pause");
    textBreak.innerText = timeBreak;
    timeBreakForm.value = timeBreak;

} else {
    timeBreak = 5;
}
if (localStorage.getItem("longBreak") != null) {
    timeLongBreak = localStorage.getItem("longBreak");
    textLongBreak.innerText = timeLongBreak;
    timeLongBreakForm.value = timeLongBreak;

} else {
    timeLongBreak = 20;
}

timerElement.innerText = timeWork < 10 ? `0${timeWork}:00` : `${timeWork}:00`;
let temps = timeWork * 60;

textWork.innerText = timeWorkForm.value;
textBreak.innerText = timeBreakForm.value;
textLongBreak.innerText = timeLongBreakForm.value;

timeWorkForm.addEventListener('change', () => {
    textWork.innerText = timeWorkForm.value;
    localStorage.setItem("travail", timeWorkForm.value);
    if (timer === false){
        timerElement.innerText = timeWorkForm.value < 10 ? `0${timeWorkForm.value}:00` : `${timeWorkForm.value}:00`;
    }
});
timeBreakForm.addEventListener('change', () => {
    textBreak.innerText = timeBreakForm.value;
    localStorage.setItem("pause", timeBreakForm.value);
});
timeLongBreakForm.addEventListener('change', () => {
    textLongBreak.innerText = timeLongBreakForm.value;
    localStorage.setItem("longBreak", timeLongBreakForm.value);
});

document.getElementById('start').addEventListener('click', () => {

    timeWork = timeWorkForm.value;
    timeBreak = timeBreakForm.value;
    timeLongBreak = timeLongBreakForm.value;
    temps = timeWork * 60;

    if (timer == false) {
        timer = true;
        work = true;

        startElement.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
        setInterval(() => {
            let minutes = parseInt(temps / 60, 10);
            let secondes = parseInt(temps % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            secondes = secondes < 10 ? "0" + secondes : secondes;

            timerElement.innerText = `${minutes}:${secondes}`;
            temps = temps <= 0 ? 0 : temps - 1;

            if (work == true && temps == 0) {
                work = false
                if (cmpt % 4 == 0) {
                    temps = timeLongBreak * 60;
                    stateElement.innerText = 'BREAK';
                } else {
                    temps = timeBreak * 60;
                    stateElement.innerText = 'BREAK';
                };
                stateElement.style.backgroundColor = 'green';
                timerElement.style.backgroundColor = 'green';
            }
            else if (work == false && temps == 0) {
                cmpt += 1;
                work = true;
                temps = timeWork * 60;
                stateElement.innerText = 'WORK';
                stateElement.style.backgroundColor = 'red';
                timerElement.style.backgroundColor = 'red';
                cycle.innerText=cmpt;
            }

        }, 10);
    }

    else if (timer == true) {
        location.reload();
    }

});
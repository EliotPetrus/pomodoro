let timer = false;
let work = false;
let cmpt = 1;

/**
 * declaration des constantes utilisé pour l'utilisation du timer, de l'affichage et pour le bouton play
 */
const timerElement = document.getElementById("timer");
const startElement = document.getElementById("start");
const stateElement = document.getElementById("state");

/**
 * declaration des constantes utilisé pour l'utilisation des formulaires et de l'affichage du compteur cycle
 */
const timeWorkForm = document.getElementById("timeWorkForm");
const timeBreakForm = document.getElementById("timeBreakForm");
const timeLongBreakForm = document.getElementById("timeLongBreakForm");

const textWork = document.getElementById('textWork');
const textBreak = document.getElementById('textBreak');
const textLongBreak = document.getElementById('textLongBreak');

const cycle = document.getElementById('cycle');
cycle.innerText = cmpt;

/**
 * declaration des variables utilisé pour gérer les temps
 */
let timeWork;
let timeBreak;
let timeLongBreak;

/**
 * initialisation des variables de temps (si elles ont été stocker ou non)
 */
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

let temps = timeWork * 60;

/**
 * affichage de base du timer et des formulaires
 */
timerElement.innerText = timeWork < 10 ? `0${timeWork}:00` : `${timeWork}:00`;

textWork.innerText = timeWorkForm.value;
textBreak.innerText = timeBreakForm.value;
textLongBreak.innerText = timeLongBreakForm.value;

/**
 * mise en place des listener pour l'utilisation des formulaires en temps réel
 */
timeWorkForm.addEventListener('change', () => {
    textWork.innerText = timeWorkForm.value;
    localStorage.setItem("travail", timeWorkForm.value);
    if (timer === false) {
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

/**
 * fonction principal qui s'occupe de gérer lorsque l'utilisateur clic sur le bouton play
 */
function pomodoro() {
    document.getElementById('start').addEventListener('click', () => {

        timeWork = timeWorkForm.value;
        timeBreak = timeBreakForm.value;
        timeLongBreak = timeLongBreakForm.value;
        temps = timeWork * 60;

        if (timer === false) {
            start()
        } else if (timer === true) {
            stop()
        }
    });
}

/**
 * fonction qui va lancer le timer et le faire alterner entre les phases de travail et de pause
 */
function start() {
    timer = true;
    work = true;
    startElement.className = "fa-solid fa-rotate-right"

    setInterval(() => {
        let minutes = parseInt(temps / 60, 10);
        let secondes = parseInt(temps % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        secondes = secondes < 10 ? "0" + secondes : secondes;

        timerElement.innerText = `${minutes}:${secondes}`;
        temps = temps <= 0 ? 0 : temps - 1;

        if (work == true && temps == 0) {
            startWork()
        }
        else if (work == false && temps == 0) {
            startBreak()
        }

    }, 1);
}

/**
 * fonction qui va gerer le timer en phase de travail
 */
function startWork() {
    work = false
    if (cmpt % 4 == 0) {
        temps = timeLongBreak * 60;
        stateElement.innerText = 'Pause';
    } else {
        temps = timeBreak * 60;
        stateElement.innerText = 'Pause';
    };
    stateElement.style.backgroundColor = 'green';
    timerElement.style.backgroundColor = 'green';
}

/**
 * fonction qui va gerer le timer en phase de pause ou de longue pause
 */
function startBreak(){
    cmpt += 1;
    work = true;
    temps = timeWork * 60;
    stateElement.innerText = 'Travail';
    stateElement.style.backgroundColor = 'red';
    timerElement.style.backgroundColor = 'red';
    cycle.innerText = cmpt;
}

/**
 * fonction qui va arreter le timer
 */
function stop() {
    location.reload();
}

pomodoro();
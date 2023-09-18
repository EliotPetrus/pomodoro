let timer = false
let work = false
let cmpt = 1

let timeWork = 10
let timeBreak = 5
let timeLongBreak = 20
let temps = timeWork * 60

if (localStorage.getItem("travail")!=null){
    timeWork = localStorage.getItem("travail")
}
if (localStorage.getItem("pause")!=null){
    timeWork = localStorage.getItem("pause")
}
if (localStorage.getItem("LonguePause")!=null){
    timeWork = localStorage.getItem("LonguePause")
}

const timerElement = document.getElementById("timer")
const startElement = document.getElementById("start")
const stateElement = document.getElementById("state")

timerElement.innerText = timeWork < 10 ? `0${timeWork}:00` : `${timeWork}:00`

let timeWorkForm = document.getElementById("timeWorkForm")
let timeBreakForm = document.getElementById("timeBreakForm")
let timeLongBreakForm = document.getElementById("timeLongBreakForm")

const textWork = document.getElementById('textWork')
const textBreak = document.getElementById('textBreak')
const textLongBreak = document.getElementById('textLongBreak')

textWork.innerText = timeWorkForm.value
textBreak.innerText = timeBreakForm.value
textLongBreak.innerText = timeLongBreakForm.value

timeWorkForm.addEventListener('change', () => {
    textWork.innerText = timeWorkForm.value
    timerElement.innerText = timeWorkForm.value < 10 ? `0${timeWorkForm.value}:00` : `${timeWorkForm.value}:00`
})
timeBreakForm.addEventListener('change', () => {
    textBreak.innerText = timeBreakForm.value
})
timeLongBreakForm.addEventListener('change', () => {
    textLongBreak.innerText = timeLongBreakForm.value
})

document.getElementById('start').addEventListener('click', () => {

    timeWork = timeWorkForm.value
    timeBreak = timeBreakForm.value
    timeLongBreak = timeLongBreakForm.value
    temps = timeWork * 60

    if (timer == false) {
        timer = true
        work = true

        startElement.innerText='stop';
        setInterval(() => {
            let minutes = parseInt(temps / 60, 10)
            let secondes = parseInt(temps % 60, 10)

            minutes = minutes < 10 ? "0" + minutes : minutes
            secondes = secondes < 10 ? "0" + secondes : secondes

            timerElement.innerText = `${minutes}:${secondes}`
            temps = temps <= 0 ? 0 : temps - 1

            if (work == true && temps == 0){
                work = false
                if (cmpt%4 == 0){
                    temps = timeLongBreak*60
                stateElement.innerText='LONG BREAK'
                }else {
                    temps = timeBreak*60
                    stateElement.innerText='BREAK'
                }
                stateElement.style.backgroundColor='green'
            } 
            else if (work == false && temps == 0) {
                cmpt += 1
                work = true
                temps = timeWork*60
                stateElement.innerText='WORK'
                stateElement.style.backgroundColor='red'
            }

        }, 1)
    }

    else if (timer == true) {
        localStorage.setItem("travail",timeWorkForm.value)
        localStorage.setItem("pause",timeBreakForm.value)
        localStorage.setItem("longuePause",timeLongBreakForm.value)
        location.reload()
    }

})



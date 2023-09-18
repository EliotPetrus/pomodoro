let timer = false
let work = false
let cmpt = 1

const tempsWork = 10
const tempsBreak = 5
let temps = tempsWork * 60

const timerElement = document.getElementById("timer")
const startElement = document.getElementById("start")
const stateElement = document.getElementById("state")

timerElement.innerText = tempsWork < 10 ? `0${tempsWork}:00` : `${tempsWork}:00`

document.getElementById('start').addEventListener('click', () => {

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
                    temps = tempsBreak*4*60
                stateElement.innerText='LONG BREAK'
                }else {
                    temps = tempsBreak*60
                    stateElement.innerText='BREAK'
                }
                stateElement.style.backgroundColor='green'
            } 
            else if (work == false && temps == 0) {
                cmpt += 1
                work = true
                temps = tempsWork*60
                stateElement.innerText='WORK'
                stateElement.style.backgroundColor='red'
            }

        }, 1)
    }

    else if (timer == true) {
        location.reload();
    }

})


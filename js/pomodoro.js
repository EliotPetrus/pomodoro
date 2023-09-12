let timer = false

const departMinutes = 10
let temps = departMinutes * 60

const timerElement = document.getElementById("timer")
timerElement.innerText = departMinutes < 10 ? `0${departMinutes}:00` : `${departMinutes}:00`

document.getElementById('start').addEventListener('click', () => {

    if (timer == false) {
        timer = true
        setInterval(() => {
            let minutes = parseInt(temps / 60, 10)
            let secondes = parseInt(temps % 60, 10)

            minutes = minutes < 10 ? "0" + minutes : minutes
            secondes = secondes < 10 ? "0" + secondes : secondes

            timerElement.innerText = `${minutes}:${secondes}`
            temps = temps <= 0 ? 0 : temps - 1
        }, 100)
    }

    else if (timer == true) {
        location.reload();
    }

})


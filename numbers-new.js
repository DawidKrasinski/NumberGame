document.addEventListener('DOMContentLoaded', main)

function main() {
    const game = new Game()

    document.querySelector("#start").addEventListener('click', () => {
        game.start()
    })
}


function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  

function turnClock(min, sec) {
    console.log(min, sec)
}



class Game {
    constructor () {
        this.clock = new Clock()
        this.wrapper = document.querySelector('#gameboard')
        this.nextNumber = 1
    }

    start () {
        this.renderBoard()
        this.clock.start()
    }

    checkNextNumber (number) {
        if (this.nextNumber !== number) return false

        this.nextNumber++
        return true
    }

    finished () {
        this.clock.stop()
    }

    appendNumber (element) {
        this.wrapper.appendChild(element)
    }

    renderBoard () {
        const shuffled100Numbers = Array(100).fill('').map((_,index) => index + 1 )
        shuffle(shuffled100Numbers)
        this.numbers = shuffled100Numbers.map(number => new GameNumber(number, this) )
    }
}
class Clock {

    constructor () {
        this.element = document.querySelector('#time')
        this.value = 0
    }
    start () {
        this.interval = setInterval(() => {
            this.value++
            this.render()
        }, 1000)
    }

    stop () {
        clearInterval(this.interval)
    }

    render () {
        this.element.innerHTML = this.value
    }
}


class GameNumber {
    constructor (value, game) {
        this.value = value
        this.game = game
        this.element = document.createElement('div')
        this.element.classList.add('place')
        this.element.innerText = value
        this.game.appendNumber(this.element)

        this.disabled = false

        this.element.addEventListener('click', () => {
            this.onClick()
        })
    }

    onClick  () {
        if (this.disabled) return false

        const result = this.game.checkNextNumber(this.value)

        if (result === false) this.showFailClick()
        else this.setAsDisabled()
    }

    showFailClick () {
        this.element.classList.add('failed')
        setTimeout(() => {
            this.element.classList.remove('failed')
        }, 300)
    }

    setAsDisabled () {
        this.disabled = true
        this.element.classList.add('disabled')
    }
}
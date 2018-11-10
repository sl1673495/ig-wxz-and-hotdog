import Player from './modules/player'
import Fall from './modules/fall'
import Score from './modules/score'

function initGame() {
    new Player()
    new Score()
    setInterval(() => {
        new Fall()
    }, 200)
}

initGame()
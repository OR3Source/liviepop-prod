import Grid from '../components/Grid'
import './Game.css'

function Game() {
  return (
    <div className="game">
      <div className="grid-area">
        <Grid />
      </div>
      <div className="keyboard-area">
        {/* Keyboard will go here */}
      </div>
    </div>
  )
}

export default Game
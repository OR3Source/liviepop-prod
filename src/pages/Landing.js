import { useNavigate } from 'react-router-dom'
import { GiYarn } from "react-icons/gi";
import './Landing.css'
import '../App.css'
import olivia from '../assets/olivia.jpg'

function Landing() {
  const navigate = useNavigate()

  const today = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/New_York'
  })

  const prevDate = new Date(Date.now() - 86400000)
    .toLocaleDateString('en-CA', {
      timeZone: 'America/New_York'
    })

  return (
    <div className="landing">
      <div className="landing-content">

        <div className="rip-mask-container">
          <img src={olivia} alt="Olivia" className="rip-image" />
        </div>

        <h1 className="landing-title">
          <span className="title-wrapper">
            <span className="title-first-line">
              <GiYarn className="landing-yarn" />
              <span className="title-main">Can you unravel the</span>
            </span>
            <span className="title-phrase">phrase?</span>
          </span>
        </h1>

        <div className="landing-buttons">
          <button
            className="btn-outline"
            onClick={() => navigate(`/play/prev/${prevDate}`)}
          >
            previous day
          </button>

          <button
            className="btn-solid"
            onClick={() => navigate(`/play/${today}`)}
          >
            play
          </button>
        </div>

      </div>
    </div>
  )
}

export default Landing
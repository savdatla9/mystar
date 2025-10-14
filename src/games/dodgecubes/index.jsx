import React, { useState } from 'react'

import GameCanvas from './GameCanvas.jsx'
import JoystickOverlay from './joystickOverlay.jsx'

import './index.css'

export default function RaceCar() {
  const [useTouch, setUseTouch] = useState(false);

  return (
    <div className="app">
      <header className="hud top">
        <h1>🕹️ Dodge Cubes</h1>
        <div className="toggles">
          <label className="toggle">
            <input
              type="checkbox"
              checked={useTouch}
              onChange={(e) => setUseTouch(e.target.checked)}
            />
            Mobile Joystick
          </label>
          <span className="help">
            Keyboard: WASD / Arrow keys • Space = Restart
          </span>
        </div>
      </header>

      <GameCanvas useTouch={useTouch} />

      {useTouch && <JoystickOverlay />}
    </div>
  )
}
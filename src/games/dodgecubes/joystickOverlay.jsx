import React, { useEffect, useRef } from 'react'
import { Joystick } from 'react-joystick-component'

/**
 * Global input state for joystick; GameCanvas reads these custom events.
 * We broadcast a CustomEvent with detail { x, y } where x,y ∈ [-1,1]
 */
export default function JoystickOverlay() {
  const stickRef = useRef({ x: 0, y: 0, direction: '' });

  const emit = () => {
    const event = new CustomEvent('joystick-move', {
      detail: { x: stickRef.current.x, y: stickRef.current.y, direction: stickRef.current.direction }
    });

    window.dispatchEvent(event);
  };

  const onMove = (e) => {
    // e.x, e.y are pixel deltas; e.direction gives dir words, but we normalize
    // react-joystick-component provides distance/angle; scale to [-1,1]
    // console.log(e)
    const max = e.distance || 0;
    const rad = (e.angle?.radian ?? 0);
    const normalized = Math.min(max / 100, 1); // 100px radius ≈ full deflection

    stickRef.current.x = Math.cos(rad) * normalized;
    stickRef.current.y = Math.sin(rad) * normalized * -1; // invert Y for screen vs math
    stickRef.current.direction = e.direction;
    emit()
  };

  const onStop = () => {
    stickRef.current.x = 0;
    stickRef.current.y = 0;
    stickRef.current.direction = '';
    emit()
  }

  // On mount, emit zero once to clear any stale state
  useEffect(() => { onStop() }, [])

  return (
    <div className="joystick-wrap">
      <Joystick
        size={120}
        baseColor="rgba(255,255,255,0.2)"
        stickColor="rgba(255,255,255,0.7)"
        throttle={60}
        move={onMove}
        stop={onStop}
      />
    </div>
  );
};
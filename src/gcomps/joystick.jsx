import { useMemo, useRef, useState } from "react";
import { Joystick } from "react-joystick-component";

import "./joystick.css";

export default function JoystickController({
    move,
    start,
    stop,
    opactiy = 1.0,
    className
}) {
    const [containerDiv, setContainerDiv] = useState();

    const containerStyle = useRef({
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center"
    }).current;

    const baseColor = useMemo(() =>
        `radial-gradient(circle at 50% 50%, rgba(100,100,100,${opactiy}), rgba(100,100,100,${opactiy}), rgba(100,100,100,${opactiy}),  rgba(5,5,5,${opactiy}))`,
        [opactiy]
    );

    const stickColor = useMemo(() =>
        `radial-gradient(circle at 50% 50%, rgba(70,70,70,${opactiy}), rgba(70,70,70,${opactiy}), rgba(5,5,5,${opactiy}))`,
        [opactiy]
    );

    return (
        <div ref={setContainerDiv} style={containerStyle} className={className}>
        
        {containerDiv ? (
            <Joystick
            // we are assuming that the container dimensions will never change in the lifetime of this component
                size={Math.min(containerDiv.offsetWidth, containerDiv.offsetHeight)}
                baseColor={baseColor}
                stickColor={stickColor}
                throttle={200}
                move={move}
                stop={stop}
                start={start}
            />
        ) : null}
        </div>
    );
};

// const handleMove = (stick) => {
//     setJoystickData({
//         x: stick.x,
//         y: stick.y,
//         direction: stick.direction,
//     });
// };

// const handleStop = () => {
//     setJoystickData({ x: 0, y: 0, direction: null });
// };

//     // circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%

//         <div className="App">
//             <h1>Joystick</h1>

//             <div className="controller-container">
//                 <GobeJoystickController
//                     opactiy={1}
//                     move={handleMove}
//                     stop={handleStop}
//                     start={handleStart}
//                 />
//             </div>
//         </div>
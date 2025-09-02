import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';

import ResponsiveZoom from './responsivescene';

const Earth = (props) => {
    const ref = useRef();
    const { gl } = useThree();

    useFrame((state, delta) => (ref.current.rotation.y += (delta/10)));

    const texture = useLoader(
      THREE.TextureLoader,
      'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@displacementMap/public/img/worldColour.5400x2700.jpg'
    );

    const displacementMap = useLoader(
      THREE.TextureLoader,
      'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@displacementMap/public/img/gebco_bathy_2700x1350.jpg'
    );
  
    const material = 0.075;
  
    useEffect(() => {
        texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    }, [texture, gl]);
  
    return (
        <mesh {...props} ref={ref} castShadow={true} receiveShadow={true}>
            <mesh>
                <icosahedronGeometry args={[1, 64]} />

                <meshStandardMaterial
                    map={texture}
                    displacementMap={displacementMap}
                    displacementScale={material}
                />
            </mesh>

            <mesh position={[-0.21, 0.27, 1]} scale={0.1}>
                <boxGeometry args={[0.25, 0.25, 1.65]} />

                <meshPhongMaterial color={'red'} />
            </mesh>
        </mesh>
    );
};

const Homescene=()=>{
    return(
        <Canvas 
            camera={{ position: [0, 1.5, 5], fov: 42 }} 
        >
            <ResponsiveZoom />
            
            <ambientLight intensity={Math.PI / 2} color={'#f3efefff'} />

            <spotLight 
                position={[10, 10, 10]} angle={0.15} 
                penumbra={1} decay={0} intensity={Math.PI} 
            />
            
            <pointLight 
                position={[-10, -10, -10]} decay={0} 
                intensity={Math.PI} 
            />

            <Earth scale={1} />
        </Canvas>
    );
};

export default Homescene;
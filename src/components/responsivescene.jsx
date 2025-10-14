import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export default function ResponsiveZoom() {
    const { camera, size } = useThree();

    useEffect(() => {
        if (size.width < 600) {
            camera.zoom = 0.5; // Zooms out for small screens
        } else {
            camera.zoom = 0.8;
        };
        
        camera.updateProjectionMatrix();
    }, [size.width, camera]);

    return null;
};
import { useGLTF, Stage, Environment, Center } from '@react-three/drei';
import { useRef } from 'react';

export default function ShipModel(){
    const group = useRef();
    const { scene } = useGLTF('/models/orion.gltf');

    return(
        <>
            <Environment preset='city' />

            <Center>
                <primitive ref={group} object={scene} scale={1.2} rotation={[0, 0, 0]}/>
            </Center>
        </>
    );
}
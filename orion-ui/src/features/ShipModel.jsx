import { useGLTF, Stage, Environment, Center } from '@react-three/drei';

export default function ShipModel(){
    const { scene } = useGLTF('ship.glb');

    return(
        <>
            <Environment preset='city' />

            <Center>
                <primitive object={scene} scale={0.003} rotation={[0.4, 0, -0.2]}/>
            </Center>
        </>
    );
}
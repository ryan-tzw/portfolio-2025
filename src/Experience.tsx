import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { MyScene } from './MyScene.tsx'

export default function Experience() {
    const { nodes } = useGLTF('./portfolio-2025.glb')
    const { camera, pointer } = useThree()

    // Where the camera is looking
    const lookPosition = nodes.screen.position.clone()
    lookPosition.y += 0.3

    // default camera position
    const defaultCameraPosition = new THREE.Vector3(-0.5, 1.3, 0.5)

    useFrame(() => {
        // Move the camera with the mouse
        const newX = defaultCameraPosition.x + pointer.x * 0.5
        camera.position.lerp(
            new THREE.Vector3(newX, defaultCameraPosition.y, defaultCameraPosition.z),
            0.05
        )
        camera.lookAt(lookPosition)
    })

    return (
        <>
            <color args={['#201919']} attach="background" />

            <MyScene />
        </>
    )
}

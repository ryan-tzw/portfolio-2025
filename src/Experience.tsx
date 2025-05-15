import { useGLTF, OrbitControls, useTexture, Center } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import * as THREE from 'three'

export default function Experience() {
    const { nodes, scene } = useGLTF('./portfolio-2025.glb')
    const { camera, pointer } = useThree()

    // Baked texture
    const bakedTexture = useTexture('./baked.jpg')
    bakedTexture.flipY = false
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

    // Where the camera is looking
    const lookPosition = nodes.screen.position.clone()
    lookPosition.y += 0.3

    // default camera position
    const defaultCameraPosition = new THREE.Vector3(-0.5, 1.3, 0)

    useEffect(() => {
        // Set material for all meshes in the scene
        console.log('Scene:', scene)
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = bakedMaterial
            }
        })
    }, [scene])

    useFrame(() => {
        camera.lookAt(lookPosition)

        // Move the camera with the mouse
        const newX = defaultCameraPosition.x + pointer.x * 0.5
        camera.position.lerp(
            new THREE.Vector3(newX, defaultCameraPosition.y, defaultCameraPosition.z),
            0.05
        )
    })

    return (
        <>
            <color args={['#201919']} attach="background" />
            <primitive object={scene} />
        </>
    )
}

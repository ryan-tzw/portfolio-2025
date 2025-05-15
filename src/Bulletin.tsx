import * as THREE from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Bulletin() {
    const { nodes } = useGLTF('./portfolio-2025-transformed.glb')

    // Baked texture
    const bakedTexture = useTexture('./baked.jpg')
    bakedTexture.flipY = false
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

    const [hovered, setHovered] = useState(false)

    const onClick = () => {
        window.open('./resume.pdf', '_blank')
    }

    const onPointerOver = () => {
        setHovered(true)
    }
    const onPointerOut = () => {
        setHovered(false)
    }

    const overlayRef = useRef(null)
    const opacityRef = useRef(0)

    useFrame((_, delta) => {
        if (!overlayRef.current) return
        // Target value based on hover state
        const target = hovered ? 0.35 : 0
        // Damped interpolation
        opacityRef.current += (target - opacityRef.current) * 8 * delta
        overlayRef.current.opacity = opacityRef.current
    })

    return (
        <>
            <mesh
                onClick={onClick}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                geometry={nodes.bulletin.geometry}
                material={bakedMaterial}
                position={[0.78, 0.938, 1.916]}
                rotation={[0, 1.571, 0]}
            />

            {/* Highlight; might be a bit janky but ig it works */}
            <mesh
                geometry={nodes.bulletin.geometry}
                position={[0.78, 0.938, 1.916]}
                rotation={[0, 1.571, 0]}
            >
                <meshBasicMaterial
                    ref={overlayRef}
                    color="orange"
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </>
    )
}

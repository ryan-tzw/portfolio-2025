import { shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import smokeVertexShader from './shaders/smoke/vertex.glsl'
import smokeFragmentShader from './shaders/smoke/fragment.glsl'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { ShaderMaterial } from 'three'
import { ThreeElement } from '@react-three/fiber'

declare module '@react-three/fiber' {
    interface ThreeElements {
        smokeMaterial: ThreeElement<typeof ShaderMaterial>
    }
}

export default function Mug() {
    const { nodes } = useGLTF('./portfolio-2025-transformed.glb')

    // Baked texture
    const bakedTexture = useTexture('./baked.jpg')
    bakedTexture.flipY = false
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

    // Perlin texture
    const perlinTexture = useTexture('./perlin.png')
    perlinTexture.wrapS = THREE.RepeatWrapping
    perlinTexture.wrapT = THREE.RepeatWrapping

    // Smoke material
    const SmokeMaterial = shaderMaterial(
        {
            uTime: 0,
            uPerlinTexture: perlinTexture,
        },
        smokeVertexShader,
        smokeFragmentShader
    )
    extend({ SmokeMaterial })

    const smokeRef = useRef<THREE.ShaderMaterial>(null)
    const geometryRef = useRef<THREE.PlaneGeometry>(null)

    const { clock } = useThree()

    useFrame(() => {
        // Update the time uniform
        if (smokeRef.current) {
            smokeRef.current.uniforms.uTime.value = clock.getElapsedTime()
        }
    })

    return (
        <>
            <mesh
                geometry={(nodes.mug as THREE.Mesh).geometry}
                material={bakedMaterial}
                position={[0.147, 0.742, 1.554]}
                rotation={[0, 0.616, 0]}
            ></mesh>

            <mesh
                scale={[1.5, 6, 1.5]}
                position={[0.147, 0.742 + 0.15, 1.554]}
                rotation={[0, Math.PI + 1, 0]}
            >
                <planeGeometry args={[0.05, 0.05, 16, 64]} ref={geometryRef} />
                <smokeMaterial
                    ref={smokeRef}
                    side={THREE.DoubleSide}
                    transparent
                    depthWrite={false}
                />
            </mesh>
        </>
    )
}

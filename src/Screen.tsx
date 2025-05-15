import * as THREE from 'three'
import { Html, useGLTF, useTexture } from '@react-three/drei'
export default function Screen() {
    const { nodes } = useGLTF('./portfolio-2025-transformed.glb')

    // Baked texture
    const bakedTexture = useTexture('./baked.jpg')
    bakedTexture.flipY = false
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
    return (
        <>
            <mesh
                geometry={(nodes.screen as THREE.Mesh).geometry}
                material={bakedMaterial}
                position={[-0.522, 0.687, 1.731]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
                <Html
                    transform
                    wrapperClass="htmlScreen"
                    distanceFactor={0.364}
                    position={[0.025, 0.0275, -0.415]}
                    rotation={[Math.PI * 1.5, Math.PI / 2, 0]}
                >
                    <iframe src="https://basic-site-rtzw.vercel.app/" />
                </Html>
            </mesh>
        </>
    )
}

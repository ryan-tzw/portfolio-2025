import { Canvas } from '@react-three/fiber'
import Experience from './Experience.tsx'

export default function App() {
    return (
        <Canvas camera={{ fov: 45, position: [-0.5, 1.3, 0] }}>
            <Experience />
        </Canvas>
    )
}

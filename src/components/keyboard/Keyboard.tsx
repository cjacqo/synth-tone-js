import React, { useRef } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface KeyProps extends MeshProps {
  color: string;
}

const Key: React.FC<KeyProps> = (props) => {
  const mesh = useRef<THREE.Mesh>(null)
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 0.2, 4]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}

const Keyboard: React.FC = () => {
  const whiteKeys = []
  const blackKeys = []

  // Create white keys
  for (let i = 0; i < 7; i++) {
    whiteKeys.push(<Key position={[i * 1.1, 0, 0]} color='white' key={`white-${i}`} />)
  }

  // Create black keys
  for (let i = 0; i < 5; i++) {
    const offset = i < 2 ? 0.65 : 1.75
    blackKeys.push(<Key position={[i * 1.1 + offset, 0, -1]} color='black' key={`black-${i}`} />)
  }

  return (
    <Canvas camera={{ position: [0, 5, 0], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 5]} />
      {whiteKeys}
      {blackKeys}
    </Canvas>
  )
}

export default Keyboard
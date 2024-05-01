import React from 'react'
import { useSynth } from '../../hooks'
import AudioKeys from 'audiokeys'

const Keyboard: React.FC = () => {
  const { synth } = useSynth()

  console.log(AudioKeys)

  return (
    <div>Keyboard</div>
  )
}

export default Keyboard
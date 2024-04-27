import { useContext } from 'react'
import { SynthContext } from '../components/synth/Synth'

function useSynth() {
  const context = useContext(SynthContext)

  if (!context) {
    throw new Error('useSynth must be used within a SynthProvider')
  }

  return context
}

export default useSynth
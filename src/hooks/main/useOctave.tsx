import { useState } from 'react'

function useOctave(initialValue: number) {
  const [octave, setOctave] = useState(initialValue)

  const setOctaveValue = (newValue: number) => {
    if (newValue >= 0 && newValue <= 8) {
      setOctave(newValue)
    } else {
      console.warn('Value out of range (0 to 8):', newValue)
    }
  }

  return {
    octave,
    setOctaveValue
  }
}

export default useOctave
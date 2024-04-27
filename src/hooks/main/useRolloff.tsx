import { useState } from 'react'

function useRolloff() {
  const [rolloff, setRolloff] = useState(-12)

  const setRolloffValue = (newValue: number) => {
    setRolloff(newValue)
  }

  return {
    rolloff,
    setRolloffValue
  }
}

export default useRolloff
import { useState } from 'react'

function useQ(initialValue: number) {
  const [q, setQ] = useState(initialValue)

  const setQValue = (newValue: number) => {
    if (newValue >= 0 && newValue <= 10) {
      setQ(newValue)
    } else {
      console.warn('Value out of range (0 to 10):', newValue)
    }
  }

  return {
    q,
    setQValue
  }
}

export default useQ
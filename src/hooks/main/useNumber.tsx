import { useState } from 'react'

/**
 * @param initialValue Initial number value
 * @param min Minimum value number can be set to
 * @param max Maximum value number can be set to
 * @returns Value and setValue function
 */
function useNumber(initialValue: number, min: number, max: number) {
  const [number, setNumber] = useState<number>(initialValue)

  const setNumberValue = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setNumber(newValue)
    } else {
      console.warn(`Value out of range (${min} to ${max}): ${newValue}`)
    }
  }

  return {
    number,
    setNumberValue
  }
}

export default useNumber
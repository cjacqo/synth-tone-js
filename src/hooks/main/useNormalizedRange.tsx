import { useState } from 'react'

function useNormalizedRange(initialValue: number) {
  const [value, setValue] = useState(initialValue)

  const setRangeValue = (newValue: number) => {
    if (newValue >= 0 && newValue <= 1) {
      setValue(newValue)
    } else {
      console.warn('Value out of range (0 to 1):', newValue)
    }
  }

  const resetValue = () => {
    setValue(initialValue)
  }

  return {
    value,
    setRangeValue,
    resetValue
  }
}

export default useNormalizedRange
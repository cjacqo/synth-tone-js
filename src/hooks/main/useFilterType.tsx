import { useState } from 'react'

function useFilterType() {
  const [filterType, setFilterType] = useState('lowpass')

  const setFilterTypeValue = (newValue: string) => {
    setFilterType(newValue)
  }

  return {
    filterType,
    setFilterTypeValue
  }
}

export default useFilterType
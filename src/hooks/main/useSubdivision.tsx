import { useState } from 'react'
import { SubdivisionOptions } from '../../options/options'

function useSubdivision(initialValue: SubdivisionOptions) {
  const [selectedSubdivision, setSelectedSubdivision] = useState<SubdivisionOptions>(initialValue)

  const handleSubdivisionChange = (newValue: SubdivisionOptions) => {
    setSelectedSubdivision(newValue)
  }

  return {
    selectedSubdivision,
    onSubdivisionChange: handleSubdivisionChange
  }
}

export default useSubdivision
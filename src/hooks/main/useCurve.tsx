import { useState } from 'react'
import { EnvelopeCurve } from '../../options/options'

// Custom hook for managing evelope curves
const useCurve = (initialCurve: EnvelopeCurve = 'linear') => {
  const [curve, setCurve] = useState<EnvelopeCurve>(initialCurve)
  
  // Function to update the curve
  const setCurveType = (newCurve: EnvelopeCurve) => {
    setCurve(newCurve)
  }

  return {
    curve,
    setCurveType
  }
}

export default useCurve
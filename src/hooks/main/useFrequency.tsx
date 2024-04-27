import { useState } from 'react'
import { SubdivisionOptions, FrequencyTypes } from '../../options/options'

type FrequencyType = SubdivisionOptions | Note | number
type Note = string

function useFrequency(initialType: FrequencyTypes = FrequencyTypes.Number) {
  const [frequency, setFrequency] = useState({
    [FrequencyTypes.Subdivision]: '4n',
    [FrequencyTypes.Note]: 'C4',
    [FrequencyTypes.Number]: 440
  })
  const [type, setType] = useState<FrequencyTypes>(initialType)

  const setFrequencyWithType = (value: FrequencyType, type: FrequencyTypes) => {
    setFrequency(prev => ({ ...prev, [type]: value }))
  }

  const changeType = (newType: FrequencyTypes) => {
    setType(newType)
    setFrequency(prev => ({ ...prev, [newType]: frequency[newType] }))
  }

  return {
    frequency: frequency[type],
    frequencyType: type,
    setFrequency: setFrequencyWithType,
    setFrequencyType: changeType
  }
}

export default useFrequency
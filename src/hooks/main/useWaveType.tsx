import { useState } from 'react'

function useWaveType() {
  const [waveType, setWaveType] = useState<string>('sine')
  const [waveNumber, setWaveNumber] = useState<number>(1)

  const setWaveTypeValue = (newValue: string) => {
    setWaveType(newValue)
  }

  const setWaveNumberValue = (newValue: number) => {
    setWaveNumber(newValue)
  }

  return {
    waveType,
    setWaveTypeValue,
    waveNumber,
    setWaveNumberValue
  }
}

export default useWaveType
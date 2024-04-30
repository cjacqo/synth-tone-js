import { useFrequency, useNormalizedRange, useWaveType } from "./main";

function useAutoPanner() {
  const { value: depthValue, setRangeValue: setDepthRangeValue } = useNormalizedRange(0.5)
  const { frequency, setFrequency, frequencyType, setFrequencyType } = useFrequency()
  const { waveType, setWaveTypeValue, waveNumber, setWaveNumberValue } = useWaveType()
  const { value: wetValue, setRangeValue: setWetRangeValue } = useNormalizedRange(0.5)

  return {
    depth: { depthValue, setDepthRangeValue },
    frequency: { frequency, setFrequency, frequencyType, setFrequencyType },
    wave: { waveType, setWaveTypeValue, waveNumber, setWaveNumberValue },
    wet: { wetValue, setWetRangeValue }
  }
}

export default useAutoPanner
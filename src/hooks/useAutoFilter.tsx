import { useFilterType, useFrequency, useNormalizedRange, useOctave, useQ, useRolloff, useWaveType } from './main'

function useAutoFilter() {
  const { frequency: baseFrequency, setFrequency: setBaseFrequency, frequencyType: baseFrequencyType, setFrequencyType: setBaseFrequencyType } = useFrequency()
  const { value: depthValue, setRangeValue: setDepthRangeValue } = useNormalizedRange(0.5)
  const { frequency, setFrequency, frequencyType, setFrequencyType } = useFrequency()
  const { octave, setOctaveValue } = useOctave(1)
  const { value: wetValue, setRangeValue: setWetRangeValue } = useNormalizedRange(0.5)
  const { q, setQValue } = useQ(0)
  const { filterType, setFilterTypeValue } = useFilterType()
  const { rolloff, setRolloffValue } = useRolloff()
  const { waveType, setWaveTypeValue, waveNumber, setWaveNumberValue } = useWaveType()

  return {
    baseFrequency: { baseFrequency, setBaseFrequency, baseFrequencyType, setBaseFrequencyType },
    depth: { depthValue, setDepthRangeValue },
    frequency: { frequency, setFrequency, frequencyType, setFrequencyType },
    octave: { octave, setOctaveValue },
    wet: { wetValue, setWetRangeValue },
    q: { q, setQValue },
    filterType: { filterType, setFilterTypeValue },
    rolloff: { rolloff, setRolloffValue },
    wave: { waveType, setWaveTypeValue, waveNumber, setWaveNumberValue }
  }
}

export default useAutoFilter
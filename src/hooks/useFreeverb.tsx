import { useFrequency, useNormalizedRange } from './main'

function useFreeverb() {
  const { frequency: dampening, setFrequency: setDampening, frequencyType: dampeningType, setFrequencyType: setDampeningType } = useFrequency()
  const { value: roomSizeValue, setRangeValue: setRoomSizeValue } = useNormalizedRange(0.5)
  const { value: wetValue, setRangeValue: setWetRangeValue } = useNormalizedRange(0.5)

  return {
    dampening: { dampening, setDampening, dampeningType, setDampeningType },
    roomSize: { roomSizeValue, setRoomSizeValue },
    wet: { wetValue, setWetRangeValue }
  }
}

export default useFreeverb
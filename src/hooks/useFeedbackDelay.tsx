import { useNormalizedRange } from "./main";

function useFeedbackDelay() {
  const { value: delayTime, setRangeValue: setDelayTime } = useNormalizedRange(0.5)
  const { value: feedbackValue, setRangeValue: setFeedbackValue } = useNormalizedRange(0.5)
  const { value: wetValue, setRangeValue: setWetRangeValue } = useNormalizedRange(0.5)

  return {
    delayTime: { delayTime, setDelayTime },
    feedback: { feedbackValue, setFeedbackValue },
    wet: { wetValue, setWetRangeValue }
  }
}

export default useFeedbackDelay
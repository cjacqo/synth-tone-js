import { useCurve, useNormalizedRange, useNumber } from './main'

function useADSR() {
  // Attack Params: Time (secs) and Curve
  const { number: attackTime, setNumberValue: setAttackTime } = useNumber(0, 0, 20)
  const { curve: attackCurve, setCurveType: setAttackCurve } = useCurve()

  // Decay Params: Time (secs) and Curve
  const { number: decayTime, setNumberValue: setDecayTime } = useNumber(1, 0.15, 20)
  const { curve: decayCurve, setCurveType: setDecayCurve } = useCurve()

  // Sustain Params: Normal Range
  const { value: sustainAmount, setRangeValue: setSustainAmount } = useNormalizedRange(1)

  // Release Params: Time (secs) and Curve
  const { number: releaseTime, setNumberValue: setReleaseTime } = useNumber(5, 0, 20)
  const { curve: releaseCurve, setCurveType: setReleaseCurve } = useCurve()

  return {
    attack: {
      time: { attackTime, setAttackTime },
      curve: { attackCurve, setAttackCurve }
    },
    decay: {
      time: { decayTime, setDecayTime },
      curve: { decayCurve, setDecayCurve }
    },
    sustain: {
      amount: { sustainAmount, setSustainAmount }
    },
    release: {
      time: { releaseTime, setReleaseTime },
      curve: { releaseCurve, setReleaseCurve }
    }
  }
}

export default useADSR
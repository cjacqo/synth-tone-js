/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { Freeverb as TonFreeVerb } from 'tone'
import Title from '../../text/Title'
import Control from '../../controls/Control'
import { useFreeverb } from '../../../hooks';

interface FreeverbProps {
  freeVerb: TonFreeVerb;
}

const Freeverb: React.FC<FreeverbProps> = ({ freeVerb }) => {
  const { dampening, roomSize, wet } = useFreeverb()
  const freeVerbRef = useRef<TonFreeVerb | null>(freeVerb)

  useEffect(() => {
    if (freeVerbRef.current) {
      freeVerbRef.current.dampening = dampening.dampening
      freeVerbRef.current.roomSize.value = roomSize.roomSizeValue
      freeVerbRef.current.wet.value = wet.wetValue
    }
  }, [])

  useEffect(() => {
    if (freeVerbRef.current) {
      freeVerbRef.current.dampening = dampening.dampening
      freeVerbRef.current.roomSize.rampTo(roomSize.roomSizeValue, 0.1)
      freeVerbRef.current.wet.rampTo(wet.wetValue, 0.1)
    }
  }, [dampening.dampening, roomSize.roomSizeValue, wet.wetValue])

  const handleSetDampening = (value: string | number) => {
    dampening.setDampening(value, dampening.dampeningType)
  }

  const handleRoomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    roomSize.setRoomSizeValue(newValue)
  }

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    wet.setWetRangeValue(newValue)
  }

  return (
    <div>
      <Title.FX>Freeverb</Title.FX>
      <Control.Frequency
        label='Dampening'
        frequency={dampening.dampening}
        setFrequency={handleSetDampening}
        frequencyType={dampening.dampeningType}
        setFrequencyType={dampening.setDampeningType} />
      <Control.Range label='Room Size' value={roomSize.roomSizeValue} onChange={handleRoomSizeChange} />
      <Control.Range label='Wet' value={wet.wetValue} onChange={handleWetChange} />
    </div>
  )
}

export default Freeverb
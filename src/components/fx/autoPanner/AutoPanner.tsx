/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { AutoPanner as ToneAutoPanner, ToneOscillatorType } from 'tone'
import { useAutoPanner } from '../../../hooks'
import Title from '../../text/Title'
import Control from '../../controls/Control'

interface AutoPannerProps {
  autoPanner: ToneAutoPanner;
}

const AutoPanner: React.FC<AutoPannerProps> = ({ autoPanner }) => {
  const { depth, frequency, wave, wet } = useAutoPanner()
  const autoPannerRef = useRef<ToneAutoPanner | null>(autoPanner)

  useEffect(() => {
    if (autoPannerRef.current) {
      autoPannerRef.current.depth.value = depth.depthValue
      autoPannerRef.current.frequency.value = frequency.frequency
      autoPannerRef.current.type = `${wave.waveType}${wave.waveNumber}` as ToneOscillatorType
      autoPannerRef.current.wet.value = wet.wetValue
    }
  }, [])

  useEffect(() => {
    if (autoPannerRef.current) {
      autoPannerRef.current.depth.rampTo(depth.depthValue, 0.1)
      autoPannerRef.current.frequency.rampTo(frequency.frequency, 0.1)
      autoPannerRef.current.type = `${wave.waveType}${wave.waveNumber}` as ToneOscillatorType
      autoPannerRef.current.wet.rampTo(wet.wetValue, 0.1)
    }
  }, [depth.depthValue, frequency.frequency, wave.waveNumber, wave.waveType, wet.wetValue])

  const handleSetFrequency = (value: string | number) => {
    frequency.setFrequency(value, frequency.frequencyType)
  }

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    depth.setDepthRangeValue(newValue)
  }

  const handleWaveTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    wave.setWaveTypeValue(e.target.value)
  }

  const handleWaveNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    wave.setWaveNumberValue(newValue)
  }

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    wet.setWetRangeValue(newValue)
  }
  
  return (
    <div>
      <Title.FX>Auto Panner</Title.FX>
      <Control.Frequency
        label='Frequency'
        frequency={frequency.frequency}
        setFrequency={handleSetFrequency}
        frequencyType={frequency.frequencyType}
        setFrequencyType={frequency.setFrequencyType} />
      <Control.Range label='Depth' value={depth.depthValue} onChange={handleDepthChange} />
      <Control.WaveType
        waveType={wave.waveType} onWaveTypeChange={handleWaveTypeChange}
        waveNumber={wave.waveNumber} onWaveNumberChange={handleWaveNumberChange} />
      <Control.Range label='Wet' value={wet.wetValue} onChange={handleWetChange} />
    </div>
  )
}

export default AutoPanner
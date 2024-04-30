/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { FilterRollOff, AutoFilter as ToneAutoFilter, ToneOscillatorType } from 'tone'
import { useAutoFilter } from '../../../hooks'
import Title from '../../text/Title'
import Control from '../../controls/Control'
import Select from '../../inputs/Select'

// SIMPLE TEST: Remove props and find a better way to connect effects and synths to destination in a global space
interface AutoFilterProps {
  autoFilter: ToneAutoFilter;
}

const AutoFilter: React.FC<AutoFilterProps> = ({ autoFilter }) => {
  const { baseFrequency, depth, frequency, octave, wet, q, filterType, rolloff, wave } = useAutoFilter()

  const autoFilterRef = useRef<ToneAutoFilter | null>(autoFilter)

  /**
   * Generate an instance of the ToneAutoFilter and save it to the autoFilterRef
   * - prevents multiple instances being created on browser updates
   */
  useEffect(() => {
    if (autoFilterRef.current) {
      autoFilterRef.current.baseFrequency = baseFrequency.baseFrequency
      autoFilterRef.current.depth.value = depth.depthValue
      autoFilterRef.current.frequency.value = frequency.frequency
      autoFilterRef.current.octaves = octave.octave
      autoFilterRef.current.wet.value = wet.wetValue
      autoFilterRef.current.filter.Q.value = q.q
      autoFilterRef.current.filter.type = filterType.filterType as BiquadFilterType
      autoFilterRef.current.filter.rolloff = rolloff.rolloff as FilterRollOff
      autoFilterRef.current.type = `${wave.waveType}${wave.waveNumber}` as ToneOscillatorType
    }
    // return () => {
    //   autoFilterRef.current?.dispose() // Cleanup the filter on component unmount
    // }
  }, [])

  /**
   * Update AutoFilter when properties change
   */
  useEffect(() => {
    if (autoFilterRef.current) {
      autoFilterRef.current.baseFrequency = baseFrequency.baseFrequency
      autoFilterRef.current.depth.rampTo(depth.depthValue, 0.1)
      autoFilterRef.current.frequency.rampTo(frequency.frequency, 0.1)
      autoFilterRef.current.octaves = octave.octave
      autoFilterRef.current.wet.rampTo(wet.wetValue, 0.1)
      autoFilterRef.current.filter.Q.rampTo(q.q, 0.1)
      autoFilterRef.current.filter.type = filterType.filterType as BiquadFilterType
      autoFilterRef.current.filter.rolloff = rolloff.rolloff as FilterRollOff
      autoFilterRef.current.type = `${wave.waveType}${wave.waveNumber}` as ToneOscillatorType
    }
  }, [baseFrequency.baseFrequency, depth.depthValue, filterType.filterType, frequency.frequency, octave.octave, wave.waveNumber, wave.waveType, wet.wetValue, q.q, rolloff.rolloff])


  const handleSetBaseFrequency = (value: string | number) => {
    baseFrequency.setBaseFrequency(value, baseFrequency.baseFrequencyType)
  }

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    depth.setDepthRangeValue(newValue)
  }

  const handleSetFrequency = (value: string | number) => {
    frequency.setFrequency(value, frequency.frequencyType)
  }

  const handleOctaveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value)
    octave.setOctaveValue(newValue)
  }

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    wet.setWetRangeValue(newValue)
  }

  const handleQChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    q.setQValue(newValue)
  }

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterType.setFilterTypeValue(e.target.value)
  }

  const handleRolloffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value)
    rolloff.setRolloffValue(newValue)
  }

  const handleWaveTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    wave.setWaveTypeValue(e.target.value)
  }

  const handleWaveNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    wave.setWaveNumberValue(newValue)
  }
  
  return (
    <div>
      <Title.FX>Auto Filter</Title.FX>
      {/**
       * This is the fundamental frequency where the filter's cutoff is centered around. When you adjust this parameter,
       * you're essentially moving the starting point of the filter's cutoff frequency up or down the frequency spectrum.
       * This change is typically quite audible, as it affects the frequencies that the filter allows through or attenuates
       */}
      <Control.Frequency
        label='Base Frequency'
        frequency={baseFrequency.baseFrequency}
        setFrequency={handleSetBaseFrequency}
        frequencyType={baseFrequency.baseFrequencyType}
        setFrequencyType={baseFrequency.setBaseFrequencyType} />
      <Control.Range label='Depth' value={depth.depthValue} onChange={handleDepthChange} />
      {/**
       * This parameter is not the frequency of the sound itself but rather the frequency of the filter's modulation.
       * In other words, it controls how fast the filter's cutoff frequency oscillates around the BaseFrequency.
       * If the Frequency of the modulation is very low, you might not notice much change because the cutoff frequency is
       * moving slowly. As the frequency of this modulation increases, you should notice that the filter effect becomes more
       * pronounced and creates a more noticeable wah-wah or phaser-like effect.
       */}
      <Control.Frequency
        label='Frequency'
        frequency={frequency.frequency}
        setFrequency={handleSetFrequency}
        frequencyType={frequency.frequencyType}
        setFrequencyType={frequency.setFrequencyType} />
      <Select.Octave value={octave.octave} onChange={handleOctaveChange} />
      <Control.Range label='Wet' value={wet.wetValue} onChange={handleWetChange} />
      <Control.FilterParams
        q={q.q} onQChange={handleQChange}
        filterType={filterType.filterType} onFilterTypeChange={handleFilterTypeChange}
        rolloff={rolloff.rolloff} onRolloffChange={handleRolloffChange} />
      <Control.WaveType
        waveType={wave.waveType} onWaveTypeChange={handleWaveTypeChange}
        waveNumber={wave.waveNumber} onWaveNumberChange={handleWaveNumberChange} />
    </div>
  )
}

export default AutoFilter
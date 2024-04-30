import React from 'react'
import Envelope from './Envelope'
import FilterParams from './FilterParams'
import Frequency from './Frequency'
import Range from './Range'
import WaveType from './WaveType'

const Control: React.FC &
  {
    Envelope: typeof Envelope,
    FilterParams: typeof FilterParams,
    Frequency: typeof Frequency,
    Range: typeof Range,
    WaveType: typeof WaveType,
  } = () => {
  return <div>Control Components</div>
}

Control.Envelope = Envelope
Control.FilterParams = FilterParams
Control.Frequency = Frequency
Control.Range = Range
Control.WaveType = WaveType

export default Control
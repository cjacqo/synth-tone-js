import React from 'react'
import DepthRange from './DepthRange'
import Envelope from './Envelope'
import WetRange from './WetRange'
import WaveType from './WaveType'
import FilterParams from './FilterParams'
import Frequency from './Frequency'

const Control: React.FC &
  {
    DepthRange: typeof DepthRange
    Envelope: typeof Envelope,
    FilterParams: typeof FilterParams,
    Frequency: typeof Frequency,
    WaveType: typeof WaveType,
    WetRange: typeof WetRange
  } = () => {
  return <div>Control Components</div>
}

Control.DepthRange = DepthRange
Control.Envelope = Envelope
Control.FilterParams = FilterParams
Control.Frequency = Frequency
Control.WaveType = WaveType
Control.WetRange = WetRange

export default Control
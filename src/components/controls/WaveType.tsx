import React from 'react'
import Select from '../inputs/Select'

interface WaveTypeProps {
  waveType: string;
  onWaveTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  waveNumber: number;
  onWaveNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const WaveType: React.FC<WaveTypeProps> = ({
  waveType,
  onWaveTypeChange,
  waveNumber,
  onWaveNumberChange
}) => {
  return (
    <>
      <Select.WaveType value={waveType} onChange={onWaveTypeChange} />
      <Select.Number value={waveNumber} onChange={onWaveNumberChange} min={1} max={32} step={1} />
    </>
  )
}

export default WaveType
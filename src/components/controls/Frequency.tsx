import React from 'react'
import { FrequencyTypes, SubdivisionOptions } from '../../options/options'
import Select from '../inputs/Select'

interface FrequencyProps {
  label: string;
  frequency: string | number;
  setFrequency: (value: string | number) => void;
  frequencyType: FrequencyTypes;
  setFrequencyType: (type: FrequencyTypes) => void;
}

const Frequency: React.FC<FrequencyProps> = ({
  label,
  frequency,
  setFrequency,
  frequencyType,
  setFrequencyType
}) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequencyType(e.target.value as FrequencyTypes)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFrequency(e.target.value)
  }

  const renderInput = () => {
    switch (frequencyType) {
      case FrequencyTypes.Subdivision:
        return <Select.Subdivision value={frequency as SubdivisionOptions} onChange={handleValueChange} />
      case FrequencyTypes.Note:
        return <Select.Note value={frequency as string} onChange={handleValueChange} />
      case FrequencyTypes.Number:
        return <Select.Hertz value={frequency as number} onChange={handleValueChange} />
    }
  }

  return (
    <div className='flex ac'>
      <label>{label}:</label>
      &nbsp;
      <select className='fit-content' value={frequencyType} onChange={handleTypeChange}>
        {Object.values(FrequencyTypes).map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {renderInput()}
    </div>
  )
}

export default Frequency
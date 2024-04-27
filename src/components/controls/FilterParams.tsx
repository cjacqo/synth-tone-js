import React from 'react'
import Select from '../inputs/Select'
import Q from './Q'

interface FilterParamsProps {
  q: number;
  onQChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterType: string;
  onFilterTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  rolloff: number;
  onRolloffChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const FilterParams: React.FC<FilterParamsProps> = ({
  q,
  onQChange,
  filterType,
  onFilterTypeChange,
  rolloff,
  onRolloffChange
}) => {
  return (
    <>
      <Q value={q} onChange={onQChange} />
      <Select.FilterType value={filterType} onChange={onFilterTypeChange} />
      <Select.Rolloff value={rolloff} onChange={onRolloffChange} />
    </>
  )
}

export default FilterParams
import React from 'react'
import Select from '../inputs/Select'

interface RangeProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Range: React.FC<RangeProps> = ({
  label,
  value,
  onChange
}) => {
  return <Select.NormalizedRange label={label} value={value} onChange={onChange} />
}

export default Range
import React from 'react'
import Select from '../inputs/Select'

interface WetRangeProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const WetRange: React.FC<WetRangeProps> = ({
  value,
  onChange
}) => {
  return <Select.NormalizedRange label='Wet' value={value} onChange={onChange} />
}

export default WetRange
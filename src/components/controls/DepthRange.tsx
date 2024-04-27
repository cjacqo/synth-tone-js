import React from 'react'
import Select from '../inputs/Select'

interface DepthRangeProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const DepthRange: React.FC<DepthRangeProps> = ({
  value,
  onChange
}) => {
  return <Select.NormalizedRange label='Depth' value={value} onChange={onChange} />
}

export default DepthRange
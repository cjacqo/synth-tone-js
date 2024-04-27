import React from 'react'
import Select from '../inputs/Select'

interface QProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Q: React.FC<QProps> = ({
  value,
  onChange
}) => {
  return <Select.Number label='Q' value={value} onChange={onChange} min={0} max={10} step={0.5} />
}

export default Q
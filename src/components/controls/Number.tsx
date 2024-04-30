import React from 'react'
import Select from '../inputs/Select'

interface NumberProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Number: React.FC<NumberProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange
}) => {
  return <Select.Number label={label} value={value} min={min} max={max} step={step} onChange={onChange} />
}

export default Number
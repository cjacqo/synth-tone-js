import React from 'react'
import { SubdivisionOptions } from '../../options/options'

interface SelectProps<T> {
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { label: string; value: T }[];
}

// Make the Select component generic without any default type
const Select = <T,>(props: SelectProps<T>) => {
  return (
    <select value={props.value as unknown as string} onChange={props.onChange}>
      {props.options?.map(option => (
        <option key={option.value as unknown as React.Key} value={option.value as unknown as string}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

/**
 * Subdivision using SubdivisionOptions
 * */
const subdivisionOptions = Object.values(SubdivisionOptions).map(value => ({ label: value, value }))
const Subdivision: React.FC<SelectProps<SubdivisionOptions>> = (props) => {
  return <Select {...props} options={subdivisionOptions} />
}
Select.Subdivision = Subdivision

/**
 * Note
 */
// Generate the notes
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const alterations = ['bb', 'b', '', '#', 'x']
// Generator the octaves
const octaves = Array.from({ length: 10 }, (_, i) => i - 1)
// Generate the notes options combining the notes with alterations
const noteOptions = notes.flatMap(note => 
  alterations.flatMap(alter => 
    octaves.map(octave => ({
      label: `${note}${alter}${octave}`,
      value: `${note}${alter}${octave}`
    }))
  )
)
const Note: React.FC<SelectProps<string>> =(props) => {
  return <Select {...props} options={noteOptions} />
}
Select.Note = Note

/**
 * Hertz
 */
interface HertzProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}
const Hertz: React.FC<HertzProps> = ({
  value,
  onChange,
  min = 0,
  max = 20000,
  step = 1
}) => {
  return (
    <div className='flex'>
      <input type='range' value={value} onChange={onChange} min={min} max={max} step={step} />
      <p>{value}&nbsp;{value < 1000 ? 'hz' : 'khz'}</p>
    </div>
  )
}
Select.Hertz = Hertz

/**
 * Normalized Range
 */
interface NormalizedRangeProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const NormalizedRange: React.FC<NormalizedRangeProps> = ({
  label,
  value,
  onChange
}) => {
  return (
    <div className="flex">
      <label>{label}: {value.toFixed(2)}</label>
      <input type="range" min='0' max='1' step='0.01' value={value} onChange={onChange} />
    </div>
  )
}
Select.NormalizedRange = NormalizedRange

/**
 * Octave
 */
const octaveOptions = Array.from({ length: 9 }, (_, i) => i).map(octave => ({
  label: octave.toString(),
  value: octave
}))
const Octave: React.FC<SelectProps<number>> = (props) => {
  return (
    <>
      <label>Octave:&nbsp;</label>
      <Select {...props} options={octaveOptions} />
    </>
  )
}
Select.Octave = Octave

/**
 * Number
 */
interface NumberProps {
  label?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}
const Number: React.FC<NumberProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 20000,
  step = 1
}) => {
  return (
    <div className='flex'>
      {label && <p>{label}: {value}</p>}
      <input type='range' value={value} onChange={onChange} min={min} max={max} step={step} />
    </div>
  )
}
Select.Number = Number

/**
 * Rolloff
 */
const rollOffValues = [-12,  -24, -48, -96]
const rollOffOptions = rollOffValues.map(value => ({
  label: `${value} dB/Oct`,
  value: value
}))
const Rolloff: React.FC<SelectProps<number>> = (props) => {
  return (
    <>
      <label>Rolloff:&nbsp;</label>
      <Select {...props} options={rollOffOptions} />
    </>
  )
}
Select.Rolloff = Rolloff

/**
 * FilterType
 */
const filterTypeValues = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking']
const filterTypeOptions = filterTypeValues.map(value => ({
  label: value,
  value: value
}))
const FilterType: React.FC<SelectProps<string>> = (props) => {
  return (
    <>
      <label>Filter Types:&nbsp;</label>
      <Select {...props} options={filterTypeOptions} />
    </>
  )
}
Select.FilterType = FilterType

/**
 * WaveType
 */
const waveTypeOptions = [
  { label: 'sine', value: 'sine' },
  { label: 'square', value: 'square' },
  { label: 'sawtooth', value: 'sawtooth' },
  { label: 'triangle', value: 'triangle' }
]
const WaveType: React.FC<SelectProps<string>> = (props) => {
  return (
    <>
      <label>Wave Type:&nbsp;</label>
      <Select {...props} options={waveTypeOptions} />
    </>
  )
}
Select.WaveType = WaveType

export default Select

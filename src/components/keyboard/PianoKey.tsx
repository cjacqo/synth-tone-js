import React from 'react'

interface PianoKeyProps {
  color: string;
  note: string;
}

const PianoKey: React.FC<PianoKeyProps> = ({ color, note }) => {
  return (
    <div className={`key ${color}`}>
      <div className='key-text'>
        {note[0].toUpperCase() + note.slice(1).toLowerCase()}
      </div>
    </div>
  )
}

export default PianoKey
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useSynth } from '../../hooks'
import * as Tone from 'tone'
import AudioKeys from 'audiokeys'
import PianoKey from './PianoKey'
import Knob from '../knob/Knob'

interface AudioKeysEvent {
  keyCode: number;
  note: number;
  frequency: number;
  velocity: number;
  isActive: boolean;
}

const Keyboard: React.FC = () => {
  const { synth } = useSynth()

  const keyboard = new AudioKeys({
    rows: 1,
  })

  const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): T => {
    let timeout: ReturnType<typeof setTimeout>
    return ((...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), delay)
    }) as T
  }

  Tone.Transport.start()
  
  const triggerNote = debounce((key: AudioKeysEvent) => {
    if (Tone.context.state !== 'running') {
      Tone.start()
      console.log('started')
    }
    const time = Tone.Transport.seconds
    console.log(time)
    synth.triggerAttack(key.frequency, time)
  }, 0)

  const releaseNote = () => {
    synth.triggerRelease()
    Tone.Transport.cancel()
  }

  keyboard.down(triggerNote)
  keyboard.up(releaseNote)
  
  const notes = ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b', 'c', 'db', 'd', 'eb']

  const renderKeys = () => {
    return notes.map((note, index) => {
      return (
        <PianoKey key={index} note={note} color={note.length == 2 ? 'black' : 'white'} />
      )
    })
  }

  // Prevent default action of the 48 key (') from opening the finder in browser
  document.addEventListener('keydown', function(e) {
    if (e.key === '\'') {
      e.preventDefault()
    }
  })

  return (
    <>
      <div className='keyboard'>
        {renderKeys()}
        
        {/* <Knob
          degrees={180}
          size={150}
          min={1}
          max={100}
          value={0}
          numTicks={125} /> */}
      </div>
      <Knob label='Volume' />
    </>
  )
}

export default Keyboard
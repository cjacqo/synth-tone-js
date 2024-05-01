/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useSynth } from '../../hooks'
import * as Tone from 'tone'
import AudioKeys from 'audiokeys'

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
    const time = Tone.Transport.seconds + 0.1
    synth.triggerAttackRelease(key.frequency, '8n', time)
  }, 0)

  keyboard.down(triggerNote)
  
  return (
    <div>Keyboard</div>
  )
}

export default Keyboard
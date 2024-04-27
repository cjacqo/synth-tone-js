import React, { createContext, useEffect, useRef } from 'react'
import * as Tone from 'tone'
import { useADSR } from '../../hooks'
import { BasicEnvelopeCurve } from '../../options/options'
import Control from '../controls/Control';

interface SynthContextType {
  synth: Tone.Synth;
  playNote: (note: string, duration: string) => void;
}

// Create the context
export const SynthContext = createContext<SynthContextType | undefined>(undefined)

interface SynthProviderProps {
  children: React.ReactNode;
}

// Provider component
const SynthProvider: React.FC<SynthProviderProps> = ({ children }) => {
  const synthRef = useRef<Tone.Synth>(new Tone.Synth())
  const { attack, decay, sustain, release } = useADSR()

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.envelope.set({
        attack: attack.time.attackTime,
        attackCurve: attack.curve.attackCurve,
        decay: decay.time.decayTime,
        decayCurve: decay.curve.decayCurve as BasicEnvelopeCurve,
        sustain: sustain.amount.sustainAmount,
        release: release.time.releaseTime,
        releaseCurve: release.curve.releaseCurve
      })
    }
  }, [attack, decay, sustain, release])

  // WILL NOT NEED THIS HERE: CURRENTLY NOT USED
  const playNote = (note: string, duration: string) => {
    synthRef.current.triggerAttackRelease(note, duration)
  }

  return (
    <SynthContext.Provider value={{ synth: synthRef.current, playNote }}>
      {/**
       * ADD SYNTH CONTROLS HERE: ADSR CONTROLS, VOLUME, WAVE TYPE, PORTAMENTO, DETUNE, ETC.
       */}
      <Control.Envelope envelope={{ attack, decay, sustain, release }} />
      {children}
    </SynthContext.Provider>
  )
}

export default SynthProvider
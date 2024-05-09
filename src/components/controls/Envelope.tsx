import React from 'react'
import Select from '../inputs/Select'
import { EnvelopeCurve } from '../../options/options'
import ADSR from './ADSR';

interface EnvelopeParams {
  attack: {
    time: { attackTime: number; setAttackTime: (value: number) =>  void; };
    curve: { attackCurve: EnvelopeCurve; setAttackCurve: (value: EnvelopeCurve) => void; };
  };
  decay: {
    time: { decayTime: number; setDecayTime: (value: number) =>  void; };
    curve: { decayCurve: EnvelopeCurve; setDecayCurve: (value: EnvelopeCurve) => void; };
  };
  sustain: {
    amount: { sustainAmount: number; setSustainAmount: (value: number) =>  void; };
  };
  release: {
    time: { releaseTime: number; setReleaseTime: (value: number) =>  void; };
    curve: { releaseCurve: EnvelopeCurve; setReleaseCurve: (value: EnvelopeCurve) => void; };
  }
}

interface EnvelopeProps {
  envelope: EnvelopeParams;
  setEnvelope?: (params: EnvelopeParams) => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ envelope }) => {
  const { attack, decay, sustain, release } = envelope
  
  return (
    <>
      <ADSR
        attackTime={attack.time.attackTime}
        decayTime={decay.time.decayTime}
        sustainLevel={sustain.amount.sustainAmount}
        releaseTime={release.time.releaseTime}
        setAttackTime={attack.time.setAttackTime}
        setDecayTime={decay.time.setDecayTime}
        setSustainLevel={sustain.amount.setSustainAmount}
        setReleaseTime={release.time.setReleaseTime} />
      <Select.Number
        label='Attack'
        value={Math.round(attack.time.attackTime * 100) / 100}
        min={0} max={20} step={0.01}
        onChange={e => attack.time.setAttackTime(parseFloat(e.target.value))} />
      <Select.Number
        label='Decay'
        value={Math.round(decay.time.decayTime * 100) / 100}
        min={0.15} max={20} step={0.01}
        onChange={e => decay.time.setDecayTime(parseFloat(e.target.value))} />
      <Select.NormalizedRange
        label='Sustain'
        value={sustain.amount.sustainAmount}
        onChange={e => sustain.amount.setSustainAmount(parseFloat(e.target.value))} />
      <Select.Number
        label='Release'
        value={Math.round(release.time.releaseTime * 100) / 100}
        min={0} max={20} step={0.01}
        onChange={e => release.time.setReleaseTime(parseFloat(e.target.value))} />
    </>
  )
}

export default Envelope
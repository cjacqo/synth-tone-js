import React, { useEffect, useState } from 'react'
import { useSynth } from '../../hooks'
import * as Tone from 'tone'
import AutoFilter from './autoFilter/AutoFilter'
import AutoPanner from './autoPanner/AutoPanner'
import Freeverb from './freeVerb/FreeVerb'
import FeedbackDelay from './feedbackDelay/FeedbackDelay'

const FXChain: React.FC = () => {
  const { synth } = useSynth()
  const [effects, setEffects] = useState<{ node: Tone.ToneAudioNode, type: string }[]>([])

  useEffect(() => {
    // Whenever effects order or effects themselves change, re-route them
    synth.disconnect()
    let currentSource = synth as Tone.ToneAudioNode
    if (effects.length !== 0) {
      effects.forEach(effect => {
        currentSource.connect(effect.node)
        currentSource = effect.node
      })
    }
    currentSource.toDestination()
  }, [effects, synth])

  const addEffect = (type: string) => {
    let effect: Tone.ToneAudioNode | undefined
    switch (type) {
      case 'AutoFilter':
        effect = new Tone.AutoFilter()
        break
      case 'AutoPanner':
        effect = new Tone.AutoPanner()
        break
      case 'FeedbackDelay':
        effect = new Tone.FeedbackDelay()
        break
      case 'Freeverb':
        effect = new Tone.Freeverb()
        break
      default:
        console.warn('Unkown effect type:', type)
    }
    if (effect) {
      setEffects(prev => [...prev, { node: effect, type }])
    }
  }

  const removeEffect = (effectIndex: number) => {
    const effectToDispose = effects[effectIndex].node
    effectToDispose.disconnect()
    effectToDispose.dispose()
    setEffects(prev => prev.filter((_, index) => index !== effectIndex))
  }

  return (
    <div>
      <button onClick={() => addEffect('AutoFilter')}>Add Auto Filter</button>
      <button onClick={() => addEffect('AutoPanner')}>Add Auto Panner</button>
      <button onClick={() => addEffect('FeedbackDelay')}>Add Feedback Delay</button>
      <button onClick={() => addEffect('Freeverb')}>Add Freeverb</button>
      {effects.map((effect, index) => (
        effect.node instanceof Tone.AutoFilter ?
          <AutoFilter key={index} autoFilter={effect.node as Tone.AutoFilter} /> :
        effect.node instanceof Tone.AutoPanner ?
          <AutoPanner key={index} autoPanner={effect.node as Tone.AutoPanner} /> :
        effect.node instanceof Tone.FeedbackDelay ?
          <FeedbackDelay key={index} feedbackDelay={effect.node as Tone.FeedbackDelay} /> :
        effect.node instanceof Tone.Freeverb ?
          <Freeverb key={index} freeVerb={effect.node as Tone.Freeverb} />
          : <p key={index}>Effect: {effect.type}</p>
      ))}
    </div>
  )
}

export default FXChain
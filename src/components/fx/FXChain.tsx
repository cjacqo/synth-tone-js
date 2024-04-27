import React, { useEffect, useState } from 'react'
import { useSynth } from '../../hooks'
import * as Tone from 'tone'
import AutoFilter from './autoFilter/AutoFilter'

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

  const start = () => {
    if (Tone.context.state !== 'running') {
      Tone.start()
      console.log('started')
    }
    synth.triggerAttackRelease('C4', '1m')
  }

  return (
    <div>
      <button onClick={() => addEffect('AutoFilter')}>Add Auto Filter</button>
      {effects.map((effect, index) => (
        effect.node instanceof Tone.AutoFilter ?
          <AutoFilter key={index} autoFilter={effect.node as Tone.AutoFilter} />
          : <p key={index}>Effect: {effect.type}</p>
      ))}
      <button onClick={start}>Play</button>
    </div>
  )
}

export default FXChain
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { FeedbackDelay as ToneFeedbackDelay } from 'tone'
import Title from '../../text/Title'
import Control from '../../controls/Control'
import useFeedbackDelay from '../../../hooks/useFeedbackDelay';

interface FeedbackDelayProps {
  feedbackDelay: ToneFeedbackDelay;
}

const FeedbackDelay: React.FC<FeedbackDelayProps> = ({ feedbackDelay }) => {
  const { delayTime, feedback, wet } = useFeedbackDelay()
  const feedbackDelayRef = useRef<ToneFeedbackDelay | null>(feedbackDelay)

  useEffect(() => {
    if (feedbackDelayRef.current) {
      feedbackDelayRef.current.delayTime.value = delayTime.delayTime
      feedbackDelayRef.current.feedback.value = feedback.feedbackValue
      feedbackDelayRef.current.wet.value = wet.wetValue
    }
  }, [])

  useEffect(() => {
    if (feedbackDelayRef.current) {
      feedbackDelayRef.current.delayTime.rampTo(delayTime.delayTime, 0.1)
      feedbackDelayRef.current.feedback.rampTo(feedback.feedbackValue, 0.1)
      feedbackDelayRef.current.wet.rampTo(wet.wetValue, 0.1)
    }
  }, [delayTime.delayTime, feedback.feedbackValue, wet.wetValue])

  const handleDelayTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    delayTime.setDelayTime(newValue)
  }

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    feedback.setFeedbackValue(newValue)
  }

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    wet.setWetRangeValue(newValue)
  }

  return (
    <div>
      <Title.FX>Feedback Delay</Title.FX>
      <Control.Range label='Delay Time' value={delayTime.delayTime} onChange={handleDelayTimeChange} />
      <Control.Range label='Feedback' value={feedback.feedbackValue} onChange={handleFeedbackChange} />
      <Control.Range label='Wet' value={wet.wetValue} onChange={handleWetChange} />
    </div>
  )
}

export default FeedbackDelay
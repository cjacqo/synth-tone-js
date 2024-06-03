import React, { useEffect, useState, useRef } from 'react'

interface ADSRProps {
  attackTime: number;
  decayTime: number;
  sustainLevel: number;
  releaseTime: number;
  setAttackTime: (value: number) => void;
  setDecayTime: (value: number) => void;
  setSustainLevel: (value: number) => void;
  setReleaseTime: (value: number) => void;
}

interface Point {
  x: number;
  y: number;
  color: string;
}

interface Points {
  attack: Point;
  decay: Point;
  sustain: Point;
  release: Point;
}

// Variables for width and height of canvas, threshold for click, and width of a section
const width: number = 800
const height: number = 600
const sectionWidth: number = width / 4
const clickThreshold: number = 10
const maxTime: number = 20 // seconds

const ADSR: React.FC<ADSRProps> = ({
  attackTime, decayTime, sustainLevel, releaseTime,
  setAttackTime, setDecayTime, setSustainLevel, setReleaseTime
}) => {
  // Set a ref for the canvas element and the context
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  // State to manage what is being dragged, if anything
  const [isDragging, setIsDragging] = useState<string | null>(null)

  const calculateXPosition = () => {
    const attackX = ((attackTime / maxTime) * sectionWidth)
    const decayX = sectionWidth + (decayTime / maxTime) * sectionWidth
    const sustainX = 3 * sectionWidth
    const releaseX = 3 * sectionWidth + (releaseTime / maxTime) * sectionWidth

    return {
      attackX,
      decayX,
      sustainX,
      releaseX
    }
  }

  // Calculate initial points based on props
  const calculateInitialPoints = () => {
    const xPoints = calculateXPosition()

    return {
      attack: { x: xPoints.attackX, y: height - 400, color: 'cyan' },
      decay: { x: xPoints.decayX, y: height - 400 * sustainLevel, color: 'orange' },
      sustain: { x: xPoints.sustainX, y: height - 400 * sustainLevel, color: 'pink' },
      release: { x: xPoints.releaseX, y: height, color: 'purple' }
    }
  }

  const calculatePoints = () => {
    const xPoints = calculateXPosition()

    return {
      attack: { x: xPoints.attackX, y: points.attack.y, color: points.attack.color },
      decay: { x: xPoints.decayX, y: height - 400 * sustainLevel, color: points.decay.color },
      sustain: { x: xPoints.sustainX, y: height - 400 * sustainLevel, color: points.sustain.color },
      release: { x: xPoints.releaseX, y: points.release.y, color: points.release.color }
    }
  }

  // State to manage points
  const [points, setPoints] = useState<Points>(calculateInitialPoints)

  // Update points when props change
  useEffect(() => {
    const newPoints = calculatePoints()
    setPoints(newPoints)
    drawADSR(newPoints)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attackTime, decayTime, sustainLevel, releaseTime])

  // On initial render, set the context of the canvas element
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    contextRef.current = context
    drawADSR(points)

    const handleMouseDown = (e: MouseEvent) => {
      const { offsetX, offsetY } = e
      for (const key in points) {
        const point = points[key as keyof Points]
        if (Math.abs(point.x - offsetX) < clickThreshold && Math.abs(point.y - offsetY) < clickThreshold) {
          setIsDragging(key)
          return
        }
      }
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const { offsetX, offsetY } = e
      switch (isDragging) {
        case 'attack':
          updatePoint('attack', Math.min(Math.max(offsetX, 0), sectionWidth), points.attack.y)
          break
        case 'decay':
          updatePoint('decay', Math.min(Math.max(offsetX, sectionWidth), 2 * sectionWidth), points.decay.y)
          break
        case 'sustain':
          // eslint-disable-next-line no-case-declarations
          const constrainedY = Math.min(Math.max(offsetY, height - 400), height)
          updatePoint('sustain', points.sustain.x, constrainedY)
          updatePoint('decay', points.decay.x, constrainedY)
          break
        case 'release':
          updatePoint('release', Math.min(Math.max(offsetX, 2 * sectionWidth), 3 * sectionWidth), points.release.y)
          break
        default:
          break
      }
    }

    const handleMouseUp = () => {
      setIsDragging(null)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, isDragging])

  // Function to draw ADSR elements in canvas
  const drawADSR = (points: Points) => {
    const context = contextRef.current
    if (!context) return
    const { attack, decay, sustain, release } = points
    // Draw lines
    context.clearRect(0, 0, width, height)
    context.beginPath()
    context.moveTo(0, height)
    context.lineTo(attack.x, attack.y)
    context.lineTo(decay.x, decay.y)
    context.lineTo(sustain.x, sustain.y)
    context.lineTo(release.x, release.y)
    context.stroke()
    // Draw control points
    for (const key in points) {
      const point = points[key as keyof Points]
      context.beginPath()
      context.arc(point.x, point.y, clickThreshold, 0, Math.PI * 2)
      context.fillStyle = point.color
      context.fill()
    }
  }

  // Function to update state of a point
  const updatePoint = (name: keyof Points, x: number, y: number) => {
    setPoints(prevPoints => {
      const updatedPoints = { ...prevPoints, [name]: { ...prevPoints[name], x, y} }

      console.log(((x / sectionWidth) * maxTime))

      switch (name) {
        case 'attack':
          setAttackTime(((x / sectionWidth) * maxTime))
          break
        case 'decay':
          setDecayTime(((x - sectionWidth) / sectionWidth) * maxTime)
          break
        case 'sustain':
          setSustainLevel((height - y) / 400)
          break
        case 'release':
          setReleaseTime(((x - 2 * sectionWidth) / sectionWidth) * maxTime)
          break
        default:
          break
      }
      return updatedPoints
    })
  }

  return (
    <canvas ref={canvasRef} id='canvas' width={width} height={height} style={{ border: '1px solid black' }} />
  )
}

export default ADSR
import React, { useEffect, useRef, useState } from 'react'

const width = 200
const height = 200
const centerX = width / 2
const centerY = height / 2
const radius = 80
const pointerLength = 60

const Knob: React.FC = () => {
  // Set a ref for the canvas element and the context
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  // State to manage if knob is being dragged
  const [isDragging, setIsDragging] = useState<boolean>(false)

  // State to manage current angle
  const [currentAngle, setCurrentAngle] = useState<number>(140)

  // State to manage placement of angle in percentage
  const [currentPercentage, setCurrentPercentage] = useState<number>(0)

  // On initial render, set the context of the canvas element
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    contextRef.current = context
    drawKnob(currentAngle)

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      const angle = getAngleFromEvent(e)
      if (isAngleWithinRange(angle as number)) {
        setCurrentAngle(angle as number)
        updatePercentage(angle as number)
        drawKnob(angle as number)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const angle = getAngleFromEvent(e)
        if (isAngleWithinRange(angle as number)) {
          setCurrentAngle(angle as number)
          updatePercentage(angle as number)
          drawKnob(angle as number)
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
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

  }, [isDragging, currentAngle])

  // Draw the knob
  const drawKnob = (angle: number) => {
    const context = contextRef.current
    if (!context) return
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, false)
    context.fillStyle = '#ccc'
    context.fill()
    context.lineWidth = 4
    context.strokeStyle = '#000'
    context.stroke()

    // Draw the pointer
    const pointerX = centerX + pointerLength * Math.cos(angle * Math.PI / 180)
    const pointerY = centerY + pointerLength * Math.sin(angle * Math.PI / 180)
    context.beginPath()
    context.moveTo(centerX, centerY)
    context.lineTo(pointerX, pointerY)
    context.strokeStyle = '#000'
    context.lineWidth = 4
    context.stroke()
  }

  // Calculate the angle from the dragging event
  const getAngleFromEvent = (e: MouseEvent): number | undefined => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const deltaX = mouseX - centerX
    const deltaY = mouseY - centerY
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

    // Normalize the angle
    if (angle < 0) angle += 360
    return angle
  }

  // Confirm that the angle is within the alotted range
  const isAngleWithinRange = (angle: number): boolean => {
    // Normalize the angle to the range [0, 360]
    if (angle < 0) angle += 360
    if (angle >= 360) angle -= 360

    // Check if the angle is within the alotted range (140° to 40°)
    return (angle >= 140 && angle <= 360) || (angle >= 0 && angle <= 40)
  }

  // Update the percentage based on the current angle
  const updatePercentage = (angle: number) => {
    if (angle < 0) angle += 360 
    if (angle >= 360) angle -= 360

    if ((angle >= 140 && angle <= 360) || (angle >= 0 && angle <= 40)) {
      let normalizedAngle: number
      if (angle >= 140 && angle <= 360) {
        normalizedAngle = angle - 140
      } else {
        normalizedAngle = angle + 220
      }

      const percentage = Math.round((normalizedAngle / 260) * 100)
      setCurrentPercentage(percentage)
    }
  }
  
  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
      <p>Volume:&nbsp;{currentPercentage}%</p>
    </>
  )
}

export default Knob
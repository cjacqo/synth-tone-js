import React, { useRef } from 'react'

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

const ADSR: React.FC<ADSRProps> = ({
  attackTime, decayTime, sustainLevel, releaseTime,
  setAttackTime, setDecayTime, setSustainLevel, setReleaseTime
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Convert envelope times and levels to screen coordinates
  const scaleX = 800 // Total width of the SVG
  const scaleY = 100 // Total height of the SVG
  const maxTime = 20 // Max time in seconds
  const segmentWidth = scaleX / 3
  const pixelsPerSecond = segmentWidth / maxTime

  const scaledAttackTime = Math.min(attackTime * pixelsPerSecond, segmentWidth)
  const scaledDecayTime = Math.min(decayTime * pixelsPerSecond, segmentWidth)
  const scaledReleaseTime = Math.min(releaseTime * pixelsPerSecond, segmentWidth)

  // Example conversion: These should be adjusted based on actual use-case
  const attackPoint = { x: scaledAttackTime, y: 0 }
  const decayPoint = { x: segmentWidth + scaledDecayTime, y: scaleY - (sustainLevel * scaleY) }
  const releasePoint = { x: 2 * segmentWidth + scaledReleaseTime, y: scaleY - (sustainLevel * scaleY) }

  const getRelativePointerPosition = (e: MouseEvent) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }

    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const cursorPt = pt.matrixTransform(svg.getScreenCTM()?.inverse())
    return { x: cursorPt.x, y: cursorPt.y }
  }

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

  const handleDrag = (setter: (value: number) => void, segmentIndex: number, axis: 'x' | 'y') => {
    return (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
      e.preventDefault()

      const moveHandler = (moveEvent: MouseEvent) => {
        const newPos = getRelativePointerPosition(moveEvent)
        let newValue = (axis === 'x' ? newPos.x : scaleY - newPos.y) - segmentIndex * segmentWidth
        newValue = Math.max(0, Math.min(newValue / pixelsPerSecond, maxTime))
        
        setter(newValue)
      }

      const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler)
        document.removeEventListener('mouseup', upHandler)
      }

      document.addEventListener('mousemove', moveHandler)
      document.addEventListener('mouseup', upHandler)
    }
  }

  return (
    <div className='adsr-container'>
      <svg className='adsr-svg' ref={svgRef} width='100%' height={scaleY}>
        {/* Lines connecting the points */}
        <line x1='0' y1={scaleY} x2={attackPoint.x} y2={attackPoint.y} stroke='black' />
        <line x1={attackPoint.x} y1={attackPoint.y} x2={decayPoint.x} y2={decayPoint.y} stroke='black' />
        <line x1={decayPoint.x} y1={decayPoint.y} x2={releasePoint.x} y2={releasePoint.y} stroke='black' />
        <line x1={releasePoint.x} y1={releasePoint.y} x2={'100%'} y2={scaleY} stroke='black' />

        {/* Draggable points */}
        <rect x={attackPoint.x - 5} y={attackPoint.y - 5} width='10' height='10' fill='red' onMouseDown={handleDrag(setAttackTime, 0, 'x')} />
        <rect x={decayPoint.x - 5} y={decayPoint.y - 5} width='10' height='10' fill='green' onMouseDown={handleDrag(setDecayTime, 1, 'x')} />
        <rect x={attackPoint.x - 5} y={attackPoint.y - 5} width='10' height='10' fill='blue' cursor='ns-resize' onMouseDown={handleDrag(setSustainLevel, 0, 'y')} />
        <rect x={releasePoint.x - 5} y={releasePoint.y - 5} width='10' height='10' fill='orange' onMouseDown={handleDrag(setReleaseTime, 2, 'x')} />
      </svg>
    </div>
  )
}

export default ADSR
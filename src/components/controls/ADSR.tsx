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
  const scaleX = 400 // Total width of the SVG
  const scaleY = 100 // Total height of the SVG
  const maxTime = 20 // Max time in seconds
  const pixelsPerSecond = scaleX / maxTime

  const scaledAttackTime = attackTime * pixelsPerSecond
  const scaledDecayTime = decayTime * pixelsPerSecond
  const scaledReleaseTime = releaseTime * pixelsPerSecond

  // Example conversion: These should be adjusted based on actual use-case
  const attackPoint = { x: scaledAttackTime, y: 0 }
  const decayPoint = { x: scaledAttackTime + scaledDecayTime, y: scaleY - (sustainLevel * scaleY) }
  const releasePoint = { x: scaledAttackTime + scaledDecayTime + scaledReleaseTime, y: scaleY }

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

  const handleDrag = (setter: (value: number) => void, type: 'attack' | 'decay' | 'sustain' | 'release', axis: 'x' | 'y', min: number, max: number) => {
    return (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
      e.preventDefault()

      const moveHandler = (moveEvent: MouseEvent) => {
        const newPos = getRelativePointerPosition(moveEvent)
        let newValue = axis === 'x' ? newPos.x / pixelsPerSecond : scaleY - newPos.y
        newValue = clamp(newValue, min, max)

        switch(type) {
          case 'attack':
            newValue = Math.min(newValue, decayTime - 1)
            break
          case 'decay':
            newValue = Math.max(attackTime + 1, Math.min(newValue, releaseTime - 1))
            break
          case 'release':
            newValue = Math.max(decayTime + 1, newValue)
            break
          default:
            break
        }
        
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
        <rect x={attackPoint.x - 5} y={attackPoint.y - 5} width='10' height='10' fill='red' onMouseDown={handleDrag(setAttackTime, 'attack', 'x', 0, 20)} />
        <rect x={decayPoint.x - 5} y={decayPoint.y - 5} width='10' height='10' fill='green' onMouseDown={handleDrag(setDecayTime, 'decay', 'x', 0, 20)} />
        <rect x={releasePoint.x - 5} y={releasePoint.y - 5} width='10' height='10' fill='orange' onMouseDown={handleDrag(setReleaseTime, 'release', 'x', 0, 20)} />
        <rect x={attackPoint.x - 5} y={attackPoint.y - 5} width='0' height='10' fill='blue' cursor='ns-resize' onMouseDown={handleDrag(setSustainLevel, 'sustain', 'y', 0, 1)} />
      </svg>
    </div>
  )
}

export default ADSR
import React, { useState, useCallback, MouseEvent } from 'react'

interface KnobProps {
  degrees: number;
  size: number;
  min: number;
  max: number;
  value: number;
  numTicks?: number;
  color?: number;
}

const Knob: React.FC<KnobProps> = ({
  degrees, size, min, max, value, numTicks, color
}) => {
  const fullAngle = degrees
  const startAngle = (360 - degrees) / 2
  const endAngle = startAngle + degrees
  const margin = size * 0.15

  const convertRange = (oldMin: number, oldMax: number, newMin: number, newMax: number, oldValue: number): number => {
    return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
  }

  const initialDeg = Math.floor(convertRange(min, max, startAngle, endAngle, value))

  const [deg, setDeg] = useState(initialDeg)

  const getDeg = useCallback((cX: number, cY: number, pts: { x: number, y: number }) => {
    const x = cX - pts.x
    const y = cY - pts.y
    let deg = Math.atan2(y, x) * 180 / Math.PI
    if (x < 0) {
      deg += 180
    }
    const finalDeg = Math.min(Math.max(startAngle, deg), endAngle)
    return finalDeg
  }, [startAngle, endAngle])

  const startDrag = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const knob = e.currentTarget.getBoundingClientRect()
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    }

    const moveHandler = (e: MouseEvent) => {
      const currentDeg = getDeg(e.clientX, e.clientY, pts)
      if (currentDeg === startAngle) {
        setDeg(currentDeg - 1)
      }
      const newValue = Math.floor(convertRange(startAngle, endAngle, min, max, currentDeg))
      setDeg(currentDeg)
      // onChange(newValue)
    }

    const stopDrag = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      document.removeEventListener('mousemove', moveHandler as any)
      document.removeEventListener('mouseup', stopDrag)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.addEventListener('mousemove', moveHandler as any)
    document.addEventListener('mouseup', stopDrag)
  }

  const renderTicks = () => {
    const ticks = []
    const incr = fullAngle / numTicks!
    const sizeWithMargin = margin + size / 2
    for (let d = startAngle; d <= endAngle; d += incr) {
      const tick = {
        deg: d,
        tickStyle: {
          height: sizeWithMargin + 10,
          left: sizeWithMargin - 1,
          top: sizeWithMargin + 2,
          transform: `rotate(${d}deg)`,
          transformOrigin: 'top'
        }
      }
      ticks.push(tick)
    }
    return ticks
  }

  const kStyle = {
    width: size,
    height: size
  }

  const iStyle = { ...kStyle, transform: `rotate(${deg}deg)` }
  const oStyle = { ...kStyle, margin }

  return (
    <div className='knob' style={kStyle}>
      <div className='ticks'>
        {numTicks
          ? renderTicks().map((tick, index) => (
            <div key={index} className={`tick${tick.deg <= deg ? ' active' : ''}`} style={tick.tickStyle} />
          ))
        : null}
      </div>
      <div className='knob outer' style={oStyle} onMouseDown={startDrag}>
        <div className='knob inner' style={iStyle}>
          <div className='grip' />
        </div>
      </div>
    </div>
  )
}

export default Knob
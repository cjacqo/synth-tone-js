import React from 'react'
import AutoFilter from './autoFilter/AutoFilter'

const FX: React.FC & { AutoFilter: typeof AutoFilter } = () => {
  return <div>FX</div>
}

FX.displayName = 'FX'
FX.AutoFilter = AutoFilter

export default FX
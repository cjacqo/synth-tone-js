import React from 'react'

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> & { FX: typeof FX } = ({ children }) => {
  return <h3>{children}</h3>
}

const FX: React.FC<TitleProps> = ({ children }) => {
  return <h3 className='title fx-title'>{children}</h3>
}

Title.displayName = 'Title'
Title.FX = FX

export default Title
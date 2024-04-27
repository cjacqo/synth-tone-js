import React from 'react'

interface BaseballCardProps {
  player: string;
  team: string;
}

const BaseballCard: React.FC<BaseballCardProps> = ({ player, team }) => {
  return (
    <div>
      <h3>{player}</h3>
      <p>{team}</p>
    </div>
  )
}

BaseballCard.displayName = 'BaseballCard'


interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> & { BaseballCard: typeof BaseballCard } = ({ children }) => {
  return <div className='card'>{children}</div>
}

Card.displayName = 'Card'
Card.BaseballCard = BaseballCard

export default Card
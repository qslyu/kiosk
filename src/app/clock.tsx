import { useState, useEffect } from 'react'
import Card from './components/card'

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <Card className="bg-white">
      <div className="p-4">
        <div className="text-6xl font-bold">{currentTime.toLocaleDateString().substring(5)} {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
      </div>
    </Card>
  )
}
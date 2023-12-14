'use client'
import Card from './components/card'
import Clock from './clock'
import Weather from './weather'
import Calender from './calender'

export default function Home() {
  return (
    <main className="w-screen h-screen bg-black flex">
      <div className="flex flex-1 flex-col">
        <div className="p-4">
          <Weather />
        </div>
        <div className="flex-1 p-4">
          <Card className="bg-white"><div></div></Card>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="p-4 h-1/2">
          <Calender />
        </div>
        <div className="flex-1 p-4">
          <Card className="bg-white"><></></Card>
        </div>
        <div className="flex">
          <div className='p-4' onClick={() => {document.documentElement.requestFullscreen()}}>
            <Clock />
          </div>
          
          <div className="flex-1 rounded-lg bg-white m-4">

          </div>
        </div>
      </div>
    </main>
  )
}

'use client'
import Card from './components/card'
import Clock from './clock'
import Weather from './weather'
import Calender from './calender'

export default function Home() {
  return (
    <main className="w-screen h-screen bg-black flex">
      <div className="flex flex-1 flex-col">
        <div className="pr-4 pb-4 h-1/4">
          <Weather />
        </div>
        <div className="pr-4 pt-4 flex-1">
          <Card className="bg-white"><div></div></Card>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="pl-4 pb-4 h-3/5">
          <Calender />
        </div>
        <div className="flex-1 pl-4 py-4">
          <Card className="bg-white"><></></Card>
        </div>
        <div className="flex pl-4 pt-4">
          <div onClick={() => {document.documentElement.requestFullscreen()}}>
            <Clock />
          </div>
          
          <div className="rounded-lg bg-white m-4">

          </div>
        </div>
      </div>
    </main>
  )
}

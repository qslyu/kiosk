import useSWR from "swr"
import Card from "./components/card"

export default function Calender() { 
  const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR("/api/calender", fetcher)

  return (
    <Card className="bg-white flex flex-col p-4">
      <div className="flex h-1/6">
        <div className="w-1/6" />
        <div className="flex-1 flex justify-center items-center"><p className="font-bold text-2xl">{new Date().toLocaleDateString("ja-JP", { month: "numeric", day: "numeric"})}</p></div>
        <div className="flex-1 flex justify-center items-center"><p className="font-bold text-2xl">{new Date(Date.now() +  24 * 60 * 60 * 1000).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric"})}</p></div>
      </div>
      <div className="flex-1 flex">
        <div className="flex flex-col w-1/6">
          <div className="flex-1 flex justify-center items-center"><p className="font-bold text-2xl">1-2限</p></div>
          <div className="flex-1 flex justify-center items-center"><p className="font-bold text-2xl">3-4限</p></div>
          <div className="flex-1 flex justify-center items-center"><p className="font-bold text-2xl">5-6限</p></div>
          <div className="flex-1 flex justify-center items-center"><p className="font-bold text-2xl">7-8限</p></div>
          <div className="flex-1 flex justify-center items-center"><p className="font-bold text-2xl">9-10限</p></div>
        </div>
        <div className="flex-1 flex flex-col flex-wrap h-full">
          {data && data.map((event: any, i: any) => {
            const prevEvent = data[i - 1]

            const length = (event.end.h - event.start.h) * 60 + (event.end.min - event.start.min)
            const interval = prevEvent && prevEvent.start.d === event.end.d ? (event.start.h - prevEvent.end.h) * 60 + (event.start.min - prevEvent.end.min) : event.start.h * 60 + event.start.min - 540

            const height = `h-${Math.floor(length / 100)}/5`
            const spacerHeight =  interval ? `h-${Math.floor(interval / 100)}/5` : null
            return (
              <>
                {spacerHeight && <div key={`s-${i}`} className={`w-1/2 ${spacerHeight}`} />}
                <div key={i} className={`p-0.5 w-1/2 ${height}`}>
                  <div className="flex items-center bg-slate-500 rounded-xl h-full px-2">
                    <p className="text-white font-bold">{event.summary} {event.location}</p>
                  </div>
                </div>
              </>
            )
          })}
          {isLoading && <div className="flex-1 flex justify-center items-center h-1/5"><p className="font-bold text-2xl">Loading...</p></div>}
        </div>
      </div>
    </Card>
  )
}
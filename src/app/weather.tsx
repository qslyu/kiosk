import Image from "next/image"
import useSWR from "swr"
import Card from "./components/card"

export default function Weather() {
  const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(`https://api.openweathermap.org/data/2.5/forecast?lat=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_LAT}&lon=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_LON}&units=metric&lang=ja&cnt=8&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`, fetcher)
  
  return (
    <Card className="bg-blue-200">
      <div className="flex p-4">
        {data?.list.map((item: any) => 
            <div key={item.dt} className="flex flex-col items-center">
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
              <p className="text-xl font-bold">{Math.floor(item.main.temp)}°C</p>
              <p className="text-xl font-bold">{item.dt_txt.substring(10, 13)}時</p>
            </div>
          )
        }
      </div>
    </Card>
  )
}
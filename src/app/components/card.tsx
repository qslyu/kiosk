export default function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  
  return (
    <div className={ className + " rounded-lg w-full h-full"}>{ children }</div>
  )
}
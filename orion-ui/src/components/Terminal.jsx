import { useState } from "react"
import { useShipData } from '../hooks/useShipData'

export default function Terminal(){
    const { logs } = useShipData()
    const [input, setInput] = useState("")

    const handleKeyPress = async (e) => {
        if (e.key == "Enter" && input.trim()){
            await fetch('http://localhost:8000/command', {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({ command: input })
            });

            setInput("")
        }
    }

    const hudLogs = logs?.slice(-6);

    return(
        <div className="bg-linear-to-b from-white/5 to-transparent flex flex-col justify-between w-full h-full p-4 text-xs font-jetbrains rounded-sm border-t border-white/10 backdrop-blur-sm">
            <div className="flex flex-col gap-1 ">
                {hudLogs?.map((log, i) => {
                        const [source, message] = log.split(': ');
                            return (
                                <div key={i} className="grid grid-cols-[16%_84%] gap-2">
                                    <span className="text-blue-400 text-[10px]">[{source}]</span>
                                    <span className="text-gray-300">{message}</span>
                                </div>
                            );
                })}
            </div>
            
            <input
                className="bg-black/40 p-2 border border-white/10 focus:outline focus:outline-orion-purple3"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type here.." />
        </div>
    )
}
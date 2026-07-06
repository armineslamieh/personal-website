"use client"

import { useState, useEffect } from "react"

const StatusFooter = () => {
    const [time, setTime] = useState<Date | null>(null)

    useEffect(() => {
        setTime(new Date())
        const interval = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed bottom-4 right-4 text-right text-white/40 text-[9px] uppercase tracking-[0.25em] font-light leading-relaxed">
            <p>Amsterdam, NL</p>
            <p>
                {time
                    ? time.toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Europe/Amsterdam",
                    })
                    : "--"}
            </p>
        </div>
    )
}

export default StatusFooter
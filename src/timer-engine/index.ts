
interface TimerEngine {
    (listener: (message: string) => void): TimerEngineInstance
}
export interface TimerEngineInstance {
    add: (message: string) => void
}
const timerEngine: TimerEngine = (listener) => {
    const messages: string[] = []
    let intervalHandle: any
    let isRunning: boolean = false
    const increment = 1000
    const run = () => {
        if (isRunning) return
        isRunning = true
        intervalHandle = setInterval(() => {
            const message = messages.pop()
            if (!message) {
                isRunning = false
                clearInterval(intervalHandle)
            } else {
                listener(message)
            }
        }, increment)
    }
    const add = (message: string) => {
        if (!isRunning) {
            run()
        }
        messages.unshift(message)
    }
    return { add }
}

export default timerEngine

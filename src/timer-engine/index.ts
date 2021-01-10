
const timerEngine = (listener: any) => {
    const callBack = listener
    const messages: string[] = []
    let h: any
    let isRunning = false
    const run = () => {
        if (isRunning) return
        h = setInterval(() => {
            const e = messages.pop()
            if (!e) {
                isRunning = false
                clearInterval(h)
            } else {
                callBack(e)
            }
        }, 1000)
    }
    const add = (message: string) => {
        if (!isRunning) {
            run()
            isRunning = true
        }
        messages.unshift(message)
    }    
    return {add}
}

export default timerEngine
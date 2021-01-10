
const messages: string[] = []
let h: any
let isRunning = false
let callBack: any
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
const timerEngine = (listener: any) => {
    callBack = listener
    return {add}
}
/////////////////
const tE = timerEngine((e: string) => {
    console.log('message:', e)
})
tE.add('a')
tE.add('b')
tE.add('c')
tE.add('d')
setTimeout(() => {
    console.log('add')
    tE.add('a')
    tE.add('a')
    tE.add('b')
    tE.add('c')
    tE.add('d')
    }, 10000)

export default h
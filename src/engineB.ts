
// addMessage callback

const messages: string[] = []
let h: any
let isRunning = false
const run = () => {
    if (isRunning) return
    h = setInterval(() => {
        if (messages.length === 0) {
            console.log('quit')
            clearInterval(h)
            isRunning = false
        }
        const e = messages.pop()
        console.log('zz', e)
    }, 1000)
}
const add = (message: string) => {
    if (!isRunning) {
        run()
        isRunning = true
    }
    messages.unshift(message)
}
// run()

add('a')
add('b')
add('c')
add('d')
add('e')
setTimeout(() => {
    console.log('add')
    add('a')
    add('b')
    add('c')
    add('d')
    add('e')
    // console.log('a')
}, 10000)
// messages.unshift('a')
// messages.unshift('b')
// messages.unshift('c')
// messages.unshift('d')


export default h
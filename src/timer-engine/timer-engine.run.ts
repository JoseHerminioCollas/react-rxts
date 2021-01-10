import timerEngine from './index'

const tE = timerEngine((e: any) => {
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

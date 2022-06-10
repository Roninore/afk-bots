const os = require('os')
os.setPriority(os.constants.priority.PRIORITY_HIGH);
const { Interception, FilterKeyState, FilterMouseState, MouseFlag } = require('node-interception')
const interception = new Interception();

const SCANCODE_TAB = 15;
const SCANCODE_0 = 11;

const macroInterval = { tab: null, down: null}
const keyboardInstance = interception.getKeyboards()[0]
if (keyboardInstance == undefined) { console.log('No keyboards'); throw 1}



const delay = (ms) => {
    return new Promise((r) => setTimeout(() => r(), ms))
}

const keyTap = async (SCANCODE, device, ms, initialState = 0) => {
    device.send({
        type: 'keyboard',
        code: SCANCODE,
        state: initialState,
        information: 0
    })
    await delay(ms)
    device.send({
        type: 'keyboard',
        code: SCANCODE,
        state: initialState+1,
        information: 0
    })
}

const startMacro = () => {
    
    stopMacro()

    macroInterval.tab = setInterval(async ()=>{ keyTap(SCANCODE_TAB,keyboardInstance,32) },200)

    macroInterval.down = setInterval(async ()=>{ keyTap(SCANCODE_0,keyboardInstance,32) },2000)
}

const stopMacro = () => {
    if (macroInterval.tab)
        clearInterval(macroInterval.tab)
    if (macroInterval.down)
        clearInterval(macroInterval.down)
    macroInterval.tab = null    
    macroInterval.down = null
}

module.exports = { startMacro, stopMacro }
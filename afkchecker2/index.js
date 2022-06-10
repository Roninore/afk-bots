'use strict';

const robot = require('robotjs')
const {GlobalKeyboardListener} = require('node-global-key-listener')
const listener = new GlobalKeyboardListener()
const captureToFile = require('./captureToFile')
const {createBot} = require('./sendOnTelegram')
const {startMacro, stopMacro} = require('./macros')


let tinycolor = require("tinycolor2")

let position = {x:0,y:0}
let interval = null
let timeout = null

const isEnemy = (color) => {
    const rgb = tinycolor(color).saturate(100).toRgb()
    const delta = (255 - rgb.r) + rgb.g + rgb.b
    console.log(`${rgb.r} ${rgb.g} ${rgb.b} ${delta} ${delta < 100}`)
    return delta < 100 
}

const stopChecking = () => {
    if (interval) {
        clearInterval(interval)
        interval = null
    }
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
    stopMacro()
}
const delayChecking = () => {
    stopChecking()
    startMacro()
    timeout = setTimeout(()=>{interval = setInterval(checker,1000)},60*1000)
}

const checker = async () => {
    try{
        const color = robot.getPixelColor(position.x,position.y)
        if (isEnemy(color)) {
            delayChecking()
            captureToFile()
        }
    } catch(e) {console.log(e)}
}

const changePosHandler = async (e, down) => {
    if (e.state != 'DOWN') return

    // console.log(e.name)

    if (e.name == 'NUMPAD 1' || e.name == 'END') {
        stopChecking()
        position = robot.getMousePos()
        console.log('Position choosed')
    }

    if (e.name == 'NUMPAD 2' || e.name == 'DOWN ARROW') {
        stopChecking()

        console.log('Start checking')
        startMacro()
        interval = setInterval(checker,1000)
    }
    if (e.name == 'NUMPAD 3' || e.name == 'PAGE DOWN')
    {   
        stopChecking()
        console.log('Checking stopped')
    }
    
    
    if (e.name == 'NUMPAD 5' || e.name == 'NUMPAD CLEAR')
    {   
        console.log('Closing')
        throw 1
    }
}


const startChecking = () => {
    createBot()
    listener.addListener(changePosHandler)
}


startChecking()
'use strict';

const robot = require('robotjs')
const {GlobalKeyboardListener} = require('node-global-key-listener')
const listener = new GlobalKeyboardListener()
const captureToFile = require('./captureToFile')
const {createBot} = require('./sendOnTelegram')

let tinycolor = require("tinycolor2")



let center = {x:0,y:0}
let radius = 0
let interval = null
const isBoat = (color) => {
    const rgb = tinycolor(color).saturate(100).toRgb()
    const delta = (255 - rgb.r) + rgb.g + rgb.b
    return delta < 80 
}

  
const stopChecking = () => {
    if (interval) {
        clearInterval(interval)
        interval = null
    }
}

const checker = async () => {
    try{
        const x = center.x - radius
        const y = center.y - radius
        let capture = robot.screen.capture(x, y, radius*2, radius*2)

        for (let yi = 0; yi < radius*2; yi+=2)
            for (let xi = 0; xi < radius*2; xi+=2)
            {
                const color = capture.colorAt(xi,yi) 
                if (isBoat(color))
                {
                    const absX = x+xi
                    const absY = y+yi
                    console.log(`Boat on x:${absX} y:${absY} color ${color}`)
                    captureToFile(center,radius,{x:absX,y:absY})
                    yi += 20
                    xi += 20
                    return true
                }
            }
    } catch(e) {console.log(e)}
}

const changePosHandler = async (e, down) => {
    if (e.state != 'DOWN') return

    if (e.name == 'NUMPAD 1' || e.name == 'END') {
        center = robot.getMousePos()
        console.log('Center choosed')
    }

    if (e.name == 'NUMPAD 2' || e.name == 'DOWN ARROW') {
        let pos = robot.getMousePos()
        pos.x = Math.trunc(pos.x)
        pos.y = Math.trunc(pos.y)
        radius = ( (pos.x - center.x)**2 + (pos.y - center.y)**2 )**0.5
        radius = Math.trunc(radius)
        console.log('Radius choosed')
    }

    if (e.name == 'NUMPAD 3' || e.name == 'PAGE DOWN') {
        console.log('Start checking')
        stopChecking()
        checker()
        interval = setInterval(checker,10000)
    }
    if (e.name == 'NUMPAD 4' || e.name == 'LEFT ARROW')
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
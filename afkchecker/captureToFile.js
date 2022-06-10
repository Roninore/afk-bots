let robot = require("robotjs")
let Jimp = require('jimp')
const {sendOnTelegram} = require('./sendOnTelegram')
const PATH = require('path')

const delay = (ms) => {
    return new Promise((r) => setTimeout(() => r(), ms))
  }

const captureToFile = async (center, radius, boat) => {
    try {
        robot.moveMouse(boat.x+1,boat.y+1)
        robot.moveMouse(boat.x+4,boat.y+4)
        await delay(500)

        let pos = { x: center.x - radius, y: center.y - radius }
        let size = { x: radius*2, y: radius*2 }

        if (Math.abs(pos.x + size.x - boat.x) < 250)
            size.x += 250 - Math.abs(pos.x + size.x - boat.x)
        if (Math.abs(pos.y - boat.y) < 100)
        {
            pos.y -= 100 - Math.abs(pos.y - boat.y)
            size.y += 100 - Math.abs(pos.y - boat.y)
        }
        const rimg = robot.screen.capture(pos.x, pos.y, size.x, size.y)
        
        let path = PATH.join(`C:/Program Files/gop_bot/${Date.now()}.png`)

        let jimg = new Jimp(size.x, size.y);
        for (let x=0; x<size.x; x++) {
                for (let y=0; y<size.y; y++) {
                        // hex is a string, rrggbb format
                        var hex = rimg.colorAt(x, y);
                        // Jimp expects an Int, with RGBA data,
                        // so add FF as 'full opaque' to RGB color
                        var num = parseInt(hex+"ff", 16)
                        // Set pixel manually
                        jimg.setPixelColor(num, x, y);
                }
            }
        jimg.write(path)

        await delay(2000)
        sendOnTelegram(path)
        robot.moveMouse(center.x - radius, center.y - radius)

    } catch(e) {console.log(e)}
}

module.exports = captureToFile

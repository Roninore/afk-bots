const {sendOnTelegram} = require('./sendOnTelegram')
const PATH = require('path')
const fs = require('fs')
const screenshot = require('screenshot-desktop')

const delay = (ms) => {
    return new Promise((r) => setTimeout(() => r(), ms))
  }

const captureToFile = async () => {
    try {        
        const fileName = `${Date.now()}.png`
        const dir = 'C:/Program Files/gop_bot/'
        const path = PATH.join(`${dir}${fileName}`)
        screenshot({format: 'png'}).then((img) => {
            fs.writeFileSync(path,img)
          })

        await delay(2000)
        sendOnTelegram(path)

    } catch(e) {console.log(e)}
}

module.exports = captureToFile

let robot = require('robotjs')

const start = async () => {

    let interval = setInterval(()=>{
        let mouse = robot.getMousePos()
        let hex = robot.getPixelColor(mouse.x, mouse.y);
        // let hex = robot.getPixelColor(1004,603) 
        //{color: 'ffb400', x: 1002, y: 568}
        console.log('{ color: \''+ hex+ '\', x: ' + mouse.x + ', y:' + mouse.y + '}')
        // console.log(hex)
        // let hex = robot.getPixelColor(coinWin.x,coinWin.y)
        // console.log(hex)
    },1000)
}

start()

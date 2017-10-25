// 接收canvas元素后负责webgl(渲染/输出信息)等职能
const CanvasManager = function (canvasDom) {

    function canvasManager(canvasDom) {

    }

    return new canvasManager(canvasDom)
}


var canvasManager = {}
canvasManager.init = function (canvasDom) {
    canvasManager = new CanvasManager(canvasDom)
}


export default ['111', '222', '333']
export {canvasManager};
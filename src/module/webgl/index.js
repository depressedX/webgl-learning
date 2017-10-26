// 接收canvas元素后负责webgl(渲染/输出信息)等职能
import * as THREE from 'three';

const CanvasManager = function (canvasDom) {

    function canvasManager(canvasDom) {
        console.log(canvasDom)

        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer({canvas:canvasDom});

        // 设置为canvasDom元素的宽高
        renderer.setSize(canvasDom.offsetWidth, canvasDom.offsetHeight);

        var geometry = new THREE.CubeGeometry(1,1,1);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material); scene.add(cube);
        camera.position.z = 5;
        function render() {
            requestAnimationFrame(render);
            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;
            renderer.render(scene, camera);
        }
        render();
    }

    return new canvasManager(canvasDom)
}


var canvasManager = {}
canvasManager.init = function (canvasDom) {
    canvasManager = new CanvasManager(canvasDom)
}


export default ['sphere', '222', '444']
export {canvasManager};


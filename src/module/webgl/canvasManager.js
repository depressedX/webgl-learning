// 接收canvas元素后负责webgl(渲染/输出信息)等职能
import * as THREE from 'three';
import OrbitControls from './OrbitControls'
import Emit from './../Emit'


const CanvasManager = function (canvasDom) {
    let mounted = false;
    let dom = null;


    let renderer = null,
        camera = null,
        scene = null;

    let meshes = [];

    let controlStats = {
        autoRotate: false,
        wireframe:true,
        spec:10,
        radius:3
    }


    // 渲染函数
    let render = function () {
        const timeStart = new Date();
        renderer.render(scene, camera);
        const timeEnd = new Date();
        this.trigger('rerender', timeEnd - timeStart)

        // 旋转
        if (controlStats.autoRotate) {
            meshes.forEach((val) => {
                val.rotation.y += 0.01
            });
        }


        requestAnimationFrame(render.bind(this))
    }
    let controls = null;

    // 内层构造函数
    let canvasManager = function (canvasDom) {


        if (canvasDom) {
            canvasManager.prototype.mount.call(this, canvasDom);
        }
    }
    canvasManager.prototype = new Emit();
    // 改变绘图组
    canvasManager.prototype.reset = function (bundle) {
        console.log('reset   ', bundle);
        if (typeof bundle.autoRotate === "boolean") {
            controlStats.autoRotate = bundle.autoRotate;
        }
        if (typeof bundle.wireframe === "boolean"){
            controlStats.wireframe = bundle.wireframe;
            meshes.forEach((value)=>{
                value.material.wireframe = bundle.wireframe
            })
        }
        if (bundle.spec||bundle.radius){
            controlStats.spec = bundle.spec||controlStats.spec;
            controlStats.radius = bundle.radius||controlStats.radius;
            meshes[0].geometry.dispose();
            meshes[0].geometry = createSphere(controlStats.radius,controlStats.spec)
        }
    }
    // 绑定dom元素
    canvasManager.prototype.mount = function (canvasDom) {
        dom = canvasDom;
        mounted = true;

        scene = new THREE.Scene();

        // camera = new THREE.PerspectiveCamera(500, dom.clientWidth / dom.clientHeight, 0.1, 500);
        camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 800)
        camera.position.set(5, 5, 5);
        camera.lookAt(new THREE.Vector3(0, 0, 0))

        renderer = new THREE.WebGLRenderer({canvas: dom, antialias: true});
        renderer.setClearColor(0xeeeeee)

        // 坐标轴
        var axisHelper = new THREE.AxisHelper(60)
        scene.add(axisHelper)


        let sphere = createSphere(controlStats.radius);
        let sphereMesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0x1155f0, wireframe: true}));
        scene.add(sphereMesh)
        meshes.push(sphereMesh)

        controls = new OrbitControls(camera, canvasDom);


        render.call(this);
    }

    return new canvasManager(canvasDom);


    function createCube(wireframe) {
        const width = 4;
        const cubeGeo = new THREE.Geometry();
        cubeGeo.vertices.push(
            new THREE.Vector3(width, width, width),
            new THREE.Vector3(width, -width, width),
            new THREE.Vector3(width, -width, -width),
            new THREE.Vector3(width, width, -width),
            new THREE.Vector3(-width, width, width),
            new THREE.Vector3(-width, width, -width),
            new THREE.Vector3(-width, -width, -width),
            new THREE.Vector3(-width, -width, width)
        );
        cubeGeo.faces.push(
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(1, 2, 3),
            new THREE.Face3(4, 5, 6),
            new THREE.Face3(4, 6, 7),
            new THREE.Face3(0, 4, 1),
            new THREE.Face3(4, 7, 1),
            new THREE.Face3(3, 6, 5),
            new THREE.Face3(3, 2, 6),
            new THREE.Face3(0, 3, 5),
            new THREE.Face3(0, 5, 4),
            new THREE.Face3(1, 6, 2),
            new THREE.Face3(1, 7, 6),
        );
        cubeGeo.faces.forEach((value, index) => {
            value.materialIndex = parseInt(index / 2);
        })

        const cubeMats = [
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), .5, .5),
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), .5, .5),
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), .5, .5),
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), .5, .5),
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), .5, .5),
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), .5, .5),
            })
        ]

        if (wireframe) {
            cubeMats.forEach((val) => {
                val.wireframe = true
            })
        }

        const cubeM = new THREE.Mesh(cubeGeo, cubeMats);


        return cubeM;
    }

    function createSphere(radius, spec = 10) {
        let sphereGeo = new THREE.Geometry();

        let verticesDown = [],
            verticesUp = [],
            stripGeo = null,
            stripGeo2 = null,
            stripVertex,
            stripVertex2,
            ct;
        for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / spec/2) {
            verticesUp.push(new THREE.Vector3(radius * Math.sin(theta), 0, radius * Math.cos(theta)));
        }
        let c,
            x,
            newX = radius;
        // 创建扇形
        for (let i = 0; i < spec; i++) {
            // 获得新数组
            verticesDown = verticesUp;
            verticesUp = [];
            ct = (i+1)*Math.PI/spec/2;
            c = radius*Math.sin(ct);
            x = newX;
            newX = radius*Math.cos(ct)
            for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / spec/2) {
                verticesUp.push(new THREE.Vector3(newX * Math.sin(theta), c, newX * Math.cos(theta)));
            }
            stripVertex = [];
            stripVertex2 = []
            verticesUp.forEach((value, index) => {
                stripVertex.push(value, verticesDown[index]);
                const t1 = verticesDown[index].clone(),
                    t2 = value.clone();
                t1.y = -t1.y;
                t2.y = -t2.y;
                stripVertex2.push(t1, t2);
            });
            stripVertex.push(stripVertex[0].clone(), stripVertex[1].clone())
            stripVertex2.push(stripVertex2[0].clone(), stripVertex2[1].clone())
            stripGeo = createTriangleStripGeometry.apply(null, stripVertex);
            stripGeo2 = createTriangleStripGeometry.apply(null, stripVertex2);

            sphereGeo.merge(stripGeo);
            sphereGeo.merge(stripGeo2);
        }

        return sphereGeo
    }

    function createTriangleStripGeometry() {
        const geo = new THREE.Geometry();
        geo.vertices = Array.from(arguments)
        for (let i = 0; i < arguments.length - 2; i++) {
            if (i % 2 === 0) {
                geo.faces.push(new THREE.Face3(i, i + 1, i + 2))
            } else {
                geo.faces.push(new THREE.Face3(i, i + 2, i + 1))
            }
        }
        return geo;
    }

    function createTriangleFanGeometry() {
        const geo = new THREE.Geometry();
        geo.vertices = Array.from(arguments)
        for (let i = 0; i < arguments.length - 1; i++) {
            geo.faces.push(new THREE.Face3(0, i, i + 1))
        }
        return geo;
    }
}


var canvasManager = new CanvasManager();


export {canvasManager};
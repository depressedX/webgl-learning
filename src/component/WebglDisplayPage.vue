<template>
    <div>
        <h1>Hello   Webgl</h1>
        <md-layout md-row class="canvas-area-wrapper">
            <md-card class="canvas-area">
                <md-card-header class="canvas-area__header">
                    <div class="md-title">current Shape</div>
                    <div class="md-subhead cur-shape">{{shape}}</div>
                </md-card-header>

                <md-card-content>
                    <canvas ref="canvas" width="640" height="480"></canvas>
                    <p>当前帧绘制使用了{{timeResume}}ms</p>
                    <canvas-control @reset="controlResetHandler"></canvas-control>
                </md-card-content>
            </md-card>
        </md-layout>
    </div>
</template>
<script>
    import CanvasControl from './CanvasControl.vue'

    export default {

        mounted() {

//            异步加载绘图相关模块
            this.$nextTick(function () {
                setTimeout(() => {
                    require.ensure(['./../module/webgl/canvasManager', 'three'], () => {
                        this.canvasManager = require('./../module/webgl/canvasManager').canvasManager;
                        this.canvasManager.mount(this.$refs.canvas);
                        this.canvasManager.on('rerender',(time)=>{this.timeResume = time})
                    })
                }, 0)

            })
        },
        methods:{
            controlResetHandler(bundle){
                if (this.canvasManager)
                    this.canvasManager.reset(bundle)
            }
        },
        watch: {
//            shape(val) {
//                this.canvasManager.reset(val)
//            }
        },
        computed:{

        },
        data() {
            return {
//                canvasManager为绘图相关对象  require是异步的所sdaf以在这里预留
                canvasManager: null,
//                当前帧绘制所用时间
                timeResume:0,
//                控制相关变量
                controlStats:{
                    autoRotate:true
                }
            }
        },
        props: {
            shape: {
                type: String,
                required: true
            }
        },
        components:{
            CanvasControl
        }
    }
</script>
<style scoped>
    h1 {
        text-align: center;
    }

    .cur-shape {
        color: red;
    }

    .canvas-area {
        width: 720px;
    }

    .canvas-area-wrapper {
        margin-top: 3em;
        justify-content: center;
    }

    canvas {
        width: 100%;
        border: 1px solid gray;
    }
</style>
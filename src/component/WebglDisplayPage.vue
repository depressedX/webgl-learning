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
                    <canvas ref="canvas"></canvas>
                </md-card-content>
            </md-card>
        </md-layout>
    </div>
</template>
<script>
    import {canvasManager} from './../module/webgl'

    export default {

        watch:{
            shape(val){
                console.log(`shape changed to ${val}`)
            }
        },
        mounted(){

            this.$nextTick(function () {
                canvasManager.init(this.$refs.canvas)
            })
        },
        props:{
            shape:{
                type:String,
                required:true
            }
        },
        watch:{
//            当shape发生变化时执行相应脚本
            shape(val){

            }
        }
    }
</script>
<style scoped>
    h1{
        text-align: center;
    }
    .cur-shape{
        color: red;
    }

    .canvas-area {
        width: 720px;
    }
    .canvas-area-wrapper{
        margin-top: 3em;
        justify-content: center;
    }
    canvas{
        width: 100%;
        border: 1px solid gray;
    }
</style>
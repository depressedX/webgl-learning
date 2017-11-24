<template>
    <div>
        <h1>CanvasControl</h1>
        <md-switch v-model="autoRotate" @change="$emit('reset',{autoRotate:!autoRotate})" class="md-primary">自动旋转
        </md-switch>
        <md-switch v-model="wireframe" @change="$emit('reset',{wireframe:!wireframe})" class="md-primary">只绘制边框
        </md-switch>
        <form>
            <md-input-container>
                <label>绘制精度</label>
                <md-input v-model="spec"></md-input>
            </md-input-container>
            <md-button class="md-primary" @click="$emit('reset',{spec:parseInt(spec)})">更改精度</md-button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                autoRotate: false,
                wireframe: true,
                spec: 10
            }
        },
        methods: {
            hello() {
                console.log('hello')
            }
        },
        props: {}
    }
</script>
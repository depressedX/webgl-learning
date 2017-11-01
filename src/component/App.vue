<template>
    <div>
        <md-toolbar>
            <md-button class="md-icon-button" @click="toggleSidenav">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">Webgl Learning</h2>
        </md-toolbar>
        <md-sidenav class="md-left" ref="sidenav">
            <md-toolbar>
                <div class="md-toolbar-container">
                    <h2 class="md-title">Example</h2>
                </div>
            </md-toolbar>
            <md-list>
                <md-list-item v-for="item in webglExampleList" :key="item">
                    <router-link :to="{name:item}" @click.native="changeCurShape(item)">{{item}}</router-link>
                </md-list-item>
            </md-list>
        </md-sidenav>
        <webgl-display-page :shape="curShape"></webgl-display-page>
    </div>
</template>

<script>
    import WebglDisplayPage from './WebglDisplayPage.vue'
    import webglExampleList from './../module/webgl'
    export default {
        methods: {
            toggleSidenav() {
                this.$refs.sidenav.toggle();
            },
            changeCurShape(val){
                this.curShape = val;
            }
        },
        components:{
            WebglDisplayPage
        },
        data(){
              return{
                  webglExampleList,
                  curShape:''
              }
        },
        props:{

        },
        computed:{
//            curShape(){
//                return this.$route.path.slice(1)
//            }
        },
        beforeRouteUpdate(to,from,next){
            this.$refs.sidenav.close();
            next()
        }
    }
</script>
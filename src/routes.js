import App from './component/App.vue'
import webglExampleList from './module/webgl'

const routesAboutWebgl = webglExampleList.map((v)=>({
    path:v,
    name:v
}))

// 不同环境下的路由路径
const rootPath={
    localServer:'/',
    github:'/webgl-learning/public'
}

const routes = [
    {
        path: rootPath.localServer,
        component: App,
        children:routesAboutWebgl,
        // props: {
        //     webglExampleList
        // }
    }
]
export default routes
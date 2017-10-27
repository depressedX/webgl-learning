import App from './component/App.vue'
import webglExampleList from './module/webgl'

const routesAboutWebgl = webglExampleList.map((v)=>({
    path:v,
    name:v
}))


const routes = [
    {
        path: ROUTER_ROOT_PATH,
        component: App,
        children:routesAboutWebgl,
        // props: {
        //     webglExampleList
        // }
    }
]
export default routes
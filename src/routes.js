import App from './component/App.vue'
import webglExampleList from './module/webgl'

const routesAboutWebgl = webglExampleList.map((v)=>({
    path:v,
    name:v
}))

const routes = [
    {
        path: '/webgl-learning',
        component: App,
        children:routesAboutWebgl,
        // props: {
        //     webglExampleList
        // }
    }
]
export default routes
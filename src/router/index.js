import { createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue"
import Main from "../views/Main.vue"
import Room from "../views/Room.vue"


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/main',
        name: 'Main',
        component: Main
    },
    {
        path: '/room',
        name: 'Room',
        component: Room
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

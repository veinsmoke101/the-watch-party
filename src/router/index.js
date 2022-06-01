import { createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue"
import Main from "../views/Main.vue"
import Room from "../views/Room.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue";


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
        path: '/room/:roomRef',
        name: 'Room',
        component: Room,
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

let isAuthenticated = (localStorage.getItem('userId') !== null)

router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login' &&
        to.name !== 'Register'
    ) {
        // redirect the user to the login page
        return { name: 'Login' }
    }
})

export default router

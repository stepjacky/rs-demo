import { createWebHistory, createWebHashHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "check-user",
        component: () => import("@mobile/CheckUser")
    },
    {
        path: '/eva-mobile/home',
        name: 'mobile-vote-home',
        component: () => import("@mobile/VoteHome")
    },
    {
        path: '/eva-mobile/vote-ok',
        name: 'vote-ok',
        component: () => import("@mobile/VoteOk")
    },
    {
        path: '/eva-mobile/voted',
        name: 'vote-ed',
        component: () => import("@mobile/VoteED")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export { router }
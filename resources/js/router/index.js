import { createRouter, createWebHistory } from 'vue-router'

import productIndex from '../components/products/index.vue'
import notFound from '../components/notFound.vue'

const routes = [

    {
        path:'/',
        component: productIndex
    },
    {
        path:'/:pathMatch(.*)*',
        component: notFound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})
export default router

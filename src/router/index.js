import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	// {
	// 	path: '/',
	// 	name: 'defaultLayout',
	// 	component: resolve => require(['@/views/Home'], resolve),
	// 	meta: { title: 'GMQM私有云', icon: 'el-icon-monitor' },
	// 	children: [

	// 	],
	// },
	{
		path: '/',
		component: () => import('../components/main.vue'),
	},
	
	
]

const router = new VueRouter({
	//mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior: () => ({ y: 0 }),
	routes,
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes,
})

// eslint-disable-next-line no-unused-vars
//предотвращение работы сайта на мобильных устройствах
router.beforeEach((to, from, next) => {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) && to.name != 'ErrorPage') {
		return next({path: 'device-error'})
	} else {
		return next()
	}
}
)

Vue.config.productionTip = false

export default router
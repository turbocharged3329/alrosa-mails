const routes = [
	// {
	// 	path: '/',
	// 	component: () => import('@/views/Authorization.vue'),
	// 	name: 'Authoriztion',
	// },
	{
		path: '/',
		component: () => import('@/views/Archive.vue'),
		name: 'Archive',
	},
	{
		path: '/layouts',
		component: () => import('@/views/Layouts.vue'),
		name: 'Layouts',
	},
	{
		path: '/auth',
		component: () => import('@/views/Authorization.vue'),
		name: 'Authoriztion',
	},
	{
		path: '/constructor',
		component: () => import('@/views/MailEditor.vue'),
		name: 'Constructor',
	},
]

export default routes
const routes = [
	{
		path: '/',
		component: () => import('@/views/Authorization.vue'),
		name: 'Authoriztion',
	},
	{
		path: '/add-new',
		component: () => import('@/views/AddNew.vue'),
		name: 'AddNew',
	},
	{
		path: '/archive',
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
		name: 'Authoriztaion',
	},
	{
		path: '/constructor',
		component: () => import('@/views/MailEditor.vue'),
		name: 'Constructor',
	},
]

export default routes
export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@views/HomePage.vue'),
  },
  {
    path: '/next-page/:pageNumber',
    name: 'nextPage',
    component: () => import('@views/NextPage.vue'),
    props: true
  },
  {
    path: '/previous-page/:pageNumber',
    name: 'previousPage',
    component: () => import('@views/PreviousPage.vue'),
    props: true
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: () => import('@views/SettingsPage.vue'),
    props: true
  },
]
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/questionnaire',
    name: 'questionnaire',
    component: Layout,
    meta: { title: '问卷管理', icon: 'user-circle' },
    children: [
      {
        path: 'list',
        name: 'questionnaireList',
        component: () => import('@/pages/questionnaire/list/index.vue'),
        meta: { title: '问卷列表' },
      },
      {
        path: 'edit',
        name: 'questionnaireEdit',
        component: () => import('@/pages/questionnaire/edit/index.vue'),
        meta: { title: '编辑问卷' },
      },
    ],
  },
];

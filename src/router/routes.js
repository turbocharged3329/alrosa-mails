const routes = [
  {
    path: "/",
    component: () => import("@/views/Authorization.vue"),
    name: "Authoriztion",
  },
  {
    path: "/add-new",
    component: () => import("@/views/AddNew.vue"),
    name: "AddNew",
  },
  {
    path: "/add-template",
    component: () => import("@/views/AddTemplate.vue"),
    name: "AddTemplate",
    props: true,
  },
  {
    path: "/archive",
    component: () => import("@/views/Archive.vue"),
    name: "Archive",
  },
  {
    path: "/layouts",
    component: () => import("@/views/Layouts.vue"),
    name: "Layouts",
  },
  {
    path: "/auth",
    component: () => import("@/views/Authorization.vue"),
    name: "Authoriztaion",
  },
  {
    path: "/constructor/:id",
    component: () => import("@/views/MailEditor.vue"),
    name: "Constructor",
    props: true,
  },
  {
    path: "/device-error",
    component: () => import("@/views/ErrorPage.vue"),
    name: "ErrorPage",
  },
];

export default routes;

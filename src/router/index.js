import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Projects from "../views/Projects.vue";
import Team from "../views/Team.vue";
import Login from "../components/auth/Login.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/team",
      name: "Team",
      component: Team,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
router.beforeEach((to, from, next) => {
  //check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    //check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({ name: "Login" });
    }
  }
  next();
});

export default router;

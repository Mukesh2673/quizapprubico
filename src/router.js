import login from './components/Loginauthentication/login.vue'
import register from './components/Loginauthentication/register.vue'
import quiz from './components/quizcomponent/descriptive.vue'
import {createRouter, createWebHistory} from 'vue-router'
const routes=[


{
name:'login',
component:login,
path:'/'
},


{
name:'Quiz',
component:quiz,
path:'/quiz'
},

{
  name:'Register',
  component:register,
  path:'/register'
}

];
const router=createRouter({
history:createWebHistory(),
routes
});
export default router;
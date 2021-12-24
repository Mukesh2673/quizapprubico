import login from './components/Loginauthentication/login.vue'
import register from './components/Loginauthentication/register.vue'
import quiz from './components/quizcomponent/descriptive.vue'
import quizdetails from './components/quizdetails/quizresult.vue'
import useranswerDetails from './components/quizdetails/useranswerdetails.vue'
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
},
{
  name:'QuizDetails',
  component:quizdetails,
  path:'/quizdetails'
},
{
  name:'result',
  component:useranswerDetails,
  path:'/result'
}


];
const router=createRouter({
history:createWebHistory(),
routes
});
export default router;
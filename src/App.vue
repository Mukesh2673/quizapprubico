<template>
 
  <router-view/>
</template>

<script>
import register from './components/Loginauthentication/register.vue'
export default {
  name: 'App',
  components: {
  register
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}
</style>

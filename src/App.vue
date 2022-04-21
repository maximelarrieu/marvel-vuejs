<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id="app">
    <h1>Hello App!</h1>
    <router-link to="/">Go to Home</router-link> |
    <router-link to="/about">Go to About</router-link>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

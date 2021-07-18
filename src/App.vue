<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/task">Task</router-link>
    </nav>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #64b587;
  height: 100px;
  z-index: 9999;
}

nav a {
  font-weight: bold;
  color: #39485c;
  font-size: 24px;
  flex: auto;
  height: 100px;
  line-height: 100px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

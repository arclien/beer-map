<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
body {
  padding: 0px;
  margin: 0px;
}
a {
  text-decoration: none;
  &.router-link-exact-active {
    text-decoration: underline;
    font-weight: bold;
  }
}
</style>

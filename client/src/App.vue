<template>
  <v-app id="inspire">
    <div id="app">
      <page-header />
      <!-- <img src="./assets/logo.png"> -->
      <router-view />
    </div>
  </v-app>
</template>

<script>
import PageHeader from "./components/Header";

export default {
  name: "App",
  components: {
    PageHeader,
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

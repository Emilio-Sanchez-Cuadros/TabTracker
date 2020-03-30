<template>
  <v-content>
    <v-toolbar id="toolbar" fixed dark>
      <v-toolbar-items>
        <v-btn class="deep-purple darken-2" to="/root">TabTracker</v-btn>
        <v-btn to="/songs" class="deep-purple darken-2" dark>Browse</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.isLogged === false">
        <v-btn to="/register" class="deep-purple darken-2" dark>Registrarse</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="$store.state.isLogged === false">
        <v-btn to="/login" class="deep-purple darken-2" dark>Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="$store.state.isLogged === true">
        <v-btn class="deep-purple darken-2" dark v-on:click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-content>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        path: "/root"
      });
      sessionStorage.removeItem("token");
    }
  }
};
</script>

<style>
#toolbar {
  background-color: #7e57c2;
}
</style>

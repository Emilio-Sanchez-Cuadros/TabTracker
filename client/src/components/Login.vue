<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="deep-purple lighten-1" flat dark>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <form>
                <v-text-field
                  type="email"
                  name="email"
                  v-model="email"
                  placeholder="email"
                  required
                />
                <v-text-field
                  type="password"
                  name="password"
                  v-model="password"
                  placeholder="password"
                  required
                />
                <v-btn class="deep-purple lighten-1" style="color: white" v-on:click="login">Login</v-btn>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        });
        const { token } = Object.assign({}, response.data);
        const user = response.data.results[0]
        this.$store.dispatch('setUser', user)
        this.$store.dispatch('setToken', token)
        sessionStorage.setItem("token", token);
        Toast.fire({
          title: "Logged!", 
          icon: "success", 
          confirmButtonText: "Cool",
          confirmButtonColor: "7E57C2"});
      } catch (error) {
        Toast.fire({
          title: "Error! Usuario o contraseña incorrectos",
          icon: "error",
          confirmButtonText: "Cool",
          confirmButtonColor: "7E57C2"
        });
      }
    }
  }
};
</script>

<style scoped>
</style>

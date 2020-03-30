<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="deep-purple lighten-1" flat dark>
              <v-toolbar-title style="color: white">Registrarse</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <form @change="checkForm">
                <div v-if="errors.length">
                  <span v-for="error in errors" style="color: red" v-bind:key="error">{{ error }}</span>
                </div>
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
                <v-btn
                  class="deep-purple lighten-1"
                  style="color: white"
                  v-if="emailValid === true"
                  @click="register"
                >Registrarse</v-btn>
                <v-btn
                  class="deep-purple lighten-1"
                  style="color: white"
                  v-else-if="emailValid === false"
                  @click="register"
                  disabled
                >Registrarse</v-btn>
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
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      emailValid: false
    };
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.email) {
        this.errors.push("El correo electrónico es obligatorio.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("El correo electrónico debe ser válido.");
      } else if (!this.password) {
        this.errors.push("La contraseña es obligatoria");
      }
      if (!this.errors.length && this.password) {
        this.emailValid = true;
      } else if (this.errors.length && !this.password) {
        this.emailValid = false;
      }

      e.preventDefault();
    },
    validEmail: email => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async register() {
      try {
        const response = await AuthService.register({
          email: this.email,
          password: this.password
        });
        Toast.fire({
          title: `¡${this.email} registrado con éxito!`,
          icon: "success",
          confirmButtonText: "Cool",
          confirmButtonColor: `#7E57C2`
        });
      } catch (error) {
        console.log(error)
        Toast.fire({
          title: "¡Error! Este email ya está en uso",
          icon: "error",
          confirmButtonText: "Cool",
          confirmButtonColor: `#7E57C2`
        });
      }
    }
  }
};
</script>

<style scoped>
</style>

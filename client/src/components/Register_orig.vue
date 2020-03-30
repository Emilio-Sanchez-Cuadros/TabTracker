<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Registro</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-4 pb-4">
          <form @change="checkForm" novalidate="true">
            <div>
              <p v-if="errors.length">
                <span style="color: red" v-for="error in errors">{{ error }}</span>
              </p>
            </div>
            <input type="email" name="email" v-model="email" placeholder="email" required />
            <br />
            <input
              type="password"
              name="password"
              v-model="password"
              placeholder="password"
              required
            />
            <br />
            <v-btn v-if="emailValid === true" @click="register">Registrarse</v-btn>
            <v-btn v-else="emailValid === false" @click="register" disabled>Registrarse</v-btn>
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from "../services/AuthService";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      emailValid: false
    };
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];
      if (!this.email) {
        this.errors.push("El correo electrónico es obligatorio.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("El correo electrónico debe ser válido.");
      }
      if (!this.errors.length) {
        this.emailValid = true;
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
        console.log(response.data);
      } catch (error) {
        console.log(response.data);
      }
    }
  }
};
</script>

<style scoped>
</style>

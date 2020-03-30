<template>
  <!-- <v-container fluid fill-height>
    <v-layout align-center justify-center>
  <v-flex xs12 sm8 md4>-->
  <div class="white elevation-2">
    <v-toolbar flat dense class="deep-purple lighten-1" dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <slot name="action" />
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>Sin slot definido</slot>
    </div>
  </div>
  <!-- </v-flex>
    </v-layout>
  </v-container>-->
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped>
</style>
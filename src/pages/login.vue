<template>
  <v-container
    fluid
    fill-height
    class="full-home"
    style="max-height: 100vh; align-items: baseline"
  >
    <v-row style="padding-top: 17px">
      <v-col cols="3" />
      <v-col cols="6">
        <login />
      </v-col>
      <v-col cols="3" />
    </v-row>
  </v-container>
</template>

<script>
import Login from "../components/forms/login.vue";

export default {
  components: {
    Login,
  },
};
</script>


<style scoped>
/* .full-home {
  background: url("../../public/home.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
} */
</style>

<template>
  <v-app>
    <navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import navigation from "./components/navigation.vue";
export default {
  components: { navigation },
  name: "App",
};
</script>

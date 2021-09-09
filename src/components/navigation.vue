<template>
  <v-app-bar app color="#059999" dark>
    <v-toolbar-title>XYZ</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="white lighten-3" text outlined class="ma-2 nav-btn"
      >Sign in</v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style scoped>
.v-btn--outlined {
  border: thin solid #ffffff !important;
}

.nav-btn:hover {
  background-color: #ffffff;
  color: #059999 !important;
}

.nav-btn:active {
  background-color: #059999;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>

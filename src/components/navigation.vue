<template>
  <v-app-bar app color="#059999" dark>
    <v-toolbar-title>XYZ</v-toolbar-title>
    <v-spacer></v-spacer>
    {{user}}
    <v-btn
      v-if="!user"
      color="white lighten-3"
      text
      outlined
      class="ma-2 nav-btn"
      @click="register"
      >Sign in</v-btn
    >
    <v-btn
      v-else
      color="white lighten-3"
      text
      outlined
      class="ma-2 nav-btn"
      @click="logout"
      >Logout
    </v-btn>

    <Dialog :isShow="open" @click="open = false">
      <register />
    </Dialog>
  </v-app-bar>
</template>

<script>
import Dialog from "./dialog.vue";
import Register from "./forms/register.vue";
import authService from "../services/authService";

export default {
  name: "Nav",
  components: {
    Dialog,
    Register,
  },
  data() {
    return {
      open: false,
    };
  },
  created() {
    // this.user = localStorage.getItem("user");
  },
  watch: {},

  computed: {
    user() {
      // user: {
      // get: function () {
      return localStorage.getItem("user");
      // },
      // set: function (value) {
      // return value;
      // },
    },
  },
  methods: {
    register() {
      this.open = true;
    },
    async logout() {
      await authService
        .logout([])
        .then(async (response) => {
          console.log(response);
          if (response.data.isLoggedOut) {
            localStorage.removeItem("user");
            this.$cookies.remove("Authorization");
            this.$router.push({ name: "login" });
          }
          if (response.error) {
            console.log(response);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
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

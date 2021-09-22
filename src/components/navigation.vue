<template>
  <v-app-bar app color="#059999" dark>
    <v-toolbar-title>XYZ</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn
      v-if="!user"
      color="white lighten-3"
      text
      outlined
      class="ma-2 nav-btn"
      @click="register"
      >Register</v-btn
    >
    <v-menu offset-y bottom left v-if="user">
      <template #activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar size="44">
            <img :src="`http://localhost:3000/` + user.avatar" :alt="user.name"
          /></v-avatar>
        </v-btn>
      </template>

      <v-list dense min-width="120px">
        <v-list-item-group active-class="nav-dropdown">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-content>
              <v-list-item-title> Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

    <!-- <v-btn
      v-else
      color="white lighten-3"
      text
      outlined
      class="ma-2 nav-btn"
      @click="logout"
      >Logout
    </v-btn> -->

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
  created() {},
  watch: {},
  mounted() {},

  computed: {
    user() {
      return typeof this.$store.getters.currentUser === "string"
        ? JSON.parse(this.$store.getters.currentUser)
        : this.$store.getters.currentUser;
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
            // this.$store.dispatch("logout");
            this.$store.commit("removeUser");
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
.nav-dropdown {
  color: #1c8282 !important;
  caret-color: #1c8282 !important;
}
</style>

<template>
  <v-container>
    <form @submit.prevent="submit">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="email" label="E-mail" required></v-text-field>
      <v-btn class="mr-4" type="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </v-container>
</template>


<script>
export default {
  name: "form-v1",
  props: {
    items: Object,
  },
  data: () => ({
    name: "",
    email: "",
  }),
  mounted() {
    this.name = this.items && this.items.name ? this.items.name : "";
    this.email = this.items && this.items.email ? this.items.email : "";
  },
  methods: {
    submit() {
      console.log("submit");
      this.$emit("user-data", { id:this.items&& this.items.id?this.items.id:0,name: this.name, email: this.email });
    },
    clear() {
      this.name = "";
      this.email = "";
    },
  },
};
</script>
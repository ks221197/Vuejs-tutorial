<template>
  <ValidationObserver ref="obs" v-slot="{ invalid }">
    <form>
      <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
        <v-text-field
          v-model="registerPayload.name"
          label="Name"
          :error-messages="errors[0]"
        ></v-text-field>
      </ValidationProvider>

      <ValidationProvider
        name="E-mail"
        rules="required|email"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="registerPayload.email"
          label="E-mail"
          :error-messages="errors[0]"
        ></v-text-field>
      </ValidationProvider>

      <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
        <v-text-field
          v-model="registerPayload.password"
          label="Password"
          type="password"
          :error-messages="errors[0]"
        ></v-text-field>
      </ValidationProvider>

      <ValidationProvider
        name="confirm password"
        rules="required"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="CPassword"
          label="Confirm Password"
          type="password"
          :error-messages="customError.length > 0 ? customError[0] : errors[0]"
          @input="customError = []"
        ></v-text-field>
      </ValidationProvider>

      <v-btn class="mr-4" @click="submit" :disabled="invalid"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </ValidationObserver>
</template>

<script>
import authService from "../../services/authService";
export default {
  data: () => ({
    registerPayload: { name: "", password: "", email: "" },
    CPassword: "",
    customError: [],
  }),

  methods: {
    async submit() {
      let isValid = await this.$refs.obs.validate();

      if (isValid) {
        if (this.registerPayload.password !== this.CPassword) {
          this.customError.push("Password not matching.");
        } else {
          authService
            .register(this.registerPayload)
            .then((response) => {
              console.log("response");
              if (response.data) {
                console.log(response.data);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },
    clear() {
      this.registerPayload.name = "";
      this.registerPayload.password = "";
      this.registerPayload.email = "";
      this.CPassword = "";
      this.$refs.obs.reset();
    },
  },
};
</script>
<template>
  <div>
    <h3 style="text-align: center">Login</h3>
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <form>
        <ValidationProvider
          name="E-mail"
          rules="required|email"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="loginPayload.email"
            label="E-mail"
            :error-messages="errors[0]"
            @click="isValid = false"
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          name="Password"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="loginPayload.password"
            label="Password"
            type="password"
            :error-messages="errors[0]"
            @click="isValid = false"
          ></v-text-field>
        </ValidationProvider>

        <v-btn class="mr-4" @click="submit" :disabled="invalid || isValid">
          submit
        </v-btn>
        <span v-if="customError.length > 0" style="color: red">{{
          customError[0]
        }}</span>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import authService from "../../services/authService";

export default {
  data: () => ({
    loginPayload: { password: "", email: "" },
    customError: [],
    isValid: false,
  }),
  watch: {},
  methods: {
    async submit() {
      this.isValid = await this.$refs.form.validate();
      if (this.isValid) {
        await authService
          .login(this.loginPayload)
          .then(async (response) => {
            if (response.data) {
              this.$cookies.set(
                "Authorization",
                response.data.tokenData.token,
                response.data.tokenData.expiresIn
              );
              localStorage.setItem(
                "user",
                JSON.stringify(response.data.user[0])
              );

              this.$store.commit("setUser");
              // this.$store.dispatch("login");
              this.$router.push("/post");
            }
            if (response.error) {
              this.customError.push(response.message);
              console.log(response);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>
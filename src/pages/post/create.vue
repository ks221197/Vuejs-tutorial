<template>
  <div>
    <h3 style="text-align: center">Create</h3>
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <form>
        <ValidationProvider
          name="Title"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="RequestPayload.title"
            label="Title"
            :error-messages="errors[0]"
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          name="Description"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="RequestPayload.description"
            label="Description"
            :error-messages="errors[0]"
          ></v-text-field>
        </ValidationProvider>

        <span v-if="customError.length > 0">{{ customError[0] }}</span>

        <v-btn class="mr-4" @click="submit" :disabled="invalid || isValid">
          Create
        </v-btn>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import postService from "../../services/postService";

export default {
  data: () => ({
    RequestPayload: { title: "", description: "" },
    customError: [],
    isValid: false,
  }),
  watch: {},
  methods: {
    async submit() {
      this.isValid = await this.$refs.form.validate();
      if (this.isValid) {
        await postService
          .create(this.RequestPayload)
          .then(async (response) => {
            if (response.data) {
              console.log(response.data);
            }
            if (response.error) {
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
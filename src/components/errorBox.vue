<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h6"> Error </v-card-title>
        <v-card-text>{{ error }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#22439f" class="white--text" @click="dialog = false">
            Try Again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    openDialog: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.openDialog;
      },
      set(value) {
        console.log(value);
        this.$emit("dialog", value);
      },
    },
  },
  // watch: {
  //   errorMessage: function (val) {
  //     console.log("val " + val);
  //   },
  // },
  data() {
    return {};
  },
};
// const openDialogFunc = function (error) {
//   console.log(this.error);
//   this.error = error;
//   console.log(this.error);
//   this.openDialog = true;
// };
// EventBus.$on("show-error-box", openDialogFunc);
</script>
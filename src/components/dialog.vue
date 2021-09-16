<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">'ll'</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <slot />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text v-on="$listeners" >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isShow: {
      default: Boolean,
      type: Boolean,
    },
  },
  computed: {
    dialog: {
      set: function (value) {
        return value;
      },
      get: function () {
        return this.isShow;
      },
      //  return this.isShow ? this.isShow : false;
    },
  },
};
</script>
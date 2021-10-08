<template>
  <v-container>
    <v-row class="upload-box pt-2">
      <v-col class="">
        <v-row>
          <v-col class="pb-0">
            <span class="d-flex justify-center text-h5" style="color: #768ad0"
              >About the course</span
            >
            <span class="d-flex justify-center text" style="color: #d8a838"
              >You do not need to know Nuxt.js to take this course, but you
              should know Vue.js.</span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" @drop.prevent="uploadFiles" @dragover.prevent>
            <v-card class="" style="box-shadow: none !important">
              <v-row justify="center">
                <v-img
                  src="../../assets/3.png"
                  max-width="500"
                  max-height="300"
                  contain
                >
                </v-img
              ></v-row>
              <v-card-text align="center">
                <v-row>
                  <v-col class="pt-0">
                    <input
                      ref="fileInput"
                      class="d-none"
                      type="file"
                      accept="*/*"
                      @change="uploadFiles"
                      multiple
                    />
                    <v-btn
                      color="#2649b0"
                      class="ma-2 white--text"
                      @click="selectFiles"
                    >
                      <v-icon left dark> mdi-plus</v-icon>
                      Choose file
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    uploadedFiles: [],
  }),
  computed: {},
  methods: {
    selectFiles() {
      this.$refs.fileInput.click();
    },
    uploadFiles(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length > 0) {
        files.forEach((file) => {
          this.uploadedFiles.push(file);
        });
      }
      this.$emit("files", this.uploadedFiles);
    },
  },
};
</script>

<style  scoped>
.upload-box-card {
  border: gray solid 2px !important;
  border-style: dashed !important;
  background: #e6e6e6 !important;
}
</style>

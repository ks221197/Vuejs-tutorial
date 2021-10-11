<template>
  <v-container>
    <v-row>
      <v-col cols="12" @drop.prevent="uploadFiles" @dragover.prevent>
        <v-card style="box-shadow: none !important">
          <v-card-text>
            <v-row>
              <v-col class="pa-0">
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
                  :class="
                    addMore ? 'ma-2 text-upload-button' : 'ma-2 white--text'
                  "
                  @click="selectFiles"
                  :text="addMore"
                >
                  <v-icon left dark> mdi-plus</v-icon>
                  {{ addMore ? "Choose more file" : "Choose file" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-alert
          :class="addMore ? 'float-right alert-no-boerder' : 'alert-no-boerder'"
          v-model="fileValidation"
          type="error"
          :dismissible="addMore"
          :transition="addMore ? 'scroll-x-reverse-transition' : ''"
          width="fit-content"
          outlined
        >
          Only <strong>.csv/.xlsx</strong> files are allowed!!
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fileType } from "../../constant/index";
export default {
  data: () => ({
    uploadedFiles: [],
    fileValidation: false,
  }),
  computed: {
    addMore() {
      return this.uploadedFiles && Object.keys(this.uploadedFiles).length > 0
        ? true
        : false;
    },
  },
  watch: {
    fileValidation(value) {
      if (value) {
        setTimeout(() => {
          this.fileValidation = false;
        }, 10000);
      }
    },
  },
  methods: {
    selectFiles() {
      this.fileValidation = false;
      this.$refs.fileInput.click();
    },
    uploadFiles(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length > 0) {
        // files.forEach((file) => {
        for (let i = 0; i < files.length; i++) {
          if (!new RegExp(fileType.join("|")).test(files[i].type)) {
            this.fileValidation = true;
          } else {
            this.uploadedFiles.push(files[i]);
          }
        }
      }
      this.$emit("files", this.uploadedFiles);
    },
  },
};
</script>

<style  scoped>
.text-upload-button {
  color: #2649b0;
}
.alert-no-boerder {
  border: none !important;
}
</style>
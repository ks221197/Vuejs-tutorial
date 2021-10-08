<template>
  <v-container>
    <v-row class="atteched-files-list-box">
      <v-col class="pb-0">
        <v-row>
          <v-col class="pb-0">
            <span class="d-flex justify-center text-h5" style="color: #768ad0"
              >Uploaded Files</span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-list>
              <v-list-item-group
                v-model="selectedFile"
                active-class="active-file-list"
              >
                <v-list-item
                  v-for="(file, index) in uploadedFiles"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="file.name"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-btn
                      color="#22439f"
                      class="ma-2 white--text"
                      @click="viewFile(file)"
                    >
                      View
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <!-- {{ isFileSelected }}
          <export v-if="isFileSelected" :fileData="fileData" /> -->
        </v-row>
        <v-row v-if="!uploadedFiles">
          <v-col cols="12">
            <h3>No files uploaded</h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Export from "../file/export.vue";
import ExportService from "../../services/exportService";

export default {
  props: {
    uploadedFiles: {
      type: Array,
      required: true,
    },
  },
  components: {
    Export,
  },
  data: () => ({
    items: ["apple", "orange", "pear"],
    value: [],

    selectedFile: [],
    fileData: [],
    // uploadedFiles: [
    //   {
    //     lastModified: "1632734032659",
    //     lastModifiedDate: "Mon Sep 27 2021 ",
    //     name: "Book1.xlsx",
    //     size: "15959",
    //     type: "application/wps-office.xlsx",
    //     webkitRelativePath: "",
    //   },
    //   {
    //     lastModified: "1632734032659",
    //     lastModifiedDate: "Mon Sep 27 2021 ",
    //     name: "Book1.xlsx",
    //     size: "15959",
    //     type: "application/wps-office.xlsx",
    //     webkitRelativePath: "",
    //   },
    // ],
  }),
  computed: {
    isFileSelected() {
      console.log("sdfds");
      return this.fileData && Object.keys(this.fileData).length > 0
        ? true
        : false;
    },
  },
  methods: {
    async viewFile(file) {
      console.log("here");
      //      this.$emit("selectedFile", file);

      const requestData = new FormData();
      await requestData.append("file", file);
      await ExportService.upload(requestData)
        .then(async (response) => {
          if (response.data) {
            this.fileData = response.data;
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

<style  scoped>
.active-file-list {
  color: #1e3c90 !important;
  caret-color: #768ad0 !important;
}
</style>

<template>
  <v-container>
    <error-box
      :openDialog="openDialog"
      :error="axiosError.error"
      @dialog="axiosError.isError = false"
    />
    <v-row>
      <v-col>
        <v-row class="justify-left ml-sm-2">
          <span class="d-flex text-h5" style="color: #768ad0"
            >Uploaded Files</span
          >
        </v-row>

        <v-row justify="center">
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="(file, index) in uploadedFiles"
              :key="index"
              @click.prevent="fileData = []"
            >
              <v-expansion-panel-header
                hide-actions
                style="font-size: 17px !important"
                >{{ file.name }}
                <div align="right" justify="right">
                  <v-btn
                    color="#22439f"
                    class="ma-2 white--text"
                    @click="viewFile(file, index)"
                    :loading="viewLoader[index]"
                  >
                    View
                  </v-btn>
                  <v-btn
                    class="ma-2 white--text"
                    color="#d8a838"
                    :loading="exportLoader[index]"
                    @click.stop="openPanel()"
                    @click.prevent="exportFile(file, index)"
                  >
                    Export
                  </v-btn>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <export v-if="isFileSelected" :fileData="fileData" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>

        <v-row v-if="!uploadedFiles">
          <h3>No files uploaded</h3>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Export from "./export.vue";
import ExportService from "../../services/exportService";
import ErrorBox from "../errorBox.vue";

export default {
  props: {
    uploadedFiles: {
      type: Array,
      required: true,
    },
  },
  components: {
    Export,
    ErrorBox,
  },
  data: () => ({
    selectedFile: [],
    fileData: [],
    axiosError: {
      isError: false,
      error: "",
    },
    exportLoader: [],
    viewLoader: [],
    // uploadedFiles: [
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
      return this.fileData && Object.keys(this.fileData).length > 0
        ? true
        : false;
    },
    openDialog: {
      get() {
        return this.axiosError.isError;
      },
    },
  },
  methods: {
    openPanel() {
      //this handles open/close flag of v-expansion-panels
      const currentHeader = this.panel;
      this.panel = currentHeader === undefined ? 0 : undefined;
    },

    async viewFile(file, index) {
      this.viewLoader[index] = true;
      this.fileData = [];
      const response = await this.viewFileApi(file);
      this.fileData = response;
      this.viewLoader[index] = false;
    },

    async exportFile(file, index) {
      this.exportLoader[index] = true;
      const fileData = await this.viewFileApi(file);
      await this.exportFileApi(fileData);
      this.exportLoader[index] = false;
    },

    async viewFileApi(file) {
      let fileData = [];
      const requestData = new FormData();
      await requestData.append("file", file);
      await ExportService.upload(requestData)
        .then(async (response) => {
          if (response.data) {
            fileData = response.data;
          }
          if (response.error) {
            this.axiosError.isError = true;
            this.axiosError.error = response.message;
          }
        })
        .catch((e) => {
          console.log(e);
        });
      return await fileData;
    },

    async exportFileApi(fileData) {
      await ExportService.export(fileData)
        .then(async (response) => {
          if (response.data) {
            //download
            await ExportService.download(fileData.table + ".sql").then(
              (response) => {
                if (response.error) {
                  this.axiosError.isError = true;
                  this.axiosError.error = response.message;
                } else {
                  var fileURL = window.URL.createObjectURL(
                    new Blob([response])
                  );
                  var fileLink = document.createElement("a");

                  fileLink.href = fileURL;
                  fileLink.setAttribute("download", `${fileData.table}.sql`);
                  document.body.appendChild(fileLink);

                  fileLink.click();
                }
              }
            );
          }
          if (response.error) {
            this.axiosError.isError = true;
            this.axiosError.error = response.message;
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
.v-expansion-panel--active > .v-expansion-panel-header {
  color: #1e3c90 !important;
  background: #dfe5f95c !important;
}
.v-expansion-panel::before {
  box-shadow: none !important;
}
.v-expansion-panel-content__wrap {
  padding: 0px 0px 16px 0px !important;
}
</style>

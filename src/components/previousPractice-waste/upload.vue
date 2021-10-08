<template>
  <v-container>
    <v-row class="upload-box">
      <v-col class="pb-0">
        <v-row>
          <v-col class="pb-0">
            <span class="text-h4">Upload File</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="upload-box-card">
              <v-card-text
                align="center"
                @drop.prevent="uploadFile"
                @dragover.prevent
              >
                <v-icon size="100"> mdi-cloud-upload </v-icon>
                <p class="text-h6 mb-0">Drag & Drop a file here</p>
                <span class="text-h6 font-weight-regular">or</span>
                <v-row>
                  <v-col class="pb-0">
                    <input
                      ref="fileInput"
                      class="d-none"
                      type="file"
                      accept="*/*"
                      @change="uploadFile"
                      multiple
                    />
                    <v-btn
                      color="#22af9b"
                      class="ma-2 white--text"
                      @click="selectFile"
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

    <v-row class="atteched-files-list-box" v-if="isFileSelected">
      <v-col class="pb-0">
        <v-row>
          <v-col class="pb-0">
            <span class="text-h4">Uploaded Files</span>
          </v-col>
        </v-row>
        <v-row v-if="isFileSelected">
          <v-col cols="12">
            <v-list>
              <v-list-item v-for="(file, index) in uploadedFiles" :key="index">
                <v-list-item-content>
                  <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-btn @click="viewFile(file)"> View </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row v-if="!isFileSelected">
          <v-col cols="12">
            <h3>No files uploaded</h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="file-data" v-if="data">
      <v-col class="pb-0">
        <v-row>
          <v-col class="pb-0">
            <span class="text-h4">File Data</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-simple-table fixed-header>
              <thead>
                <tr>
                  <th
                    v-for="(header, index) in data.headers"
                    :key="index"
                    class="text-uppercase font-weight-bold"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in data.rows" :key="index">
                  <td v-for="(value, index) in row" :key="index">
                    {{ value }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0">
            <v-btn @click="exportFile(data)"> Export </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ExportService from "../../services/exportService";

export default {
  data: () => ({
    uploadedFiles: [],
    headers: [
      { text: "Name", value: "name" },
      { text: "", value: "actions", sortable: false },
    ],
    data: null,
  }),
  computed: {
    isFileSelected() {
      return this.uploadedFiles && this.uploadedFiles.length > 0 ? true : false;
    },
    fileData() {
      return this.data;
    },
  },
  methods: {
    selectFile() {
      this.$refs.fileInput.click();
    },
    uploadFile(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length > 0) {
        files.forEach((file) => {
          this.uploadedFiles.push(file);
        });
      }
    },
    async viewFile(file) {
      const requestData = new FormData();
      await requestData.append("file", file);
      await ExportService.upload(requestData)
        .then(async (response) => {
          if (response.data) {
            console.log(response.data);
            this.data = response.data;
          }
          if (response.error) {
            console.log(response);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async exportFile(data) {
      console.log('kk');
      await ExportService.export(data)
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
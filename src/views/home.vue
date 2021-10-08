<template>
  <div>
    <app-bar />
    <v-row v-if="!isFileUploaded">
      <v-col class="pb-0">
        <span class="d-flex justify-center text-h5" style="color: #768ad0"
          >SQL dump generator</span
        >
        <span class="d-flex justify-center text" style="color: #d8a838"
          >You can upload <span class="font-weight-medium" style="color: #768ad0">&nbsp;[CSV/Sheet]&nbsp;</span> and download sql dump file.</span
        >
        <v-row justify="center">
          <v-img src="@/assets/3.png" max-width="500" max-height="300" contain>
          </v-img
        ></v-row>
      </v-col>
    </v-row>
    <upload
      @files="uploadedFiles"
      :align="isFileUploaded ? 'end' : 'center'"
    />
    <list v-if="isFileUploaded" :uploadedFiles="files" />
  </div>
</template>

<script>
import Upload from "../components/file/upload.vue";
import List from "../components/file/list.vue";
import Export from "../components/file/export.vue";
import AppBar from "../components/appBar.vue";

export default {
  data: () => ({
    files: [],
  }),
  components: {
    Upload,
    AppBar,
    List,
    Export,
  },
  computed: {
    isFileUploaded() {
      return this.files && this.files.length > 0 ? true : false;
    },
  },
  methods: {
    uploadedFiles(files) {
      this.files = files;
    },
  },
};
</script>
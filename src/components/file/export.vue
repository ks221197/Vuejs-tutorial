<template>
  <v-container fluid>
    <v-row class="file-data">
      <v-col>
        <v-row>
          <v-spacer></v-spacer>
          <v-checkbox
            v-model="changeConfig"
            value="1"
            label="See Default Values"
            type="checkbox"
            color="#d8a838"
            required
          ></v-checkbox>
        </v-row>
        <v-row v-if="changeConfig">
          <v-text-field
            v-model="defaultTable"
            label="Default Table"
            required
            hint="This will be table name in dump file"
            readonly
            color="#d8a838"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="defaultColumn"
            label="Default column"
            required
            hint="This will be column names in dump file"
            readonly
            color="#d8a838"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-simple-table fixed-header>
              <thead>
                <tr>
                  <th
                    v-for="(header, index) in fileData.headers"
                    :key="index"
                    class="text-uppercase font-weight-bold text-center"
                    style="color: #6b7cbb"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in fileData.rows" :key="index">
                  <td
                    v-for="(value, index) in row"
                    :key="index"
                    class="text-center"
                  >
                    {{ value }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    fileData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    // data: {
    //   headers: ["name", "month", "salary"],
    //   rows: [
    //     ["kajal", "jan", 1000],
    //     ["kk", "jk", 2000],
    //   ],
    // },
    defaultTable: "",
    defaultColumn: '',
    changeConfig: false,
  }),
  computed: {},
  mounted() {
    this.defaultTable=this.fileData.table
    this.defaultColumn=this.fileData.headers.join(',')
  },
  methods: {},
};
</script>

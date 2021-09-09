<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            New User
          </v-btn>
        </template>

        <v-card>
          <v-card-title>{{ formTitle }}</v-card-title>
          <Form :items="item" @user-data="addUser"></Form>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import Form from "./form.vue";
export default {
  components: { Form },
  name: "data-table",
  data: () => ({
    dialog: false,
    item: {},
  }),
  props: {
    headers: Array,
    items: Array,
    itemsPerPage: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    formTitle() {
      return this.item.id ? "Edit user" : "Create User";
    },
  },
  watch: {
    dialog(val) {
      val || false;
    },
  },
  methods: {
    editItem(item) {
      console.log("kkk");
      this.dialog = true;
      this.item = item;
    },
    addUser(e) {
            this.dialog = false;
      console.log("addUser");
      console.log(e);
      if (e.id>0) {
        console.log(this.items.find(v => v.id === e.id));
      }
      this.items.push(e)
    },
  },
};
</script>

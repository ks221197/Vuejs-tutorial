<template>
<div>
    <data-table :headers="headers" :items="items"></data-table>
    <Form :items="items[0]"></Form>
</div>
</template>
<script>
import DataTable from "@/components/table";
import sample from "../../sample/data";
import Form from '../components/form.vue';

export default {
  components: {
    DataTable,
    Form,
  },
  data() {
    return {
      headers: sample.headers,
      items: sample.items,
    };
  },
};
</script>
<template>
  <v-container
    fluid
    fill-height
    class="full-home"
    style="max-height: 100vh; align-items: baseline"
  >
    <h1>Posts</h1>
    <v-row style="padding-top: 17px">
      <v-col cols="1" />
      <v-col cols="10">
        <v-row dense>
          <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="4"
            style="padding-top: 20px"
          >
            <v-card class="mx-auto">
              <v-img
                class="white--text align-end"
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
              >
                <v-card-title> {{ item.title }} </v-card-title>
              </v-img>
              <v-card-text class="text--primary">
                <div>{{ item.description }}</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>
              <v-card-subtitle> {{ item.createdAt }} </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" />
    </v-row>
  </v-container>
</template>

<script>
import postService from "../../services/postService";

export default {
  components: {},
  data: () => ({
    items: [
      {
        createdAt: "#1F7087",
        title: "Supermodel",
        description: "Foster the People",
      },
      {
        createdAt: "#952175",
        title: "Halcyon Days",
        description: "Ellie Goulding",
      },
      {
        createdAt: "#1F7087",
        title: "Supermodel",
        description: "Foster the People",
      },
      {
        createdAt: "#952175",
        title: "Halcyon Days",
        description: "Ellie Goulding",
      },
      {
        createdAt: "#1F7087",
        title: "Supermodel",
        description: "Foster the People",
      },
      {
        createdAt: "#952175",
        title: "Halcyon Days",
        description: "Ellie Goulding",
      },
    ],
  }),
  mounted() {
    this.getPostList();
  },
  methods: {
    async getPostList() {
      await postService
        .get([])
        .then(async (response) => {
          console.log(response);
          if (response.data) {
            console.log(response);
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


